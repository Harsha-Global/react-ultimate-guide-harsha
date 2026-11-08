import test from 'node:test';
import assert from 'node:assert/strict';
import Stripe from 'stripe';
import { verifyPaymentEvent } from '../lib/paymentSignature.ts';
const secret = 'whsec_disposable_local_fixture';
const payload = JSON.stringify({ id: 'evt_fixture', type: 'checkout.session.completed', livemode: false, data: { object: { id: 'cs_test_fixture' } } });
test('the original signed bytes are accepted', () => {
  const signature = Stripe.webhooks.generateTestHeaderString({ payload, secret });
  assert.equal(verifyPaymentEvent(payload, signature, secret).id, 'evt_fixture');
});
test('changed bytes, missing signature and an expired signature are rejected', () => {
  const signature = Stripe.webhooks.generateTestHeaderString({ payload, secret });
  assert.throws(() => verifyPaymentEvent(payload + ' ', signature, secret));
  assert.throws(() => verifyPaymentEvent(payload, '', secret));
  const old = Stripe.webhooks.generateTestHeaderString({ payload, secret, timestamp: Math.floor(Date.now() / 1000) - 600 });
  assert.throws(() => verifyPaymentEvent(payload, old, secret));
});
