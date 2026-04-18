'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Invoice, Client, Contractor } from '@/lib/types'

interface InvoiceWithRelations extends Invoice {
  client?: Client | null
  contractor?: Contractor | null
}

interface InvoiceListProps {
  invoices: InvoiceWithRelations[]
}

function paymentStatusLabel(status: string): string {
  if (status === 'PAID') return 'Paid'
  if (status === 'PARTIAL') return 'Partial'
  return 'Unpaid'
}

export default function InvoiceList({ invoices: initial }: InvoiceListProps) {
  const router = useRouter()
  const [list, setList] = useState(initial)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string, invoiceNumber: string | null | undefined) => {
    if (!confirm(`Delete invoice ${invoiceNumber ?? id.slice(-8)}? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/invoices/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setList((prev) => prev.filter((inv) => inv.id !== id))
      router.refresh()
    } catch {
      alert('Error deleting invoice')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {list.length === 0 ? (
          <li className="px-4 py-4 text-center text-gray-500">No invoices created yet.</li>
        ) : (
          list.map((invoice) => (
            <li key={invoice.id} className="px-4 py-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Invoice #{invoice.invoiceNumber ?? invoice.id.slice(-8)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Job Site: {invoice.projectAddress || 'Not provided'}
                  </p>
                  {invoice.laborOnly && (
                    <p className="text-xs text-amber-700 font-medium">Labor Only</p>
                  )}
                  {invoice.client && (
                    <p className="text-xs text-gray-500">Client: {invoice.client.name}</p>
                  )}
                  {invoice.contractor && (
                    <p className="text-xs text-gray-500">Contractor: {invoice.contractor.name}</p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">Total: ${invoice.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Paid: ${invoice.amountPaid.toFixed(2)}</p>
                    <p className="text-sm font-semibold text-gray-900">Due: ${invoice.amountDue.toFixed(2)}</p>
                    <span
                      className={`inline-flex mt-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        invoice.paymentStatus === 'PAID'
                          ? 'bg-green-100 text-green-800'
                          : invoice.paymentStatus === 'PARTIAL'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {paymentStatusLabel(invoice.paymentStatus)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/partners/invoices/${invoice.id}`}
                      className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-center"
                    >
                      Open
                    </Link>
                    <button
                      onClick={() => handleDelete(invoice.id, invoice.invoiceNumber)}
                      disabled={deletingId === invoice.id}
                      className="px-3 py-1.5 text-xs border border-red-200 text-red-600 rounded-md hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === invoice.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

