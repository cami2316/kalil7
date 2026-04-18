import { Schedule } from '@/lib/types'

interface ScheduleListProps {
  schedules: Schedule[]
}

export default function ScheduleList({ schedules }: ScheduleListProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {schedules.length === 0 ? (
          <li className="px-4 py-4 text-center text-gray-500">
            Nenhuma agenda adicionada ainda.
          </li>
        ) : (
          schedules.map((schedule) => (
            <li key={schedule.id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(schedule.date).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-sm text-gray-500">{schedule.description}</p>
                </div>
                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      schedule.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {schedule.status === 'completed' ? 'Concluído' : 'Pendente'}
                  </span>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}