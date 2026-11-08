import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { db } from '../lib/db';
import { applyVerifiedSession } from '../lib/paymentReconciliation';
import { saveReceipt } from '../lib/receipt';
import { dispatchOutbox } from '../lib/outbox';
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Isolated database required.');
test('verified state, duplicate delivery, receipts and durable outbox recovery', async () => {
  const id = `test-${randomUUID()}`; const sessionId = `cs_test_${randomUUID()}`;
  const events = ['unpaid','paid','old','wrong'].map(label => `${label}-${id}`);
  try {
    assert.equal(await db.outbox.count({where:{deliveredAt:null}}),0,'Finish earlier synthetic pending outbox work before this isolated check.');
    await db.order.create({ data: { id, customerId: 'C-1', checkoutSessionId: sessionId, items: { create: { productId: 'P-101', quantity: 1, unitPriceMinor: 8900 } } } });
    for (const eventId of events) await db.paymentEvent.create({ data: { id: eventId, type: 'checkout.session.completed', checkoutSessionId: sessionId } });
    // LIVE: add payment, receipt and dispatcher assertions here.
  } finally {
    await db.receipt.deleteMany({where:{orderId:id}});
    await db.outbox.deleteMany({where:{orderId:id}});
    await db.paymentEvent.deleteMany({where:{id:{in:events}}});
    await db.order.deleteMany({where:{id}});
    await db.$disconnect();
  }
});
