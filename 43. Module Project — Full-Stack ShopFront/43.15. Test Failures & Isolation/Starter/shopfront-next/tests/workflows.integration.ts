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
    const session = { id: sessionId, livemode: false, metadata: { orderId: id }, currency: 'usd', amount_total: 8900, payment_status: 'unpaid' as const, status: 'complete' as const };
    await assert.rejects(saveReceipt(id), /verified paid order/);
    await applyVerifiedSession(events[0], session);
    assert.equal((await db.order.findUniqueOrThrow({where:{id}})).status,'pending');
    await assert.rejects(applyVerifiedSession(events[3], { ...session, amount_total: 1, payment_status: 'paid' }), /do not match/);
    assert.equal((await db.paymentEvent.findUniqueOrThrow({where:{id:events[3]}})).status,'received');
    await applyVerifiedSession(events[1], { ...session, payment_status: 'paid' });
    await applyVerifiedSession(events[1], { ...session, payment_status: 'paid' });
    await applyVerifiedSession(events[2], session);
    assert.equal((await db.order.findUniqueOrThrow({where:{id}})).status,'paid');
    assert.equal(await db.outbox.count({where:{orderId:id}}),1);
    await Promise.all([saveReceipt(id),saveReceipt(id)]);
    assert.equal(await db.receipt.count({where:{orderId:id}}),1);
    assert.equal((await db.receipt.findUniqueOrThrow({where:{orderId:id}})).totalMinor,8900);
    await assert.rejects(dispatchOutbox(async()=>{throw new Error('Controlled offline sender');}), /offline sender/);
    assert.equal((await db.outbox.findUniqueOrThrow({where:{orderId:id}})).deliveredAt,null);
    const sent: string[]=[];
    await dispatchOutbox(async event=>{sent.push(event.id);});
    await dispatchOutbox(async event=>{sent.push(event.id);});
    assert.equal(sent.filter(value=>value===`paid-${id}`).length,1);
    assert.ok((await db.outbox.findUniqueOrThrow({where:{orderId:id}})).deliveredAt);
  } finally {
    await db.receipt.deleteMany({where:{orderId:id}});
    await db.outbox.deleteMany({where:{orderId:id}});
    await db.paymentEvent.deleteMany({where:{id:{in:events}}});
    await db.order.deleteMany({where:{id}});
    await db.$disconnect();
  }
});
