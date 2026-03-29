import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.emailOtp.deleteMany({ where: { email: 'dev.shakib6@gmail.com' } });
  await prisma.user.deleteMany({ where: { email: 'dev.shakib6@gmail.com' } });
  console.log('Cleared existing user and OTPs.');
}
main().finally(async () => await prisma.$disconnect());
