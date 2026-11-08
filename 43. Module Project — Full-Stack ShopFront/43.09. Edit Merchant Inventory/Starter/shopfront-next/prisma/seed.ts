import 'dotenv/config';
import { products } from '../lib/catalog';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['127.0.0.1', 'localhost'].includes(url.hostname) || !['/shopfront_dev', '/shopfront_test'].includes(url.pathname)) {
  throw new Error('This course seed is restricted to the named local development/test databases.');
}
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url.href }) });
try {
  for (const customer of [
    { id: 'C-1', name: 'Alex Carter', email: 'alex@example.com' },
    { id: 'C-2', name: 'Morgan Reed', email: 'morgan@example.com' },
  ]) await prisma.customer.upsert({ where: { id: customer.id }, create: customer, update: customer });
  await prisma.workspace.upsert({ where: { id: 'W-1' }, create: { id: 'W-1', name: 'Studio team' }, update: {} });
  await prisma.workspace.upsert({ where: { id: 'W-2' }, create: { id: 'W-2', name: 'Travel team' }, update: {} });
  // This seed deliberately resets sample inventory. Never run it on production.
  for (const product of products) {
    await prisma.product.upsert({ where: { id: product.id }, create: { ...product, workspaceId: product.id === 'P-103' ? 'W-2' : 'W-1' }, update: { ...product, workspaceId: product.id === 'P-103' ? 'W-2' : 'W-1' } });
  }
  await prisma.order.upsert({ where: { id: 'O-1001' }, update: {}, create: {
    id: 'O-1001', customerId: 'C-1', items: { create: [
      { productId: 'P-101', quantity: 1, unitPriceMinor: 8900 },
      { productId: 'P-103', quantity: 2, unitPriceMinor: 2800 },
    ] },
  } });
  console.log('Seeded two customers, four products, and sample order O-1001.');
} finally { await prisma.$disconnect(); }
