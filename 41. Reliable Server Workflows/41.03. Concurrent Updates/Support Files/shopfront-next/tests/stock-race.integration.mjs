import { fetchWithAuthRetry } from './test-auth.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import pg from 'pg';
const base=process.env.BETTER_AUTH_URL, url=new URL(process.env.DATABASE_URL??'');
if(base!=='http://127.0.0.1:3140'||!['localhost','127.0.0.1'].includes(url.hostname)||url.pathname!=='/shopfront_test')throw new Error('Use the isolated stock-test launcher.');
test('two simultaneous requests compete for three units without overselling',async()=>{
 const db=new pg.Client({connectionString:url.toString()});await db.connect();const productId='race-'+randomUUID();
 try{
  await db.query('INSERT INTO "Product" (id,slug,name,"priceMinor",stock) VALUES ($1,$1,$2,100,3)',[productId,'Temporary race product']);
  const signIn=await fetchWithAuthRetry(`${base}/api/auth/sign-in/email`,{method:'POST',headers:{origin:base,'content-type':'application/json'},body:JSON.stringify({email:'alex@example.test',password:'Course-only-passphrase-40!'})});assert.equal(signIn.status,200);
  const cookie=signIn.headers.getSetCookie().map(value=>value.split(';')[0]).join('; ');
  const order=()=>fetch(`${base}/api/workshop/orders`,{method:'POST',headers:{cookie,origin:base,'content-type':'application/json'},body:JSON.stringify({productId,quantity:2})});
  const responses=await Promise.all([order(),order()]);assert.deepEqual(responses.map(r=>r.status).sort(),[201,409]);
  assert.equal((await db.query('SELECT stock FROM "Product" WHERE id=$1',[productId])).rows[0].stock,1);
  const rows=(await db.query('SELECT i.quantity,i."unitPriceMinor",o.id FROM "OrderItem" i JOIN "Order" o ON o.id=i."orderId" WHERE i."productId"=$1',[productId])).rows;
  assert.equal(rows.length,1);assert.equal(rows[0].quantity,2);assert.equal(rows[0].unitPriceMinor,100);
 }finally{await db.query('DELETE FROM "Order" WHERE id IN (SELECT "orderId" FROM "OrderItem" WHERE "productId"=$1)',[productId]);await db.query('DELETE FROM "Product" WHERE id=$1',[productId]);await db.end();}
});
