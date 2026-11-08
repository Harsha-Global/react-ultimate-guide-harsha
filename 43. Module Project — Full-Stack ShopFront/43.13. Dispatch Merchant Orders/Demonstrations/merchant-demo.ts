import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import { db } from '../lib/db';
import { applyVerifiedSession } from '../lib/paymentReconciliation';
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['127.0.0.1','localhost'].includes(url.hostname) || url.pathname !== '/shopfront_dev') throw new Error('This named demonstration requires the disposable local shopfront_dev database.');
const mode = process.argv[2];
if (!['prepare','clean'].includes(mode ?? '')) throw new Error('Choose prepare or clean. Keep the local jobs runner stopped for this fixture.');
const id = 'O-DEMO-MERCHANT-43';
const eventId = 'evt_local_merchant_43';
try {
  if (mode === 'clean') {
    await db.$transaction(async tx => {
      await tx.receipt.deleteMany({ where: { orderId: id } });
      await tx.outbox.deleteMany({ where: { orderId: id } });
      await tx.paymentEvent.deleteMany({ where: { id: eventId } });
      await tx.order.deleteMany({ where: { id } });
    });
    console.log('Removed only O-DEMO-MERCHANT-43 and its related synthetic demonstration records.');
  } else {
    if (await db.order.findUnique({ where: { id } })) throw new Error('The named fixture already exists. Inspect it and use the explicit clean command before another demonstration.');
    const sessionId = 'cs_local_merchant_43_' + randomUUID();
    await db.$transaction(async tx => {
      await tx.order.create({ data: { id, customerId: 'C-1', checkoutSessionId: sessionId,
        items: { create: [{ productId: 'P-101', quantity: 1, unitPriceMinor: 8900 }, { productId: 'P-103', quantity: 2, unitPriceMinor: 2800 }] } } });
      await tx.paymentEvent.create({ data: { id: eventId, type: 'checkout.session.completed', checkoutSessionId: sessionId } });
    });
    await applyVerifiedSession(eventId, { id: sessionId, livemode: false, metadata: { orderId: id }, currency: 'usd', amount_total: 14500, payment_status: 'paid', status: 'complete' });
    const rows = await db.fulfillment.findMany({ where: { orderId: id }, orderBy: { workspaceId: 'asc' }, select: { orderId: true, workspaceId: true, status: true } });
    console.log('Synthetic local payment state only: no provider request, charge, stock reservation or physical shipment. Keep jobs stopped.');
    console.log(rows);
    console.log('Open /merchant/W-1?status=ready as Alex. Dispatch only O-DEMO-MERCHANT-43, then run the clean command.');
  }
} finally { await db.$disconnect(); }
