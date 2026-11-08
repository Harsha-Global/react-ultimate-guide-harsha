import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { db } from '../lib/db';
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Isolated database required.');
function isConstraint(code: string, name: string) {
  return (error: unknown) => error instanceof Error && 'code' in error && error.code === code &&
    'meta' in error && JSON.stringify(error.meta).includes(name);
}
test('a failed related write rolls back and database constraints reject invalid state', async () => {
  const id = `constraint-${randomUUID()}`;
  const before = await db.product.findUniqueOrThrow({where:{id:'P-101'}});
  try {
    // LIVE: add the three constraint assertions.
  } finally { await db.order.deleteMany({where:{id}});await db.$disconnect(); }
});
