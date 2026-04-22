import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import jsPDF from 'jspdf'

type DiscountType = 'FIXED' | 'PERCENT'
type PaymentStatus = 'UNPAID' | 'PARTIAL' | 'PAID'

type InvoiceItemPayload = {
  description: string
  qty: number
  unit: string
  price: number
}

function toPositiveNumber(value: unknown): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

function toNonNegativeNumber(value: unknown): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

function resolveDiscount(subtotal: number, discountType: DiscountType, discountValue: number): number {
  if (discountType === 'PERCENT') {
    return Math.min(subtotal, (subtotal * discountValue) / 100)
  }

  return Math.min(subtotal, discountValue)
}

function computePaymentStatus(amountPaid: number, total: number): PaymentStatus {
  if (total <= 0 || amountPaid >= total) {
    return 'PAID'
  }

  if (amountPaid > 0) {
    return 'PARTIAL'
  }

  return 'UNPAID'
}

async function getNextInvoiceNumber(): Promise<string> {
  const invoices = await prisma.invoice.findMany({
    select: { invoiceNumber: true },
    where: { invoiceNumber: { not: null } },
  })

  let maxNumber = 1000

  for (const invoice of invoices) {
    const raw = invoice.invoiceNumber ?? ''
    if (!raw.startsWith('INV-')) {
      continue
    }

    const numeric = Number.parseInt(raw.slice(4), 10)
    if (Number.isFinite(numeric) && numeric > maxNumber) {
      maxNumber = numeric
    }
  }

  return `INV-${maxNumber + 1}`
}

