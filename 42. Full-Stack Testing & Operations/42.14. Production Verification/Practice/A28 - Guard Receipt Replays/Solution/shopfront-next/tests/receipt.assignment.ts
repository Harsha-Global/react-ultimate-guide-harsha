import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { db } from '../lib/db';
import { saveReceipt } from '../lib/receipt';

const url = new URL(process.env.DATABASE_URL ?? '');
if (!['localhost', '127.0.0.1'].includes(url.hostname)
  || url.pathname !== '/shopfront_test')
  throw new Error('Use the isolated local test database.');

test('receipt creation rejects unpaid orders and remains stable across duplicate paid calls', async () => {
  const productId = `a28-${randomUUID()}`;
  const orderId = `a28-${randomUUID()}`;
  try {
    await db.product.create({
      data: {
        id: productId,
        slug: productId,
        name: 'A28 disposable product',
        priceMinor: 9999,
        stock: 1
      }
    });
    await db.order.create({
      data: {
        id: orderId,
        customerId: 'C-1',
        items: {
          create: { productId, quantity: 2, unitPriceMinor: 1250 }
        }
      }
    });
    await assert.rejects(saveReceipt(orderId), /verified paid order/);
    assert.equal(await db.receipt.count({ where: { orderId } }), 0);
    // Controlled database fixture, not evidence of a real provider payment.
    await db.order.update({ where: { id: orderId }, data: { status: 'paid' } });
    const results = await Promise.all([
      saveReceipt(orderId),
      saveReceipt(orderId)
    ]);
    assert.deepEqual(results, [
      { orderId, totalMinor: 2500 },
      { orderId, totalMinor: 2500 }
    ]);
    assert.equal(await db.receipt.count({ where: { orderId } }), 1);
    const original = await db.receipt.findUniqueOrThrow({ where: { orderId } });
    await db.product.update({ where: { id: productId }, data: { priceMinor: 1 } });
    assert.deepEqual(await saveReceipt(orderId), { orderId, totalMinor: 2500 });
    const repeated = await db.receipt.findUniqueOrThrow({ where: { orderId } });
    assert.equal(repeated.createdAt.getTime(), original.createdAt.getTime());
    assert.equal(repeated.totalMinor, 2500);
    assert.equal((await db.order.findUniqueOrThrow({ where: { id: orderId } })).status, 'paid');
  } finally {
    try {
      await db.receipt.deleteMany({ where: { orderId } });
      await db.order.deleteMany({ where: { id: orderId } });
      await db.product.deleteMany({ where: { id: productId } });
    } finally {
      await db.$disconnect();
    }
  }
});
