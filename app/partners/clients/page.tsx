import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ClientForm from '@/components/ClientForm'
import ClientList from '@/components/ClientList'

export default async function ClientsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/partners/login')
  }

  const clients = await prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gerencie os dados dos clientes
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <ClientForm />
          </div>
        </div>

        <div className="mt-8">
          <ClientList clients={clients} />
        </div>
      </div>
    </div>
  )
}