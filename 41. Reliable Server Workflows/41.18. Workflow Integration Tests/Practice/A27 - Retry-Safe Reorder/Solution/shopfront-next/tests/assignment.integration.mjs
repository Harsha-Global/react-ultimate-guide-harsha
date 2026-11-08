import test from 'node:test';
import { fetchWithAuthRetry } from './test-auth.mjs';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import pg from 'pg';
const base=process.env.BETTER_AUTH_URL;const url=new URL(process.env.DATABASE_URL??'');
if(base!=='http://127.0.0.1:3140'||!['localhost','127.0.0.1'].includes(url.hostname)||url.pathname!=='/shopfront_test')throw new Error('Use the isolated assignment launcher.');
async function login(email){const r=await fetchWithAuthRetry(base+'/api/auth/sign-in/email',{method:'POST',headers:{origin:base,'Content-Type':'application/json'},body:JSON.stringify({email,password:'Course-only-passphrase-40!'})});assert.equal(r.status,200);return r.headers.getSetCookie().map(x=>x.split(';')[0]).join('; ');}
test('reorder requires ownership and a saved line, derives current prices and replays one reservation',async()=>{
 const db=new pg.Client({connectionString:url.toString()});await db.connect();
 const product='A27-'+randomUUID(), original='A27-'+randomUUID();const keys=[randomUUID(),randomUUID(),randomUUID()];
 async function send(cookie,body,orderId=original){const r=await fetch(`${base}/api/workshop/orders/${orderId}/reorder`,{method:'POST',headers:{cookie,origin:base,'Content-Type':'application/json'},body:JSON.stringify(body)});return {status:r.status,cache:r.headers.get('cache-control'),body:await r.json()};}
 try{
  await db.query('INSERT INTO "Product" (id,slug,name,"priceMinor",stock) VALUES ($1,$1,$2,150,3)',[product,'Assignment27 fixture']);
  await db.query('INSERT INTO "Order" (id,"customerId") VALUES ($1,$2)',[original,'C-1']);
  await db.query('INSERT INTO "OrderItem" ("orderId","productId",quantity,"unitPriceMinor") VALUES ($1,$2,1,100)',[original,product]);
  const alex=await login('alex@example.test'),bob=await login('bob@example.test');const input={requestKey:keys[0],productId:product,quantity:2};
  assert.equal((await send('',input)).status,401);assert.equal((await send(bob,input)).status,404);
  assert.equal((await send(alex,input,'missing')).status,404);
  assert.equal((await send(alex,{...input,productId:'P-103'})).status,400);
  assert.equal((await send(alex,{...input,priceMinor:1})).status,400);
  assert.equal((await send(alex,{...input,quantity:0})).status,400);
  const repeated=await Promise.all([send(alex,input),send(alex,input)]);
  assert.deepEqual(repeated.map(x=>x.status),[201,201]);assert.equal(repeated[0].body.id,repeated[1].body.id);
  assert.equal(repeated[0].body.total,300);assert.match(repeated[0].cache,/private.*no-store/);
  assert.equal((await db.query('SELECT stock FROM "Product" WHERE id=$1',[product])).rows[0].stock,1);
  const retry=await send(alex,input);assert.equal(retry.body.id,repeated[0].body.id);
  assert.equal((await send(alex,{...input,quantity:1})).status,409);
  assert.equal((await send(alex,{...input,requestKey:keys[1],quantity:1})).status,201);
  assert.equal((await send(alex,{...input,requestKey:keys[2],quantity:1})).status,409);
  assert.equal((await db.query('SELECT count(*)::int AS count FROM "Order" WHERE "requestKey"=ANY($1)',[keys])).rows[0].count,2);
  assert.equal((await db.query('SELECT stock FROM "Product" WHERE id=$1',[product])).rows[0].stock,0);
  assert.equal((await db.query('SELECT "unitPriceMinor" FROM "OrderItem" WHERE "orderId"=$1',[original])).rows[0].unitPriceMinor,100);
  await fetch(base+'/api/auth/sign-out',{method:'POST',headers:{cookie:alex,origin:base,'Content-Type':'application/json'},body:'{}'});
  assert.equal((await send(alex,input)).status,401);
 }finally{
  try{await db.query('DELETE FROM "OrderItem" WHERE "orderId"=$1 OR "orderId" IN (SELECT id FROM "Order" WHERE "requestKey"=ANY($2))',[original,keys]);await db.query('DELETE FROM "Order" WHERE id=$1 OR "requestKey"=ANY($2)',[original,keys]);await db.query('DELETE FROM "Product" WHERE id=$1',[product]);}finally{await db.end();}
 }
});
