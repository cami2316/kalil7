// lib/types.ts
export interface User {
  id: string
  phone: string
  password: string
  name: string
  email?: string | null
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface Schedule {
  id: string
  userId: string
  date: Date
  description: string
  status: string
  createdAt: Date
  updatedAt: Date
  user?: User
}

export type PaymentStatus = 'UNPAID' | 'PARTIAL' | 'PAID' | string
export type DiscountType = 'FIXED' | 'PERCENT' | string

export interface InvoiceItem {
  id: string
  invoiceId: string
  description: string
  qty: number
  unit: string
  price: number
  amount: number
  sequence: number
  createdAt: Date
  updatedAt: Date
}

export interface ItemCatalog {
  id: string
  userId: string
  description: string
  defaultUnit: string
  suggestedPrice: number
  usageCount: number
  active: boolean
  createdAt: Date
  updatedAt: Date
  lastUsedAt: Date
}

export interface Invoice {
  id: string
  userId: string
  invoiceNumber?: string | null
  clientId?: string | null
  contractorId?: string | null
  projectId?: string | null
  representative?: string | null
  date: Date
  dueDate?: Date | null
  projectAddress?: string | null
  laborOnly: boolean
  laborOnlyNote?: string | null
  amount: number
  description: string
  subtotal: number
  discountType: DiscountType
  discountValue: number
  discount: number
  total: number
  amountPaid: number
  amountDue: number
  paymentStatus: string
  terms?: string | null
  status: string
  pdfUrl?: string | null
  sentAt?: Date | null
  createdAt: Date
  updatedAt: Date
  user?: User
  client?: Client | null
  contractor?: Contractor | null
  items?: InvoiceItem[]
}

export interface Contractor {
  id: string
  name: string
  contact: string
  email?: string | null
  phone?: string | null
  address?: string | null
  notes?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Client {
  id: string
  name: string
  address: string
  email?: string | null
  phone?: string | null
  notes?: string | null
  createdAt: Date
  updatedAt: Date
}