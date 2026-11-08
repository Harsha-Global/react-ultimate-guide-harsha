import 'dotenv/config';
import { db } from '../lib/db';
import { applyVerifiedSession } from '../lib/paymentReconciliation';
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['127.0.0.1','localhost'].includes(url.hostname) || !['/shopfront_dev','/shopfront_test'].includes(url.pathname)) throw new Error('The synthetic job fixture is local course data only.');
const mode = process.argv[2];
if (!['receipt','outbox'].includes(mode ?? '')) throw new Error('Choose receipt or outbox.');
const id = `O-DEMO-${mode?.toUpperCase()}`;
const eventId = `evt_local_${mode}`, sessionId = `cs_local_${mode}`;
try {
 if (process.argv[3] === 'clean') {
  await db.outbox.deleteMany({where:{orderId:id}});
  await db.receipt.deleteMany({where:{orderId:id}});
  await db.paymentEvent.deleteMany({where:{id:eventId}});
  await db.order.deleteMany({where:{id}});
  console.log(`Removed only synthetic job fixture ${id}.`);
 } else {
  // Each step can resume after a stopped local rehearsal.
  await db.order.upsert({where:{id},update:{},create:{id,customerId:'C-1',checkoutSessionId:sessionId,items:{create:{productId:'P-101',quantity:1,unitPriceMinor:8900}}}});
  await db.paymentEvent.upsert({where:{id:eventId},update:{},create:{id:eventId,type:'checkout.session.completed',checkoutSessionId:sessionId}});
  await applyVerifiedSession(eventId,{id:sessionId,livemode:false,metadata:{orderId:id},currency:'usd',amount_total:8900,payment_status:'paid',status:'complete'});
  console.log(`Synthetic local job fixture: ${id}. No provider request or payment occurred. Open /orders/${id} as Alex.`);
 }
} finally { await db.$disconnect(); }
