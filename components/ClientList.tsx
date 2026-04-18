import { Client } from '@/lib/types'

interface ClientListProps {
  clients: Client[]
}

export default function ClientList({ clients }: ClientListProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {clients.length === 0 ? (
          <li className="px-4 py-4 text-center text-gray-500">
            Nenhum cliente adicionado ainda.
          </li>
        ) : (
          clients.map((client) => (
            <li key={client.id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.address}</p>
                  {client.email && (
                    <p className="text-xs text-gray-400">Email: {client.email}</p>
                  )}
                  {client.phone && (
                    <p className="text-xs text-gray-400">Telefone: {client.phone}</p>
                  )}
                  {client.notes && (
                    <p className="text-xs text-gray-400">Notas: {client.notes}</p>
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}