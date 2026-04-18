import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ContractorForm from '@/components/ContractorForm'
import ContractorList from '@/components/ContractorList'

export default async function ContractorsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/partners/login')
  }

  const contractors = await prisma.contractor.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Contractors</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gerencie os dados dos contractors
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <ContractorForm />
          </div>
        </div>

        <div className="mt-8">
          <ContractorList contractors={contractors} />
        </div>
      </div>
    </div>
  )
}