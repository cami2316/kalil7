import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import InvoiceForm from '@/components/InvoiceForm'
import InvoiceList from '@/components/InvoiceList'

export default async function InvoicesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/partners/login')
  }

  const userId = (session.user as any).id

  const invoices = await prisma.invoice.findMany({
    where: { userId },
    include: {
      client: true,
      contractor: true,
      items: {
        orderBy: { sequence: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const clients = await prisma.client.findMany()
  const contractors = await prisma.contractor.findMany()
  const itemCatalog = await prisma.itemCatalog.findMany({
    where: { userId, active: true },
    orderBy: { description: 'asc' },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="mt-2 text-sm text-gray-600">Create professional invoices with itemized labor details.</p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <InvoiceForm userId={userId} clients={clients} contractors={contractors} itemCatalog={itemCatalog} />
          </div>
        </div>

        <div className="mt-8">
          <InvoiceList invoices={invoices} />
        </div>
      </div>
    </div>
  )
}
