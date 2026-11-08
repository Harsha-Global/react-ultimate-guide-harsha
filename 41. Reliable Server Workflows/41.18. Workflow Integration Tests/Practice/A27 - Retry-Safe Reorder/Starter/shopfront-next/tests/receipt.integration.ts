import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { db } from '../lib/db';
import { saveReceipt } from '../lib/receipt';
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Use the separate local test database.');
test('a receipt requires paid state and concurrent retries preserve one saved amount',async()=>{
 const id='receipt-check-'+randomUUID();
 try{
  await db.order.create({data:{id,customerId:'C-1',items:{create:{productId:'P-101',quantity:2,unitPriceMinor:2500}}}});
  await assert.rejects(saveReceipt(id),/verified paid order/);
  await db.order.update({where:{id},data:{status:'paid'}}); // Explicit synthetic state, not provider proof.
  await Promise.all([saveReceipt(id),saveReceipt(id)]);
  const first=await db.receipt.findUniqueOrThrow({where:{orderId:id}});
  assert.equal(first.totalMinor,5000);assert.equal(await db.receipt.count({where:{orderId:id}}),1);
  await saveReceipt(id);const repeated=await db.receipt.findUniqueOrThrow({where:{orderId:id}});
  assert.equal(repeated.createdAt.getTime(),first.createdAt.getTime());assert.equal(repeated.totalMinor,5000);
 }finally{await db.receipt.deleteMany({where:{orderId:id}});await db.order.deleteMany({where:{id}});await db.$disconnect();}
});
