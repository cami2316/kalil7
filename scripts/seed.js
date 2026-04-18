const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = [
      { email: 'partner1@kalil7.com', name: 'Partner One' },
      { email: 'partner2@kalil7.com', name: 'Partner Two' },
      { email: 'partner3@kalil7.com', name: 'Partner Three' },
      { email: 'partner4@kalil7.com', name: 'Partner Four' },
    ];

    for (const user of users) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          password: hashedPassword,
          name: user.name,
        },
      });
    }

    console.log('✅ Initial users created:');
    users.forEach(user => console.log(`   - ${user.email} (password: password123)`));
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
