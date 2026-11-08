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
    for (const id of orderIds) await db.order.create({ data: { id, customerId: 'C-1', checkoutSessionId: 'cs_'+id,
      items: { create: [{ productId: 'P-101', quantity: 1, unitPriceMinor: 8900 }, { productId: 'P-103', quantity: 1, unitPriceMinor: 2800 }] } } });
    const session = (id: string) => ({ id: 'cs_'+id, livemode: false, metadata: { orderId: id }, currency: 'usd', amount_total: 11700, payment_status: 'paid' as const, status: 'complete' as const });
    async function event(orderId: string, label: string) {
      const id = orderId+'-'+label; events.push(id);
      await db.paymentEvent.create({ data: { id, checkoutSessionId: 'cs_'+orderId, type: 'checkout.session.completed' } });
      return id;
    }
    const wrong = await event(orderIds[0], 'wrong');
    await assert.rejects(applyVerifiedSession(wrong, { ...session(orderIds[0]), amount_total: 1 }), /do not match/);
    assert.equal(await db.fulfillment.count({ where: { orderId: orderIds[0] } }), 0);
    assert.equal((await db.order.findUniqueOrThrow({ where: { id: orderIds[0] } })).status, 'pending');
    assert.equal(await db.outbox.count({ where: { orderId: orderIds[0] } }), 0);
    assert.equal((await db.paymentEvent.findUniqueOrThrow({ where: { id: wrong } })).status, 'received');
    console.log('Wrong total rejected; order remains pending, with no fulfillment or outbox:', orderIds[0]);
    const first = await event(orderIds[0], 'first');
    await applyVerifiedSession(first, session(orderIds[0]));
    const firstRows = await db.fulfillment.findMany({ where: { orderId: orderIds[0] }, orderBy: { workspaceId: 'asc' } });
    assert.deepEqual(firstRows.map(row => ({ workspaceId: row.workspaceId, status: row.status })), [
      { workspaceId: 'W-1', status: 'ready' }, { workspaceId: 'W-2', status: 'ready' },
    ]);
    assert.equal((await db.order.findUniqueOrThrow({ where: { id: orderIds[0] } })).status, 'paid');
    assert.equal((await db.outbox.findUniqueOrThrow({ where: { orderId: orderIds[0] } })).id, 'paid-'+orderIds[0]);
    assert.equal((await db.paymentEvent.findUniqueOrThrow({ where: { id: first } })).status, 'processed');
    console.log('Paid order, one outbox and both ready workspace identities:', orderIds[0], firstRows.map(row => row.workspaceId));
    await applyVerifiedSession(first, session(orderIds[0]));
    const second = await event(orderIds[0], 'second');
    const third = await event(orderIds[0], 'third');
    await Promise.all([applyVerifiedSession(second,session(orderIds[0])),applyVerifiedSession(third,session(orderIds[0]))]);
    assert.equal(await db.fulfillment.count({ where: { orderId: orderIds[0] } }), 2);
    assert.equal(await db.outbox.count({ where: { orderId: orderIds[0] } }), 1);
    const late = await event(orderIds[0], 'older-unpaid');
    await applyVerifiedSession(late, { ...session(orderIds[0]), payment_status: 'unpaid', status: 'open' });
    assert.equal((await db.order.findUniqueOrThrow({ where: { id: orderIds[0] } })).status, 'paid');
    assert.equal(await db.fulfillment.count({ where: { orderId: orderIds[0] } }), 2);
    console.log('Same-event replay, distinct concurrent events and older unpaid state preserve:', orderIds[0]);
    const independent = await event(orderIds[1], 'independent');
    await applyVerifiedSession(independent, session(orderIds[1]));
    assert.equal(await db.fulfillment.count({ where: { orderId: { in: orderIds } } }), 4);
    assert.equal(await db.outbox.count({ where: { orderId: { in: orderIds } } }), 2);
    console.log('Independent order has its own fulfillment identities:', orderIds[1]);
    console.log('Controlled verified-session fixtures; no Stripe network call or physical shipment.');
  } finally {
    await db.outbox.deleteMany({ where: { orderId: { in: orderIds } } });
    await db.paymentEvent.deleteMany({ where: { id: { in: events } } });
    await db.order.deleteMany({ where: { id: { in: orderIds } } });
    await db.$disconnect();
  }
});
