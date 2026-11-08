import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { db } from '../lib/db';
import { applyVerifiedSession } from '../lib/paymentReconciliation';
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Use the isolated test database.');
test('verified replay, concurrent events, two workspaces and an independent order preserve fulfillment identity', async () => {
  const prefix = `fulfill-${randomUUID()}`;
  const orderIds = [prefix+'-one', prefix+'-two'];
  const events: string[] = [];
  try {
    // Write the narrated requests and saved-result assertions here.
  } finally {
    await db.outbox.deleteMany({ where: { orderId: { in: orderIds } } });
    await db.paymentEvent.deleteMany({ where: { id: { in: events } } });
    await db.order.deleteMany({ where: { id: { in: orderIds } } });
    await db.$disconnect();
  }
});
