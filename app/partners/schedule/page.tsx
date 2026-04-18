import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ScheduleForm from '@/components/ScheduleForm'
import ScheduleList from '@/components/ScheduleList'

export default async function SchedulePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/partners/login')
  }

  const schedules = await prisma.schedule.findMany({
    where: { userId: (session.user as any).id },
    orderBy: { date: 'asc' },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Agenda de Trabalho</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gerencie sua agenda pessoal
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <ScheduleForm userId={(session.user as any).id} />
          </div>
        </div>

        <div className="mt-8">
          <ScheduleList schedules={schedules} />
        </div>
      </div>
    </div>
  )
}