import Stripe from 'stripe';
export function verifyPaymentEvent(rawBody: string, signature: string, secret: string) {
  return Stripe.webhooks.constructEvent(rawBody, signature, secret);
}
