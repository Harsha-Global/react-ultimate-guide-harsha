import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { hashPassword } from 'better-auth/crypto';
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || !['/shopfront_dev','/shopfront_test'].includes(url.pathname)) throw new Error('Fixtures only run against the named local course databases.');
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: url.toString() }) });
try {
  for (const [id, email, name, customerId] of [
    ['U-ALEX','alex@example.test','Alex Morgan','C-1'], ['U-BOB','bob@example.test','Bob Lee','C-2'],
  ]) {
    const user = await db.user.upsert({ where: { email }, update: { emailVerified: true }, create: { id, email, name, emailVerified: true } });
    const account = await db.account.findFirst({ where: { userId: user.id, providerId: 'credential' } });
    if (!account) await db.account.create({ data: { id: `credential-${user.id}`, accountId: user.id, userId: user.id, providerId: 'credential', password: await hashPassword('Course-only-passphrase-40!') } });
    await db.customer.update({ where: { id: customerId }, data: { userId: user.id } });
  }
  await db.order.upsert({ where: { id: 'O-2001' }, update: {}, create: { id: 'O-2001', customerId: 'C-2', note: 'Bob owns this order.', items: { create: { productId: 'P-103', quantity: 1, unitPriceMinor: 2800 } } } });
  console.log('Local Alex/Bob fixtures ready. Existing passwords were preserved.');
} finally { await db.$disconnect(); }
