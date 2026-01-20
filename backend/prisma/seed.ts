// prisma/seed.ts
import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

type PoolConstructor = new (config?: pkg.PoolConfig) => pkg.Pool;
const Pool = (pkg as unknown as { Pool: PoolConstructor }).Pool;
dotenv.config();

async function main() {
  const connectionString = process.env.DIRECT_URL;
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL;
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
  const adminNome = process.env.INITIAL_ADMIN_NAME;

  if (!connectionString || !adminEmail || !adminPassword || !adminNome) {
    throw new Error("ERRO_CONFIG: Variáveis de ambiente obrigatórias não encontradas no .env");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log(`⏳ Processando seed para: ${adminEmail}...`);

    const senhaHash = await bcrypt.hash(adminPassword, 10);

    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { senhaHash },
      create: {
        email: adminEmail,
        nome: adminNome,
        senhaHash: senhaHash,
        role: Role.ADMIN,
      },
    });

    console.log("🚀 Superusuário processado com sucesso!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Erro no seed:", error.message);
    } else {
      console.error("❌ Erro desconhecido no seed:", error);
    }
    throw error;
  } finally {
    await prisma.$disconnect();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await pool.end();
  }
}

main().catch((e: unknown) => {
  const message = e instanceof Error ? e.message : String(e);
  console.error("❌ Erro fatal no processo de seed:", message);
  process.exit(1);
});
