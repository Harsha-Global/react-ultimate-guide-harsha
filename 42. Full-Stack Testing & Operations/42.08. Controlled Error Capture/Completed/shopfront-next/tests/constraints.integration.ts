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
    await assert.rejects(db.$transaction(async tx => {
      await tx.product.update({where:{id:'P-101'},data:{stock:{decrement:1}}});
      await tx.order.create({data:{id,customerId:'missing-course-customer'}});
    }), isConstraint('P2003', 'Order_customerId_fkey'));
    assert.equal((await db.product.findUniqueOrThrow({where:{id:'P-101'}})).stock,before.stock);
    assert.equal(await db.order.count({where:{id}}),0);
    await assert.rejects(db.product.update({where:{id:'P-101'},data:{stock:-1}}), isConstraint('P2039', 'Product_stock_nonnegative'));
    assert.equal((await db.product.findUniqueOrThrow({where:{id:'P-101'}})).stock,before.stock);
    await assert.rejects(db.$transaction(async tx => {
      await tx.product.update({where:{id:'P-101'},data:{stock:{decrement:1}}});
      await tx.order.create({data:{id,customerId:'C-1'}});
      await tx.orderItem.create({data:{orderId:id,productId:'P-101',quantity:0,unitPriceMinor:8900}});
    }), isConstraint('P2039', 'OrderItem_quantity_positive'));
    assert.equal(await db.order.count({where:{id}}),0);
    assert.equal((await db.product.findUniqueOrThrow({where:{id:'P-101'}})).stock,before.stock);
  } finally { await db.order.deleteMany({where:{id}});await db.$disconnect(); }
});
