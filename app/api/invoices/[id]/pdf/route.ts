import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { generateInvoicePdf } from '@/lib/generateInvoicePdf'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const userId = (session.user as any).id

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      client: true,
      contractor: true,
      items: { orderBy: { sequence: 'asc' } },
    },
  })

  if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (invoice.userId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const pdfBuffer = generateInvoicePdf(invoice as any)
  const filename = `${invoice.invoiceNumber ?? invoice.id}.pdf`

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
