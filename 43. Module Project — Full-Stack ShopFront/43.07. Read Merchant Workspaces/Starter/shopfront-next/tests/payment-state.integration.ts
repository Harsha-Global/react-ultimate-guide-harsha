import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { db } from '../lib/db';
import { applyVerifiedSession } from '../lib/paymentReconciliation';
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Isolated database required.');
test('verified payment state rejects a wrong amount and never reverses a paid order', async () => {
  const id = `test-${randomUUID()}`; const sessionId = `cs_test_${randomUUID()}`;
  const events = ['unpaid','paid','old','wrong'].map(label => `${label}-${id}`);
  try {
    await db.order.create({ data: { id, customerId: 'C-1', checkoutSessionId: sessionId, items: { create: { productId: 'P-101', quantity: 1, unitPriceMinor: 8900 } } } });
    for (const eventId of events) await db.paymentEvent.create({ data: { id: eventId, type: 'checkout.session.completed', checkoutSessionId: sessionId } });
    const session = { id: sessionId, livemode: false, metadata: { orderId: id }, currency: 'usd', amount_total: 8900, payment_status: 'unpaid' as const, status: 'complete' as const };
    await applyVerifiedSession(events[0], session);
    assert.equal((await db.order.findUniqueOrThrow({where:{id}})).status,'pending');
    await assert.rejects(applyVerifiedSession(events[3], { ...session, amount_total: 1, payment_status: 'paid' }), /do not match/);
    assert.equal((await db.paymentEvent.findUniqueOrThrow({where:{id:events[3]}})).status,'received');
    await applyVerifiedSession(events[1], { ...session, payment_status: 'paid' });
    await applyVerifiedSession(events[1], { ...session, payment_status: 'paid' });
    await applyVerifiedSession(events[2], session);
    assert.equal((await db.order.findUniqueOrThrow({where:{id}})).status,'paid');
    assert.equal(await db.outbox.count({where:{orderId:id}}),1);
    assert.equal((await db.outbox.findUniqueOrThrow({where:{orderId:id}})).id,`paid-${id}`);
  } finally {
    await db.outbox.deleteMany({where:{orderId:id}});
    await db.paymentEvent.deleteMany({where:{id:{in:events}}});
    await db.order.deleteMany({where:{id}});
    await db.$disconnect();
  }
});
