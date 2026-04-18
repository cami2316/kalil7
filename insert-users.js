require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function createUsers() {
  try {
    console.log('📱 Conectando ao banco de dados...');
    
    const passwordHash = '$2b$10$k/.Kxe2sD985AJN5mnAcE.3rIDgNTy36SJl9ZLWfQbmGGQpbHw6gC';
    
    const query = `
      INSERT INTO "users" (id, phone, name, password, role, "createdAt", "updatedAt") 
      VALUES 
        (gen_random_uuid()::text, $1, $2, $3, $4, NOW(), NOW()),
        (gen_random_uuid()::text, $5, $6, $3, $4, NOW(), NOW()),
        (gen_random_uuid()::text, $7, $8, $3, $4, NOW(), NOW()),
        (gen_random_uuid()::text, $9, $10, $3, $4, NOW(), NOW())
      ON CONFLICT DO NOTHING
      RETURNING phone, name;
    `;
    
    const result = await pool.query(query, [
      '407 2712279', 'Partner One',
      passwordHash, 'partner',
      '3216821090', 'Partner Two',
      '321 4425003', 'Partner Three',
      '3212028584', 'Partner Four'
    ]);
    
    if (result.rows.length > 0) {
      console.log('\n✅ Usuários criados com sucesso!\n');
      result.rows.forEach(user => {
        console.log(`   📱 ${user.phone} → ${user.name}`);
      });
    } else {
      console.log('⚠️  Nenhum usuário novo foi adicionado (podem já existir)');
    }
    
    console.log('\n🔐 Credenciais de login:');
    console.log('   Telefone          Senha');
    console.log('   407 2712279       password123');
    console.log('   3216821090        password123');
    console.log('   321 4425003       password123');
    console.log('   3212028584        password123\n');
    
    await pool.end();
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

createUsers();
