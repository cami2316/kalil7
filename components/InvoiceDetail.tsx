'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Invoice, InvoiceItem, Client, Contractor } from '@/lib/types'

interface FullInvoice extends Invoice {
  client?: Client | null
  contractor?: Contractor | null
  items?: InvoiceItem[]
}

function statusBadge(status: string) {
  const base = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium'
  if (status === 'PAID') return `${base} bg-green-100 text-green-800`
  if (status === 'PARTIAL') return `${base} bg-amber-100 text-amber-800`
  return `${base} bg-gray-100 text-gray-700`
}

function statusLabel(status: string) {
  if (status === 'PAID') return 'Paid'
  if (status === 'PARTIAL') return 'Partial'
  return 'Unpaid'
}

export default function InvoiceDetail({ invoice }: { invoice: FullInvoice }) {
  const router = useRouter()
  const [showPayModal, setShowPayModal] = useState(false)
  const [payInput, setPayInput] = useState(String(invoice.amountPaid))
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [current, setCurrent] = useState(invoice)

  const pdfUrl = `/api/invoices/${current.id}/pdf`

  const handlePrint = () => {
    window.open(pdfUrl, '_blank')
  }

  const handleEmail = () => {
    const client = current.client
    const to = client?.email ?? ''
    const subject = encodeURIComponent(`Invoice ${current.invoiceNumber ?? current.id} — Kalil 7 Services LLC`)
    const body = encodeURIComponent(
      `Hi ${client?.name ?? ''},\n\nPlease find your invoice ${current.invoiceNumber ?? current.id} attached.\n\nTotal: $${current.total.toFixed(2)}\nAmount Due: $${current.amountDue.toFixed(2)}\n\nThank you,\nKalil 7 Services LLC`
    )
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  }

  const handleRegisterPayment = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/invoices/${current.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountPaid: Number(payInput) }),
      })
      if (!res.ok) throw new Error()
      const updated = await res.json()
      setCurrent((prev) => ({ ...prev, ...updated }))
      setShowPayModal(false)
    } catch {
      alert('Error updating payment')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Delete invoice ${current.invoiceNumber ?? current.id}? This cannot be undone.`)) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/invoices/${current.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      router.push('/partners/invoices')
      router.refresh()
    } catch {
      alert('Error deleting invoice')
      setDeleting(false)
    }
  }

  const items = current.items ?? []
  const date = new Date(current.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const dueDate = current.dueDate ? new Date(current.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

        {/* Header bar */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/partners/invoices" className="text-sm text-indigo-600 hover:text-indigo-800">
            ← Back to Invoices
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={pdfUrl}
              download
              className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-900"
            >
              Download PDF
            </a>
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Print / View PDF
            </button>
            <button
              onClick={handleEmail}
              className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Email Client
            </button>
            <button
              onClick={() => { setPayInput(String(current.amountPaid)); setShowPayModal(true) }}
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Register Payment
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 text-sm bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        {/* Invoice card */}
        <div className="bg-white shadow rounded-lg p-8 space-y-8">

          {/* Top: number + status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Invoice {current.invoiceNumber ?? `#${current.id.slice(-8)}`}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Date: {date}{dueDate ? ` · Due: ${dueDate}` : ''}</p>
            </div>
            <span className={statusBadge(current.paymentStatus)}>{statusLabel(current.paymentStatus)}</span>
          </div>

          {/* Client + Job Site */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Client</p>
              <p className="text-sm font-medium text-gray-900">{current.client?.name ?? '—'}</p>
              {current.client?.phone && <p className="text-sm text-gray-500">{current.client.phone}</p>}
              {current.client?.email && <p className="text-sm text-gray-500">{current.client.email}</p>}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Job Site</p>
              <p className="text-sm text-gray-900 whitespace-pre-line">{current.projectAddress ?? '—'}</p>
              {current.laborOnly && (
                <span className="mt-1 inline-block text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                  Labor Only{current.laborOnlyNote ? ` — ${current.laborOnlyNote}` : ''}
                </span>
              )}
            </div>
          </div>

          {current.contractor && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Contractor</p>
              <p className="text-sm text-gray-900">{current.contractor.name}</p>
            </div>
          )}

          {/* Items table */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Items</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wide">
                    <th className="pb-2 font-medium w-1/2">Description</th>
                    <th className="pb-2 font-medium text-right">Unit</th>
                    <th className="pb-2 font-medium text-right">Qty</th>
                    <th className="pb-2 font-medium text-right">Price</th>
                    <th className="pb-2 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 text-gray-900">{item.description}</td>
                      <td className="py-2 text-right text-gray-500">{item.unit}</td>
                      <td className="py-2 text-right text-gray-700">{item.qty}</td>
                      <td className="py-2 text-right text-gray-700">${item.price.toFixed(2)}</td>
                      <td className="py-2 text-right font-medium text-gray-900">${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-1 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${current.subtotal.toFixed(2)}</span>
              </div>
              {current.discount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span>-${current.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-200 pt-1">
                <span>Total</span>
                <span>${current.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Amount Paid</span>
                <span>${current.amountPaid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-200 pt-1">
                <span>Amount Due</span>
                <span>${current.amountDue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Terms */}
          {current.terms && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Payment Terms</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">{current.terms}</p>
            </div>
          )}

        </div>
      </div>

      {/* Register Payment modal */}
      {showPayModal && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50"
          onClick={() => setShowPayModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-gray-900">Register Payment</h2>
            <p className="text-sm text-gray-500">Invoice total: <strong>${current.total.toFixed(2)}</strong></p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={payInput}
                onChange={(e) => setPayInput(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRegisterPayment}
                disabled={saving}
                className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
