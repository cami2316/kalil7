import { Contractor } from '@/lib/types'

interface ContractorListProps {
  contractors: Contractor[]
}

export default function ContractorList({ contractors }: ContractorListProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {contractors.length === 0 ? (
          <li className="px-4 py-4 text-center text-gray-500">
            Nenhum contractor adicionado ainda.
          </li>
        ) : (
          contractors.map((contractor) => (
            <li key={contractor.id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{contractor.name}</p>
                  <p className="text-sm text-gray-500">{contractor.contact}</p>
                  {contractor.email && (
                    <p className="text-xs text-gray-400">Email: {contractor.email}</p>
                  )}
                  {contractor.phone && (
                    <p className="text-xs text-gray-400">Telefone: {contractor.phone}</p>
                  )}
                  {contractor.address && (
                    <p className="text-xs text-gray-400">Endereço: {contractor.address}</p>
                  )}
                  {contractor.notes && (
                    <p className="text-xs text-gray-400">Notas: {contractor.notes}</p>
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