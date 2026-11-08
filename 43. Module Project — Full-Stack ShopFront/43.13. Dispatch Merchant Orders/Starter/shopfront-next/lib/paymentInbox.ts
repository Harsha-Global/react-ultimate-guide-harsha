import 'server-only';
import type Stripe from 'stripe';
import { db } from './db';
const supported = new Set(['checkout.session.completed', 'checkout.session.async_payment_succeeded', 'checkout.session.async_payment_failed', 'checkout.session.expired']);
export async function storePaymentEvent(event: Stripe.Event) {
  if (event.livemode) throw new Error('Live payment events are rejected by this course project.');
  if (!supported.has(event.type)) return null;
  const session = event.data.object as Stripe.Checkout.Session;
  await db.paymentEvent.createMany({ data: [{ id: event.id, type: event.type, checkoutSessionId: session.id }], skipDuplicates: true });
  return event.id;
}
