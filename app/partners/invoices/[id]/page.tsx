import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import InvoiceDetail from '@/components/InvoiceDetail'

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/partners/login')

  const { id } = await params
  const userId = (session.user as any).id

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { client: true, contractor: true, items: { orderBy: { sequence: 'asc' } } },
  })

  if (!invoice || invoice.userId !== userId) notFound()

  return <InvoiceDetail invoice={invoice as any} />
}
