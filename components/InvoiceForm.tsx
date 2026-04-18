'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Client, Contractor, DiscountType, ItemCatalog } from '@/lib/types'

interface InvoiceFormProps {
  userId: string
  clients: Client[]
  contractors: Contractor[]
  itemCatalog: ItemCatalog[]
}

type DraftItem = {
  description: string
  unit: string
  qty: string
  price: string
}

type NewClientForm = {
  name: string
  phone: string
  email: string
  address: string
}

const UNIT_OPTIONS = ['sqft', 'ln ft', 'unit', 'hr']

const DEFAULT_TERMS = `50% due to order/schedule. Balance due upon completion

Make all checks payable to Kalil 7 Services LLC
Zelle: 3212028684`

function createEmptyItem(): DraftItem {
  return {
    description: '',
    unit: 'sqft',
    qty: '1',
    price: '',
  }
}

export default function InvoiceForm({ userId, clients: initialClients, contractors, itemCatalog }: InvoiceFormProps) {
  const [localClients, setLocalClients] = useState<Client[]>(initialClients)
  const [clientId, setClientId] = useState('')
  const [contractorId, setContractorId] = useState('')
  const [showNewClient, setShowNewClient] = useState(false)
  const [newClientForm, setNewClientForm] = useState<NewClientForm>({ name: '', phone: '', email: '', address: '' })
  const [savingClient, setSavingClient] = useState(false)
  const [projectAddress, setProjectAddress] = useState('')

  const selectedClient = useMemo(() => localClients.find((c) => c.id === clientId) ?? null, [localClients, clientId])
  const [dueDate, setDueDate] = useState('')
  const [laborOnly, setLaborOnly] = useState(false)
  const [laborOnlyNote, setLaborOnlyNote] = useState('')
  const [discountType, setDiscountType] = useState<DiscountType>('FIXED')
  const [discountValue, setDiscountValue] = useState('0')
  const [amountPaid, setAmountPaid] = useState('0')
  const [terms, setTerms] = useState(DEFAULT_TERMS)
  const [items, setItems] = useState<DraftItem[]>([createEmptyItem()])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const qty = Number(item.qty) || 0
      const price = Number(item.price) || 0
      return sum + qty * price
    }, 0)
  }, [items])

  const calculatedDiscount = useMemo(() => {
    const value = Number(discountValue) || 0
    if (discountType === 'PERCENT') {
      return Math.min(subtotal, (subtotal * value) / 100)
    }

    return Math.min(subtotal, value)
  }, [discountType, discountValue, subtotal])

  const total = Math.max(subtotal - calculatedDiscount, 0)
  const paid = Math.min(Number(amountPaid) || 0, total)
  const amountDue = Math.max(total - paid, 0)

  const updateItem = (index: number, key: keyof DraftItem, value: string) => {
    setItems((prev) => {
      const next = [...prev]
      const current = { ...next[index], [key]: value }

      if (key === 'description') {
        const match = itemCatalog.find((catalogItem) => catalogItem.description === value)
        if (match) {
          if (!current.unit) {
            current.unit = match.defaultUnit
          }
          if (!current.price) {
            current.price = String(match.suggestedPrice)
          }
        }
      }

      next[index] = current
      return next
    })
  }

  const addItem = () => {
    setItems((prev) => [...prev, createEmptyItem()])
  }

  const removeItem = (index: number) => {
    setItems((prev) => {
      if (prev.length === 1) {
        return prev
      }
      return prev.filter((_, idx) => idx !== index)
    })
  }

  const resetForm = () => {
    setClientId('')
    setContractorId('')
    setProjectAddress('')
    setDueDate('')
    setLaborOnly(false)
    setLaborOnlyNote('')
    setDiscountType('FIXED')
    setDiscountValue('0')
    setAmountPaid('0')
    setTerms(DEFAULT_TERMS)
    setItems([createEmptyItem()])
  }

  const handleSaveNewClient = async () => {
    if (!newClientForm.name.trim()) {
      alert('Client name is required')
      return
    }
    setSavingClient(true)
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClientForm),
      })
      if (!res.ok) throw new Error('Failed to create client')
      const created: Client = await res.json()
      setLocalClients((prev) => [created, ...prev])
      setClientId(created.id)
      if (created.address) setProjectAddress(created.address)
      setShowNewClient(false)
      setNewClientForm({ name: '', phone: '', email: '', address: '' })
    } catch {
      alert('Error creating client')
    } finally {
      setSavingClient(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const normalizedItems = items
      .map((item) => ({
        description: item.description.trim(),
        unit: item.unit.trim(),
        qty: Number(item.qty),
        price: Number(item.price),
      }))
      .filter((item) => item.description && item.unit && item.qty > 0)

    if (!clientId) {
      alert('Client is required')
      setIsSubmitting(false)
      return
    }

    if (!projectAddress.trim()) {
      alert('Project Address is required')
      setIsSubmitting(false)
      return
    }

    if (normalizedItems.length === 0) {
      alert('Add at least one valid item')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          clientId,
          contractorId: contractorId || null,
          projectAddress,
          dueDate: dueDate || null,
          laborOnly,
          laborOnlyNote: laborOnlyNote || null,
          discountType,
          discountValue: Number(discountValue) || 0,
          amountPaid: Number(amountPaid) || 0,
          terms,
          items: normalizedItems,
        }),
      })

      if (response.ok) {
        resetForm()
        router.refresh()
      } else {
        const payload = await response.json()
        alert(payload.error ?? 'Erro ao criar invoice')
      }
    } catch (error) {
      alert('Erro ao criar invoice')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="client" className="block text-sm font-medium text-gray-700">
              Client
            </label>
            <button
              type="button"
              onClick={() => setShowNewClient(true)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              + New Client
            </button>
          </div>
          <select
            id="client"
            value={clientId}
            onChange={(e) => {
              setClientId(e.target.value)
              const chosen = localClients.find((c) => c.id === e.target.value)
              if (chosen?.address && !projectAddress.trim()) {
                setProjectAddress(chosen.address)
              }
            }}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select client</option>
            {localClients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contractor" className="block text-sm font-medium text-gray-700">
            Contractor (optional)
          </label>
          <select
            id="contractor"
            value={contractorId}
            onChange={(e) => setContractorId(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">No contractor</option>
            {contractors.map((contractor) => (
              <option key={contractor.id} value={contractor.id}>
                {contractor.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="projectAddress" className="block text-sm font-medium text-gray-700">
              Project Address (Job Site)
            </label>
            {selectedClient?.address && (
              <button
                type="button"
                onClick={() => setProjectAddress(selectedClient.address)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Use client address
              </button>
            )}
          </div>
          <textarea
            id="projectAddress"
            value={projectAddress}
            onChange={(e) => setProjectAddress(e.target.value)}
            required
            rows={2}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="123 Main St, City, State ZIP"
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date (optional)
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="laborOnly"
          type="checkbox"
          checked={laborOnly}
          onChange={(e) => setLaborOnly(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="laborOnly" className="text-sm font-medium text-gray-700">
          Labor Only
        </label>
      </div>

      {laborOnly && (
        <div>
          <label htmlFor="laborOnlyNote" className="block text-sm font-medium text-gray-700">
            Labor Only Note
          </label>
          <textarea
            id="laborOnlyNote"
            value={laborOnlyNote}
            onChange={(e) => setLaborOnlyNote(e.target.value)}
            rows={2}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Ex: Labor only estimate. Materials supplied by client."
          />
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Add Item
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end border border-gray-200 rounded-md p-3">
              <div className="md:col-span-4">
                <label className="block text-xs font-medium text-gray-600">Description</label>
                <input
                  list="catalog-descriptions"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Tile installation"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600">Unit</label>
                <select
                  value={item.unit}
                  onChange={(e) => updateItem(index, 'unit', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {UNIT_OPTIONS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600">Qty</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={item.qty}
                  onChange={(e) => updateItem(index, 'qty', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600">Unit Price</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                  className="w-full py-2 px-3 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <datalist id="catalog-descriptions">
          {itemCatalog.map((catalogItem) => (
            <option key={catalogItem.id} value={catalogItem.description} />
          ))}
        </datalist>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">
            Discount Type
          </label>
          <select
            id="discountType"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value as DiscountType)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="FIXED">Fixed</option>
            <option value="PERCENT">Percent</option>
          </select>
        </div>

        <div>
          <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700">
            Discount Value
          </label>
          <input
            type="number"
            id="discountValue"
            min="0"
            step="0.01"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="amountPaid" className="block text-sm font-medium text-gray-700">
            Amount Paid
          </label>
          <input
            type="number"
            id="amountPaid"
            min="0"
            step="0.01"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="rounded-md bg-gray-50 p-4 text-sm text-gray-700 space-y-1">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Discount: -${calculatedDiscount.toFixed(2)}</p>
        <p className="font-semibold">Total: ${total.toFixed(2)}</p>
        <p>Amount Paid: ${paid.toFixed(2)}</p>
        <p className="font-semibold">Amount Due: ${amountDue.toFixed(2)}</p>
      </div>

      <div>
        <label htmlFor="terms" className="block text-sm font-medium text-gray-700">
          Payment Terms
        </label>
        <textarea
          id="terms"
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          rows={4}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Create Invoice'}
      </button>
    </form>

    {showNewClient && (
      <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50" onClick={() => setShowNewClient(false)}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-lg font-semibold text-gray-900">New Client</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name *</label>
              <input
                type="text"
                value={newClientForm.name}
                onChange={(e) => setNewClientForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                placeholder="Client full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={newClientForm.phone}
                onChange={(e) => setNewClientForm((f) => ({ ...f, phone: e.target.value }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                placeholder="(407) 000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={newClientForm.email}
                onChange={(e) => setNewClientForm((f) => ({ ...f, email: e.target.value }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                placeholder="client@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={newClientForm.address}
                onChange={(e) => setNewClientForm((f) => ({ ...f, address: e.target.value }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                placeholder="123 Main St, City, FL"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowNewClient(false)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNewClient}
                disabled={savingClient}
                className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {savingClient ? 'Saving...' : 'Save Client'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
