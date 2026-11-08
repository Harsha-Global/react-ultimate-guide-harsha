import { createRequire } from 'node:module';
import fs from 'node:fs';
import assert from 'node:assert/strict';

const require = createRequire(new URL('../shopfront-next/package.json', import.meta.url));
const env = require('dotenv').parse(fs.readFileSync(new URL('../shopfront-next/.env', import.meta.url)));
const database = new URL(env.DATABASE_URL);
assert(['localhost', '127.0.0.1'].includes(database.hostname));
assert.equal(database.pathname, '/shopfront_dev');
assert(env.STRIPE_SECRET_KEY.startsWith('sk_test_') || env.STRIPE_SECRET_KEY.startsWith('rk_test_'));
const orderId = process.argv[2];
assert(orderId && orderId.length < 100);
const pg = require('pg');
pg.types.setTypeParser(1114, value => value.replace(' ', 'T') + 'Z');
const client = new pg.Client({ connectionString: database.href });
const stripe = new (require('stripe'))(env.STRIPE_SECRET_KEY);
await client.connect();
try {
  await client.query('BEGIN READ ONLY');
  const order = (await client.query('SELECT id, status, "checkoutSessionId" FROM "Order" WHERE id = $1', [orderId])).rows[0];
  assert(order?.checkoutSessionId);
  const total = Number((await client.query('SELECT sum(quantity * "unitPriceMinor") AS total FROM "OrderItem" WHERE "orderId" = $1', [orderId])).rows[0].total);
  const events = (await client.query('SELECT id, status FROM "PaymentEvent" WHERE "checkoutSessionId" = $1', [order.checkoutSessionId])).rows;
  const outbox = (await client.query('SELECT attempts, "deliveredAt" FROM "Outbox" WHERE "orderId" = $1', [orderId])).rows[0];
  const receipts = (await client.query('SELECT "orderId", "totalMinor", "createdAt" FROM "Receipt" WHERE "orderId" = $1', [orderId])).rows;
  await client.query('ROLLBACK');
  const session = await stripe.checkout.sessions.retrieve(order.checkoutSessionId);
  assert.equal(session.livemode, false);
  assert.equal(session.metadata.orderId, orderId);
  assert.equal(session.amount_total, total);
  assert.equal(session.currency, 'usd');
  console.log('LOCAL RELEASE / ACTUAL STRIPE SANDBOX');
  console.log('Order:', order.id);
  console.log('Saved state:', order.status);
  console.log('Saved total:', total, 'minor units');
  console.log('Session:', session.id);
  console.log('Provider:', session.payment_status, session.amount_total, session.currency);
  for (const event of events) {
    console.log('Event:', event.id);
    console.log('Event state:', event.status);
  }
  console.log('Outbox:', outbox?.deliveredAt ? 'delivered' : 'pending');
  console.log('Dispatch attempts:', outbox?.attempts ?? 0);
  console.log('Receipt rows:', receipts.length);
  for (const receipt of receipts) {
    console.log('Receipt order:', receipt.orderId);
    console.log('Receipt total:', receipt.totalMinor);
    console.log('Receipt created:', receipt.createdAt);
  }
} finally {
  await client.end();
}
