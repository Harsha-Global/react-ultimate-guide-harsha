import 'dotenv/config';
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
  for (const product of [
    { id: 'P-101', slug: 'studio-desk-lamp', name: 'Studio Desk Lamp', priceMinor: 8900, stock: 12 },
    { id: 'P-103', slug: 'terracotta-travel-mug', name: 'Terracotta Travel Mug', priceMinor: 2800, stock: 3 },
  ]) await prisma.product.upsert({ where: { id: product.id }, create: product, update: product });
  await prisma.order.upsert({ where: { id: 'O-1001' }, update: {}, create: {
    id: 'O-1001', customerId: 'C-1', items: { create: [
      { productId: 'P-101', quantity: 1, unitPriceMinor: 8900 },
      { productId: 'P-103', quantity: 2, unitPriceMinor: 2800 },
    ] },
  } });
  console.log('Seeded two customers, two products, and sample order O-1001.');
} finally { await prisma.$disconnect(); }
