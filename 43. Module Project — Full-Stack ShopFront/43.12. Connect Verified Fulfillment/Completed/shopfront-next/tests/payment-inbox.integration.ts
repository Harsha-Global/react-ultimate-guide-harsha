import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import type Stripe from 'stripe';
import { storePaymentEvent } from '../lib/paymentInbox';
import { db } from '../lib/db';
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Use the isolated test database.');
test('the verified inbox stores concurrent deliveries once and ignores unsupported events', async () => {
 const id = 'evt_local_' + randomUUID();
 const event = {id, type:'checkout.session.completed',livemode:false,data:{object:{id:'cs_local_check'}}} as Stripe.Event;
 try {
  assert.deepEqual(await Promise.all([storePaymentEvent(event),storePaymentEvent(event)]),[id,id]);
  assert.equal(await db.paymentEvent.count({where:{id}}),1);
  assert.equal((await db.paymentEvent.findUniqueOrThrow({where:{id}})).status,'received');
  assert.equal(await storePaymentEvent({...event,type:'customer.created'} as Stripe.Event),null);
  await assert.rejects(storePaymentEvent({...event,livemode:true}),/Live payment/);
 }finally{await db.paymentEvent.deleteMany({where:{id}});await db.$disconnect();}
});
