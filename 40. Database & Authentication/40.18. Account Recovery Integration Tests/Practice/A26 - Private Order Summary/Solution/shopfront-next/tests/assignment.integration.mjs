import { fetchWithAuthRetry } from './test-auth.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import pg from 'pg';
import { randomUUID } from 'node:crypto';
const base=process.env.BETTER_AUTH_URL;
const url=new URL(process.env.DATABASE_URL ?? '');
if (base !== 'http://127.0.0.1:3140' || !['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Use npm run test:assignment with the separate local test database.');
async function signIn(email) {
  const response=await fetchWithAuthRetry(base+'/api/auth/sign-in/email',{method:'POST',headers:{origin:base,'Content-Type':'application/json'},body:JSON.stringify({email,password:'Course-only-passphrase-40!'})});
  assert.equal(response.status,200);
  return response.headers.getSetCookie().map(value=>value.split(';')[0]).join('; ');
}
const read=(id,cookie='')=>fetch(base+'/api/workshop/orders/'+id+'/summary',{headers:{cookie}});
test('the independent summary enforces ownership and returns saved totals only',async()=>{
  const fixtureId='O-A26-'+randomUUID();
  const setup=new pg.Client({connectionString:url.toString()});await setup.connect();
  try {
    await setup.query('INSERT INTO "Order" (id,"customerId",status,note,"createdAt") VALUES ($1,$2,$3,$4,NOW())',[fixtureId,'C-1','pending','']);
    await setup.query('INSERT INTO "OrderItem" ("orderId","productId",quantity,"unitPriceMinor") VALUES ($1,$2,1,8900),($1,$3,2,2800)',[fixtureId,'P-101','P-103']);
  const alex=await signIn('alex@example.test');const bob=await signIn('bob@example.test');
  assert.equal((await read(fixtureId)).status,401);
  assert.equal((await read(fixtureId,bob)).status,404);
  assert.equal((await read('missing',alex)).status,404);
  const result=await read(fixtureId,alex);assert.equal(result.status,200);
  assert.match(result.headers.get('cache-control'),/private/);assert.match(result.headers.get('cache-control'),/no-store/);
  assert.deepEqual(await result.json(),{id:fixtureId,status:'pending',lineCount:2,unitCount:3,totalMinor:14500});
  const ownBob=await read('O-2001',bob);assert.equal(ownBob.status,200);assert.equal((await ownBob.json()).id,'O-2001');
  const client=new pg.Client({connectionString:url.toString()});await client.connect();
  const original=(await client.query('SELECT "priceMinor" FROM "Product" WHERE id=$1',['P-101'])).rows[0].priceMinor;
  try {
    await client.query('UPDATE "Product" SET "priceMinor"=$1 WHERE id=$2',[99999,'P-101']);
    assert.equal((await (await read(fixtureId,alex)).json()).totalMinor,14500);
  } finally {await client.query('UPDATE "Product" SET "priceMinor"=$1 WHERE id=$2',[original,'P-101']);await client.end();}
  await fetch(base+'/api/auth/sign-out',{method:'POST',headers:{cookie:alex,origin:base,'Content-Type':'application/json'},body:'{}'});
  assert.equal((await read(fixtureId,alex)).status,401);
  } finally {await setup.query('DELETE FROM "OrderItem" WHERE "orderId"=$1',[fixtureId]);await setup.query('DELETE FROM "Order" WHERE id=$1',[fixtureId]);await setup.end();}
});
