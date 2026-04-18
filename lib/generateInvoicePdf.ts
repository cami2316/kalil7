import jsPDF from 'jspdf'

type PdfItem = {
  description: string
  unit: string
  qty: number
  price: number
  amount: number
}

type PdfInvoice = {
  id: string
  invoiceNumber?: string | null
  date: Date | string
  dueDate?: Date | string | null
  projectAddress?: string | null
  laborOnly: boolean
  laborOnlyNote?: string | null
  subtotal: number
  discount: number
  total: number
  amountPaid: number
  amountDue: number
  terms?: string | null
  client?: { name: string; address: string; phone?: string | null; email?: string | null } | null
  contractor?: { name: string } | null
  items: PdfItem[]
}

export function generateInvoicePdf(invoice: PdfInvoice): Buffer {
  const pdf = new jsPDF()
  let y = 20

  pdf.setFontSize(18)
  pdf.text('KALIL 7 SERVICES LLC', 20, y)
  y += 8
  pdf.setFontSize(14)
  pdf.text('INVOICE', 20, y)
  y += 8

  pdf.setFontSize(10)
  pdf.text(`Invoice #: ${invoice.invoiceNumber ?? invoice.id}`, 20, y)
  y += 5
  pdf.text(`Date: ${new Date(invoice.date).toLocaleDateString('en-US')}`, 20, y)
  y += 5
  if (invoice.dueDate) {
    pdf.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString('en-US')}`, 20, y)
    y += 5
  }

  y += 3
  pdf.setFontSize(11)
  pdf.text('Bill To:', 20, y)
  y += 5
  pdf.setFontSize(10)
  if (invoice.client) {
    pdf.text(invoice.client.name, 20, y)
    y += 5
    if (invoice.client.address) {
      pdf.text(invoice.client.address, 20, y)
      y += 5
    }
    if (invoice.client.phone) {
      pdf.text(invoice.client.phone, 20, y)
      y += 5
    }
    if (invoice.client.email) {
      pdf.text(invoice.client.email, 20, y)
      y += 5
    }
  }

  if (invoice.contractor) {
    y += 3
    pdf.setFontSize(10)
    pdf.text(`Contractor: ${invoice.contractor.name}`, 20, y)
    y += 5
  }

  y += 3
  pdf.setFontSize(11)
  pdf.text('Project Address (Job Site):', 20, y)
  y += 5
  pdf.setFontSize(10)
  const addressLines = pdf.splitTextToSize(invoice.projectAddress ?? '', 170)
  pdf.text(addressLines, 20, y)
  y += addressLines.length * 5 + 5

  if (invoice.laborOnly) {
    pdf.setFontSize(11)
    pdf.text('LABOR ONLY', 20, y)
    y += 5
    if (invoice.laborOnlyNote) {
      pdf.setFontSize(10)
      const noteLines = pdf.splitTextToSize(invoice.laborOnlyNote, 170)
      pdf.text(noteLines, 20, y)
      y += noteLines.length * 5 + 3
    }
  }

  pdf.setFontSize(11)
  pdf.text('Itemized Description', 20, y)
  y += 6

  pdf.setFontSize(9)
  pdf.text('Description', 20, y)
  pdf.text('Unit', 110, y)
  pdf.text('Qty', 130, y)
  pdf.text('Price', 148, y)
  pdf.text('Total', 180, y, { align: 'right' })
  y += 4
  pdf.line(20, y, 190, y)
  y += 5

  for (const item of invoice.items) {
    if (y > 260) {
      pdf.addPage()
      y = 20
    }
    const descLines = pdf.splitTextToSize(item.description, 85)
    pdf.text(descLines, 20, y)
    pdf.text(item.unit, 110, y)
    pdf.text(item.qty.toFixed(2), 130, y)
    pdf.text(`$${item.price.toFixed(2)}`, 148, y)
    pdf.text(`$${item.amount.toFixed(2)}`, 180, y, { align: 'right' })
    y += descLines.length * 5 + 1
  }

  y += 2
  pdf.line(120, y, 190, y)
  y += 5

  pdf.setFontSize(10)
  pdf.text(`Subtotal: $${invoice.subtotal.toFixed(2)}`, 190, y, { align: 'right' })
  y += 5
  if (invoice.discount > 0) {
    pdf.text(`Discount: -$${invoice.discount.toFixed(2)}`, 190, y, { align: 'right' })
    y += 5
  }
  pdf.text(`Total: $${invoice.total.toFixed(2)}`, 190, y, { align: 'right' })
  y += 5
  pdf.text(`Amount Paid: $${invoice.amountPaid.toFixed(2)}`, 190, y, { align: 'right' })
  y += 5
  pdf.setFontSize(11)
  pdf.text(`Amount Due: $${invoice.amountDue.toFixed(2)}`, 190, y, { align: 'right' })
  y += 10

  if (invoice.terms) {
    pdf.setFontSize(10)
    pdf.text('Payment Terms:', 20, y)
    y += 5
    const termLines = pdf.splitTextToSize(invoice.terms, 170)
    pdf.text(termLines, 20, y)
  }

  return Buffer.from(pdf.output('arraybuffer'))
}
