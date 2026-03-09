/**
 * Remove registros duplicados de Payment pelo gatewayId.
 * Mantém o registro mais antigo (menor id) de cada gatewayId e remove os demais.
 * Rode: node scripts/remove-duplicate-payments.js
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Conta duplicados (gatewayId com mais de um registro)
  const duplicates = await prisma.$queryRaw`
    SELECT "gatewayId", COUNT(*) as count
    FROM "Payment"
    WHERE "gatewayId" IS NOT NULL
    GROUP BY "gatewayId"
    HAVING COUNT(*) > 1
  `;

  if (duplicates.length === 0) {
    console.log('Nenhum gatewayId duplicado encontrado.');
    return;
  }

  console.log('gatewayIds duplicados:', duplicates);

  // Remove duplicatas: mantém o registro com menor id, remove os outros
  const result = await prisma.$executeRaw`
    DELETE FROM "Payment" p1
    USING "Payment" p2
    WHERE p1."gatewayId" IS NOT NULL
      AND p1."gatewayId" = p2."gatewayId"
      AND p1.id > p2.id
  `;

  console.log('Registros duplicados removidos:', result);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
