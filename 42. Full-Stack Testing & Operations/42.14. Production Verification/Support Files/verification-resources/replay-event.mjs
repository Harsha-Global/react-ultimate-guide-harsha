import { createRequire } from 'node:module';
import fs from 'node:fs';
import assert from 'node:assert/strict';

const require = createRequire(new URL('../shopfront-next/package.json', import.meta.url));
const env = require('dotenv').parse(fs.readFileSync(new URL('../shopfront-next/.env', import.meta.url)));
const database = new URL(env.DATABASE_URL);
assert(['localhost', '127.0.0.1'].includes(database.hostname));
assert.equal(database.pathname, '/shopfront_dev');
assert(env.STRIPE_SECRET_KEY.startsWith('sk_test_') || env.STRIPE_SECRET_KEY.startsWith('rk_test_'));
assert(env.STRIPE_WEBHOOK_SECRET.startsWith('whsec_'));
const eventId = process.argv[2];
assert(/^evt_[A-Za-z0-9]+$/.test(eventId));
const pg = require('pg');
pg.types.setTypeParser(1114, value => value.replace(' ', 'T') + 'Z');
const client = new pg.Client({ connectionString: database.href });
const stripe = new (require('stripe'))(env.STRIPE_SECRET_KEY);
await client.connect();
try {
  const event = await stripe.events.retrieve(eventId);
  assert.equal(event.livemode, false);
  assert.equal(event.type, 'checkout.session.completed');
  const session = event.data.object;
  assert.equal(session.payment_status, 'paid');
  const orderId = session.metadata.orderId;
  const snapshot = async () => {
    const order = (await client.query('SELECT id, status, "checkoutSessionId" FROM "Order" WHERE id = $1', [orderId])).rows;
    const receipt = (await client.query('SELECT * FROM "Receipt" WHERE "orderId" = $1', [orderId])).rows;
    const outbox = (await client.query('SELECT * FROM "Outbox" WHERE "orderId" = $1', [orderId])).rows;
    const inbox = (await client.query('SELECT * FROM "PaymentEvent" WHERE id = $1', [eventId])).rows;
    return { order, receipt, outbox, inbox };
  };
  const before = await snapshot();
  assert.equal(before.order.length, 1);
  assert.equal(before.order[0].status, 'paid');
  assert.equal(before.order[0].checkoutSessionId, session.id);
  assert.equal(before.receipt.length, 1);
  assert.equal(before.inbox[0].status, 'processed');
  const payload = JSON.stringify(event);
  const signature = stripe.webhooks.generateTestHeaderString({
    payload,
    secret: env.STRIPE_WEBHOOK_SECRET
  });
  console.log('CONTROLLED LOCAL REPLAY / ACTUAL SANDBOX EVENT');
  console.log('Event:', eventId);
  console.log('Order:', orderId);
  const response = await fetch('http://localhost:3000/api/stripe/webhook', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'stripe-signature': signature },
    body: payload
  });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).received, true);
  const after = await snapshot();
  assert.deepEqual(after, before);
  console.log('Webhook response:', response.status);
  console.log('Paid order, processed inbox and outbox: unchanged');
  console.log('Receipt rows:', after.receipt.length);
  console.log('Receipt order:', after.receipt[0].orderId);
  console.log('Receipt total:', after.receipt[0].totalMinor);
  console.log('Receipt created:', after.receipt[0].createdAt);
  console.log('No new payment transition or receipt.');
} finally {
  await client.end();
}
