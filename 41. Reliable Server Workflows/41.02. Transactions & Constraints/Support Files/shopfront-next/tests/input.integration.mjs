import { fetchWithAuthRetry } from './test-auth.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import pg from 'pg';
const base = process.env.BETTER_AUTH_URL;
const url = new URL(process.env.DATABASE_URL ?? '');
if (base !== 'http://127.0.0.1:3140' || !['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Use npm run test:input against the separate local test database.');
test('input types, bounds, extra fields, malformed JSON and body limits', async () => {
 const db = new pg.Client({ connectionString: url.toString() }); await db.connect();
 const productId = 'input-' + randomUUID();
 try {
  await db.query('INSERT INTO "Product" (id,slug,name,"priceMinor",stock) VALUES ($1,$1,$2,8900,12)', [productId,'Input check lamp']);
  const signed = await fetchWithAuthRetry(`${base}/api/auth/sign-in/email`, { method:'POST', headers:{origin:base,'content-type':'application/json'}, body:JSON.stringify({email:'alex@example.test',password:'Course-only-passphrase-40!'}) });
  assert.equal(signed.status,200); const cookie = signed.headers.getSetCookie().map(value=>value.split(';')[0]).join('; ');
  const valid = { productId, quantity: 2 };
  const send = (body, type='application/json') => fetch(`${base}/api/workshop/orders`, { method:'POST', headers:{cookie,origin:base,'content-type':type}, body });
  for (const quantity of [0,1.5,6,'2']) {
   const response = await send(JSON.stringify({...valid,quantity})); assert.equal(response.status,400); assert.ok((await response.json()).fields.quantity.length);
  }
  for (const injected of [{priceMinor:1},{customerId:'C-2'}]) assert.equal((await send(JSON.stringify({...valid,...injected}))).status,400);
  assert.equal((await send('{')).status,400);
  assert.equal((await send(JSON.stringify({...valid,padding:'x'.repeat(5000)}))).status,413);
  assert.equal((await send(JSON.stringify(valid),'text/plain')).status,415);
  const accepted = await send(JSON.stringify(valid)); assert.equal(accepted.status,201);
  const result = await accepted.json(); assert.equal(result.total,17800);
  assert.ok(result.id); assert.equal((await db.query('SELECT count(*)::int AS count FROM "OrderItem" WHERE "orderId"=$1 AND "productId"=$2',[result.id,productId])).rows[0].count,1);
 } finally {
  await db.query('DELETE FROM "Order" WHERE id IN (SELECT "orderId" FROM "OrderItem" WHERE "productId"=$1)',[productId]);
  await db.query('DELETE FROM "Product" WHERE id=$1',[productId]); await db.end();
 }
});
