import 'dotenv/config';
import test from 'node:test';
import assert from 'node:assert/strict';
import pg from 'pg';
import { fetchWithAuthRetry } from './test-auth.mjs';
const base=process.env.TEST_BASE_URL??'http://127.0.0.1:3140';
const pool=new pg.Pool({connectionString:process.env.TEST_DATABASE_URL});
async function login(email){const r=await fetchWithAuthRetry(`${base}/api/auth/sign-in/email`,{method:'POST',headers:{origin:base,'content-type':'application/json'},body:JSON.stringify({email,password:'Course-only-passphrase-40!'})});assert.equal(r.status,200);return r.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');}
test('merchant notes validate input, enforce both scopes, retain revisions and stay private',async()=>{
 const alex=await login('alex@example.test'),bob=await login('bob@example.test');
 const orderId='A10-CHECK';
 await pool.query('INSERT INTO "Order" (id,"customerId") VALUES ($1,$2)',[orderId,'C-1']);
 await pool.query('INSERT INTO "OrderItem" ("orderId","productId",quantity,"unitPriceMinor") VALUES ($1,$2,1,8900)',[orderId,'P-101']);
 async function save(cookie,workspaceId,body,revision){return fetch(`${base}/api/merchant/${workspaceId}/orders/${orderId}/note`,{method:'PATCH',headers:{cookie,origin:base,'content-type':'application/json'},body:JSON.stringify({body,revision})});}
 try{
  assert.equal((await save(alex,'W-1',' ',0)).status,400);
  assert.equal((await save(alex,'W-1','x'.repeat(241),0)).status,400);
  assert.equal((await save(bob,'W-1','Wrong member',0)).status,404);
  assert.equal((await save(bob,'W-2','Wrong order',0)).status,404);
  assert.equal((await save(alex,'W-1','  Pack carefully  ',0)).status,200);
  assert.equal((await save(alex,'W-1','Stale create',0)).status,409);
  assert.equal((await save(alex,'W-1','Updated note',1)).status,200);
  assert.equal((await save(alex,'W-1','Stale update',1)).status,409);
  const row=(await pool.query('SELECT body,revision FROM "MerchantOrderNote" WHERE "orderId"=$1',[orderId])).rows[0];
  assert.deepEqual(row,{body:'Updated note',revision:2});
  assert.equal((await save(alex,'W-1',' ',2)).status,400);
  assert.equal((await save(alex,'W-1','x'.repeat(241),2)).status,400);
  assert.deepEqual((await pool.query('SELECT body,revision FROM "MerchantOrderNote" WHERE "orderId"=$1 AND "workspaceId"=$2',[orderId,'W-1'])).rows,[row]);
  await pool.query('INSERT INTO "OrderItem" ("orderId","productId",quantity,"unitPriceMinor") VALUES ($1,$2,1,2800)',[orderId,'P-103']);
  assert.equal((await save(bob,'W-2','Travel private note',0)).status,200);
  const concurrent=await Promise.all([save(alex,'W-1','First competing edit',2),save(alex,'W-1','Second competing edit',2)]);
  assert.deepEqual(concurrent.map(r=>r.status).sort(),[200,409]);
  const notes=(await pool.query('SELECT "workspaceId",body,revision FROM "MerchantOrderNote" WHERE "orderId"=$1 ORDER BY "workspaceId"',[orderId])).rows;
  assert.equal(notes.length,2);assert.equal(notes[0].revision,3);
  assert.ok(['First competing edit','Second competing edit'].includes(notes[0].body));
  assert.deepEqual(notes[1],{workspaceId:'W-2',body:'Travel private note',revision:1});
  const customerResponse=await fetch(`${base}/api/workshop/orders/${orderId}`,{headers:{cookie:alex}});assert.equal(customerResponse.status,200);
  const customer=await customerResponse.json();for(const note of notes)assert.ok(!JSON.stringify(customer).includes(note.body));
  assert.ok(!JSON.stringify(customer).includes('merchantNotes'));
  console.log('Validated both private workspace notes, unchanged data after rejection, one concurrent winner and customer projection.');
 }finally{await pool.query('DELETE FROM "Order" WHERE id=$1',[orderId]);await pool.end();}
});
