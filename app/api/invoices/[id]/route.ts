import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const userId = (session.user as any).id

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { client: true, contractor: true, items: { orderBy: { sequence: 'asc' } } },
  })

  if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (invoice.userId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  return NextResponse.json(invoice)
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const userId = (session.user as any).id

  const invoice = await prisma.invoice.findUnique({ where: { id } })
  if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (invoice.userId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { amountPaid } = body

  const paid = Math.min(Math.max(Number(amountPaid) || 0, 0), invoice.total)
  const amountDue = Math.max(invoice.total - paid, 0)
  const paymentStatus =
    invoice.total <= 0 || paid >= invoice.total
      ? 'PAID'
      : paid > 0
      ? 'PARTIAL'
      : 'UNPAID'

  const updated = await prisma.invoice.update({
    where: { id },
    data: { amountPaid: paid, amountDue, paymentStatus },
    include: { client: true, contractor: true, items: { orderBy: { sequence: 'asc' } } },
  })

  return NextResponse.json(updated)
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const userId = (session.user as any).id

  const invoice = await prisma.invoice.findUnique({ where: { id } })
  if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (invoice.userId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await prisma.invoice.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
