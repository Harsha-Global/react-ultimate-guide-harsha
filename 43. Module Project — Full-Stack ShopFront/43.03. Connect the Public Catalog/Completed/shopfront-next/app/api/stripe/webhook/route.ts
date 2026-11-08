import { reconcilePaymentEvent } from '@/lib/paymentReconciliation';
import type Stripe from 'stripe';
import { verifyPaymentEvent } from '@/lib/paymentSignature';
import { storePaymentEvent } from '@/lib/paymentInbox';
import { readRawBody } from '@/lib/readRawBody';
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return Response.json({ error: 'Webhook configuration is missing.' }, { status: 503 });
  let event: Stripe.Event;
  try {
    event = verifyPaymentEvent(await readRawBody(request), request.headers.get('stripe-signature') ?? '', secret);
    if (event.livemode) throw new Error('Live events are rejected.');
  } catch { return Response.json({ error: 'Webhook verification failed.' }, { status: 400 }); }
  try {
    const eventId = await storePaymentEvent(event);
    if (eventId) await reconcilePaymentEvent(eventId);
    return Response.json({ received: true });
  } catch { return Response.json({ error: 'Try delivery again.' }, { status: 500 }); }
}
