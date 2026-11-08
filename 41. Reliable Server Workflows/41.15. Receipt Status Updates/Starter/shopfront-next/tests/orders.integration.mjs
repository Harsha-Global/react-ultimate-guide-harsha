import { fetchWithAuthRetry } from './test-auth.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import pg from 'pg';
const base = process.env.BETTER_AUTH_URL;
const url = new URL(process.env.DATABASE_URL ?? '');
if (base !== 'http://127.0.0.1:3140' || url.pathname !== '/shopfront_test') throw new Error('Use the isolated test launcher.');
const database = new pg.Client({ connectionString: url.toString() });
async function order(cookie, data) {
  const response = await fetch(`${base}/api/workshop/orders`, { method: 'POST', headers: { cookie, origin: base, 'content-type': 'application/json' }, body: JSON.stringify(data) });
  return { status: response.status, body: await response.json() };
}
test('validation, atomic stock reservation and idempotent order creation', async () => {
  await database.connect();
  const productIds = ['test-'+randomUUID(), 'test-'+randomUUID()];
  const keys = [randomUUID(), randomUUID(), randomUUID()];
  try {
    for (const id of productIds) await database.query('INSERT INTO "Product" (id,slug,name,"priceMinor",stock) VALUES ($1,$1,$2,100,1)', [id,'Disposable test product']);
    const signIn = await fetchWithAuthRetry(`${base}/api/auth/sign-in/email`, { method: 'POST', headers: { origin: base, 'content-type': 'application/json' }, body: JSON.stringify({ email: 'alex@example.test', password: 'Course-only-passphrase-40!' }) });
    assert.equal(signIn.status, 200);
    const cookie = signIn.headers.getSetCookie().map(value => value.split(';')[0]).join('; ');
    const data = { requestKey: keys[0], productId: productIds[0], quantity: 1 };
    assert.equal((await order('', data)).status, 401);
    assert.equal((await order(cookie, { ...data, quantity: 0 })).status, 400);
    assert.equal((await order(cookie, { ...data, priceMinor: 1 })).status, 400);
    const repeated = await Promise.all([order(cookie, data), order(cookie, data)]);
    assert.deepEqual(repeated.map(result => result.status), [201, 201]);
    assert.equal(repeated[0].body.id, repeated[1].body.id);
    const stock = await database.query('SELECT stock FROM "Product" WHERE id = $1', [productIds[0]]);
    assert.equal(stock.rows[0].stock, 0);
    const saved = await database.query('SELECT count(*)::int AS count FROM "Order" WHERE "requestKey" = $1', [data.requestKey]);
    assert.equal(saved.rows[0].count, 1);
    assert.equal((await order(cookie, { ...data, quantity: 2 })).status, 409);
    const competing = await Promise.all([1, 2].map(index => order(cookie, { requestKey: keys[index], productId: productIds[1], quantity: 1 })));
    assert.deepEqual(competing.map(result => result.status).sort(), [201, 409]);
    assert.equal((await database.query('SELECT stock FROM "Product" WHERE id = $1', [productIds[1]])).rows[0].stock, 0);
  } finally {
    try {
      await database.query('DELETE FROM "OrderItem" WHERE "orderId" IN (SELECT id FROM "Order" WHERE "requestKey" = ANY($1))', [keys]);
      await database.query('DELETE FROM "Order" WHERE "requestKey" = ANY($1)', [keys]);
      await database.query('DELETE FROM "Product" WHERE id = ANY($1)', [productIds]);
    } finally { await database.end(); }
  }
});
