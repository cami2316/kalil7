import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const connectionString = process.env.DATABASE_URL

const isProduction = process.env.NODE_ENV === 'production'

// Use a small, stable pool for serverless and force TLS in production.
const pool = new Pool({
  connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : undefined,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  keepAlive: true,
})
const adapter = new PrismaPg(pool)

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