function normalizeItems(input: unknown): InvoiceItemPayload[] {
  if (!Array.isArray(input)) {
    return []
  }

  return input
    .map((item) => {
      const typed = item as Partial<InvoiceItemPayload>
      const description = (typed.description ?? '').toString().trim()
      const unit = (typed.unit ?? '').toString().trim()
      const qty = toPositiveNumber(typed.qty)
      const price = toNonNegativeNumber(typed.price)

      return {
        description,
        unit,
        qty,
        price,
      }
    })
    .filter((item) => item.description.length > 0 && item.unit.length > 0 && item.qty > 0)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      userId,
      clientId,
      contractorId,
      terms,
      dueDate,
      projectAddress,
      laborOnly,
      laborOnlyNote,
      discountType,
      discountValue,
      amountPaid,
      items,
    } = body

    if (!session.user || (session.user as any).id !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (!clientId) {
      return NextResponse.json({ error: 'Client is required' }, { status: 400 })
    }

    const trimmedProjectAddress = (projectAddress ?? '').toString().trim()
    if (!trimmedProjectAddress) {
      return NextResponse.json({ error: 'Project Address is required' }, { status: 400 })
    }

    const normalizedItems = normalizeItems(items)
    if (normalizedItems.length === 0) {
      return NextResponse.json({ error: 'At least one invoice item is required' }, { status: 400 })
    }

    const normalizedDiscountType: DiscountType = discountType === 'PERCENT' ? 'PERCENT' : 'FIXED'
    const normalizedDiscountValue = toNonNegativeNumber(discountValue)

    const normalizedAmountPaid = toNonNegativeNumber(amountPaid)

    const subtotal = normalizedItems.reduce((sum, item) => sum + item.qty * item.price, 0)
    const discount = resolveDiscount(subtotal, normalizedDiscountType, normalizedDiscountValue)
    const total = Math.max(subtotal - discount, 0)
    const safeAmountPaid = Math.min(normalizedAmountPaid, total)
    const amountDue = Math.max(total - safeAmountPaid, 0)
    const normalizedPaymentStatus = computePaymentStatus(safeAmountPaid, total)
    const invoiceNumber = await getNextInvoiceNumber()

    const description = normalizedItems.map((item) => item.description).join(' | ')

    const createdInvoice = await prisma.$transaction(async (tx: any) => {
      const invoice = await tx.invoice.create({
        data: {
          userId,
          invoiceNumber,
          clientId,
          contractorId: contractorId || null,
          dueDate: dueDate ? new Date(dueDate) : null,
          projectAddress: trimmedProjectAddress,
          laborOnly: Boolean(laborOnly),
          laborOnlyNote: laborOnlyNote ? String(laborOnlyNote).trim() : null,
          terms: terms ? String(terms).trim() : null,
          description,
          amount: total,
          subtotal,
          discountType: normalizedDiscountType,
          discountValue: normalizedDiscountValue,
          discount,
          total,
          amountPaid: safeAmountPaid,
          amountDue,
          paymentStatus: normalizedPaymentStatus,
        },
      })

      await tx.invoiceItem.createMany({
        data: normalizedItems.map((item, index) => ({
          invoiceId: invoice.id,
          description: item.description,
          qty: item.qty,
          unit: item.unit,
          price: item.price,
          amount: item.qty * item.price,
          sequence: index + 1,
        })),
      })

      for (const item of normalizedItems) {
        await tx.itemCatalog.upsert({
          where: {
            userId_description_defaultUnit: {
              userId,
              description: item.description,
              defaultUnit: item.unit,
            },
          },
          update: {
            suggestedPrice: item.price,
            usageCount: { increment: 1 },
            lastUsedAt: new Date(),
            active: true,
          },
          create: {
            userId,
            description: item.description,
            defaultUnit: item.unit,
            suggestedPrice: item.price,
            usageCount: 1,
          },
        })
      }

      return tx.invoice.findUnique({
        where: { id: invoice.id },
        include: {
          client: true,
          contractor: true,
          items: {
            orderBy: { sequence: 'asc' },
          },
        },
      })
    })

    if (!createdInvoice) {
      return NextResponse.json({ error: 'Invoice creation failed' }, { status: 500 })
    }

    const pdf = new jsPDF()
    let y = 20

    pdf.setFontSize(18)
    pdf.text('KALIL 7 SERVICES LLC', 20, y)
    y += 8
    pdf.setFontSize(14)
    pdf.text('INVOICE', 20, y)
    y += 8

    pdf.setFontSize(10)
    pdf.text(`Invoice #: ${createdInvoice.invoiceNumber ?? createdInvoice.id}`, 20, y)
    y += 5
    pdf.text(`Date: ${new Date(createdInvoice.date).toLocaleDateString('en-US')}`, 20, y)
    y += 5
    if (createdInvoice.dueDate) {
      pdf.text(`Due Date: ${new Date(createdInvoice.dueDate).toLocaleDateString('en-US')}`, 20, y)
      y += 5
    }

    y += 3
    pdf.setFontSize(11)
    pdf.text('Bill To:', 20, y)
    y += 5
    pdf.setFontSize(10)
    if (createdInvoice.client) {
      pdf.text(createdInvoice.client.name, 20, y)
      y += 5
      pdf.text(createdInvoice.client.address, 20, y)
      y += 5
    }

    y += 3
    pdf.setFontSize(11)
    pdf.text('Project Address (Job Site):', 20, y)
    y += 5
    pdf.setFontSize(10)
    pdf.text(createdInvoice.projectAddress ?? '', 20, y, { maxWidth: 170 })
    y += 10

    if (createdInvoice.laborOnly) {
      pdf.setFontSize(11)
      pdf.text('LABOR ONLY', 20, y)
      y += 5
      if (createdInvoice.laborOnlyNote) {
        pdf.setFontSize(10)
        pdf.text(createdInvoice.laborOnlyNote, 20, y, { maxWidth: 170 })
        y += 8
      }
    }

    pdf.setFontSize(11)
    pdf.text('Itemized Description', 20, y)
    y += 6

    pdf.setFontSize(9)
    pdf.text('Description', 20, y)
    pdf.text('Unit', 110, y)
    pdf.text('Qty', 130, y)
    pdf.text('Unit Price', 145, y)
    pdf.text('Line Total', 175, y, { align: 'right' })
    y += 4

    pdf.line(20, y, 190, y)
    y += 5

    for (const item of createdInvoice.items) {
      pdf.text(item.description, 20, y, { maxWidth: 85 })
      pdf.text(item.unit, 110, y)
      pdf.text(item.qty.toFixed(2), 130, y)
      pdf.text(`$${item.price.toFixed(2)}`, 145, y)
      pdf.text(`$${item.amount.toFixed(2)}`, 175, y, { align: 'right' })
      y += 6
    }

    y += 2
    pdf.line(120, y, 190, y)
    y += 5

    pdf.setFontSize(10)
    pdf.text(`Subtotal: $${createdInvoice.subtotal.toFixed(2)}`, 190, y, { align: 'right' })
    y += 5
    pdf.text(`Discount: -$${createdInvoice.discount.toFixed(2)}`, 190, y, { align: 'right' })
    y += 5
    pdf.text(`Total: $${createdInvoice.total.toFixed(2)}`, 190, y, { align: 'right' })
    y += 5
    pdf.text(`Amount Paid: $${createdInvoice.amountPaid.toFixed(2)}`, 190, y, { align: 'right' })
    y += 5
    pdf.setFontSize(11)
    pdf.text(`Amount Due: $${createdInvoice.amountDue.toFixed(2)}`, 190, y, { align: 'right' })
    y += 7

    if (createdInvoice.terms) {
      pdf.setFontSize(10)
      pdf.text('Payment Terms:', 20, y)
      y += 5
      pdf.text(createdInvoice.terms, 20, y, { maxWidth: 170 })
    }

    const pdfBuffer = pdf.output('arraybuffer')
    void pdfBuffer

    return NextResponse.json(createdInvoice)
  } catch (error) {
    console.error('Error creating invoice:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const invoices = await prisma.invoice.findMany({
      where: { userId: (session.user as any).id },
      include: {
        client: true,
        contractor: true,
        items: {
          orderBy: { sequence: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(invoices)
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
