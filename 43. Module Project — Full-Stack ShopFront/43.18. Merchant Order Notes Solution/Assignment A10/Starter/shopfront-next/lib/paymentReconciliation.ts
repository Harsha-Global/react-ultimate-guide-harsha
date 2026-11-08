import 'server-only';
import type Stripe from 'stripe';
import { db } from './db';
import { ensureFulfillments } from './fulfillment';
import { getStripe } from './stripe';
type SessionState = Pick<Stripe.Checkout.Session, 'id' | 'livemode' | 'metadata' | 'currency' | 'amount_total' | 'payment_status' | 'status'>;
export async function applyVerifiedSession(eventId: string, session: SessionState) {
  if (session.livemode) throw new Error('Live sessions are rejected.');
  return db.$transaction(async tx => {
    const event = await tx.paymentEvent.findUniqueOrThrow({ where: { id: eventId } });
    if (event.status === 'processed') return;
    if (event.checkoutSessionId !== session.id) throw new Error('Payment event session mismatch.');
    const order = await tx.order.findUnique({ where: { checkoutSessionId: session.id }, include: { items: { include: { product: { select: { workspaceId: true } } } } } });
    if (!order) throw new Error('Checkout reference has not been saved yet. Retry this event.');
    const total = order.items.reduce((sum, item) => sum + item.quantity * item.unitPriceMinor, 0);
    if (session.metadata?.orderId !== order.id || session.currency !== 'usd' || session.amount_total !== total) {
      throw new Error('Payment details do not match the stored order.');
    }
    if (session.payment_status === 'paid') {
      const workspaces = order.items.flatMap(item => item.product.workspaceId ? [item.product.workspaceId] : []);
      await ensureFulfillments(tx, order.id, workspaces);
      await tx.order.updateMany({ where: { id: order.id, status: 'pending' }, data: { status: 'paid' } });
      await tx.outbox.upsert({ where: { orderId: order.id }, update: {}, create: { id: `paid-${order.id}`, orderId: order.id } });
    }
    // An older unpaid notification must never move a paid order backwards.
    await tx.paymentEvent.update({ where: { id: eventId }, data: { status: 'processed', processedAt: new Date() } });
  });
}
export async function reconcilePaymentEvent(eventId: string) {
  const event = await db.paymentEvent.findUniqueOrThrow({ where: { id: eventId } });
  if (event.status === 'processed') return;
  const currentSession = await getStripe().checkout.sessions.retrieve(event.checkoutSessionId);
  await applyVerifiedSession(eventId, currentSession);
}
