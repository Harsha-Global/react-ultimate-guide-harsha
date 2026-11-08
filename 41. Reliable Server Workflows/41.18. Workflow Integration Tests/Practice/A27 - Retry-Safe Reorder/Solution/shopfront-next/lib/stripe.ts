import 'server-only';
import Stripe from 'stripe';
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key?.startsWith('sk_test_') && !key?.startsWith('rk_test_')) throw new Error('Configure a Stripe sandbox key; live keys are rejected by this course project.');
  return new Stripe(key, { timeout: 10000, maxNetworkRetries: 2 });
}
