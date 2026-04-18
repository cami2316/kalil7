import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hash password for initial users
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Create 4 initial partner users
  const users = [
    { phone: '3216821090', name: 'Partner One', email: 'partner1@kalil7.com' },
    { phone: '4072712279', name: 'Partner Two', email: 'partner2@kalil7.com' },
    { phone: '3212028584', name: 'Partner Three', email: 'partner3@kalil7.com' },
    { phone: '3214425003', name: 'Partner Four', email: 'partner4@kalil7.com' },
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { phone: user.phone },
      update: {},
      create: {
        phone: user.phone,
        password: hashedPassword,
        name: user.name,
        email: user.email,
      },
    })
  }

  console.log('Initial users created:')
  users.forEach(user => console.log(`- ${user.email} (password: password123)`))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })