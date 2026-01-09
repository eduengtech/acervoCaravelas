// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  
  const connectionString = process.env.DIRECT_URL;
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL;
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
  const adminNome = process.env.INITIAL_ADMIN_NAME;

 
  if (!connectionString || !adminEmail || !adminPassword || !adminNome) process.exit(1);
  
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log(`⏳ Processando seed para: ${adminEmail}...`);

    const senhaHash = await bcrypt.hash(adminPassword, 10);

    const superUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: { senhaHash },
      create: {
        email: adminEmail,
        nome: adminNome,
        senhaHash: senhaHash,
        role: Role.ADMIN,
      },
    });

    console.log('🚀 Superusuário processado com sucesso!');
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});