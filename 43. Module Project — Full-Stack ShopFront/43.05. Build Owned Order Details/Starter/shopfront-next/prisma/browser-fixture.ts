import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['127.0.0.1', 'localhost'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Browser fixtures require the isolated local test database.');
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: url.href }) });
try {
  await db.order.upsert({ where: { id: 'O-BROWSER-1001' },
    update: { status: 'pending', note: '', checkoutSessionId: null },
    create: { id: 'O-BROWSER-1001', customerId: 'C-1', items: { create: { productId: 'P-101', quantity: 1, unitPriceMinor: 8900 } } },
  });
  console.log('Isolated browser order is ready.');
} finally { await db.$disconnect(); }
