import 'dotenv/config';
import test from 'node:test';
import assert from 'node:assert/strict';
import pg from 'pg';
import { fetchWithAuthRetry } from './test-auth.mjs';
const base = process.env.TEST_BASE_URL ?? 'http://127.0.0.1:3140';
const pool = new pg.Pool({ connectionString: process.env.TEST_DATABASE_URL });
async function login(email) {
  const result = await fetchWithAuthRetry(`${base}/api/auth/sign-in/email`, { method:'POST', headers:{ origin:base,'content-type':'application/json' },body:JSON.stringify({ email,password:'Course-only-passphrase-40!' }) });
  assert.equal(result.status,200); return result.headers.getSetCookie().map(value=>value.split(';')[0]).join('; ');
}
test('customer ownership, merchant membership, viewer role, stock conflict and filter isolation',async()=>{
  const alex=await login('alex@example.test');const bob=await login('bob@example.test');
  const original=(await pool.query('SELECT stock FROM "Product" WHERE id=$1',['P-101'])).rows[0].stock;
  const user=(await pool.query('SELECT id FROM "user" WHERE email=$1',['alex@example.test'])).rows[0].id;
  async function patch(cookie,workspaceId,productId,body,origin=base){return fetch(`${base}/api/merchant/${workspaceId}/products/${productId}`,{method:'PATCH',headers:{cookie,origin,'content-type':'application/json'},body:JSON.stringify(body)});}
  try{
    assert.equal((await fetch(`${base}/api/workshop/orders/O-1001`,{headers:{cookie:bob}})).status,404);
    assert.equal((await fetch(`${base}/api/workshop/orders/O-1001`,{headers:{cookie:alex}})).status,200);
    const denied=await fetch(`${base}/merchant/W-1?status=ready`,{headers:{cookie:bob}});const deniedText=await denied.text();
    assert.ok(deniedText.includes('Workspace not found.'));assert.ok(!deniedText.includes('Studio Desk Lamp'));
    assert.equal((await patch(bob,'W-1','P-101',{expectedStock:original,stock:21})).status,409);
    assert.equal((await patch(alex,'W-1','P-103',{expectedStock:3,stock:21})).status,409);
    assert.equal((await patch(alex,'W-1','P-101',{expectedStock:original,stock:21},'https://wrong.invalid')).status,403);
    assert.equal((await patch(alex,'W-1','P-101',{expectedStock:original,stock:-1})).status,400);
    await pool.query('UPDATE "Membership" SET role=$1 WHERE "workspaceId"=$2 AND "userId"=$3',['viewer','W-1',user]);
    assert.equal((await patch(alex,'W-1','P-101',{expectedStock:original,stock:21})).status,409);
    await pool.query('UPDATE "Membership" SET role=$1 WHERE "workspaceId"=$2 AND "userId"=$3',['owner','W-1',user]);
    assert.equal((await patch(alex,'W-1','P-101',{expectedStock:original,stock:21})).status,200);
    assert.equal((await patch(alex,'W-1','P-101',{expectedStock:original,stock:22})).status,409);
    const html=await (await fetch(`${base}/merchant/W-1?status=awaiting`,{headers:{cookie:alex}})).text();
    assert.ok(html.includes('Studio Desk Lamp'));assert.ok(!html.includes('Terracotta Travel Mug'));assert.ok(!html.includes('O-2001'));
    async function dispatch(cookie,workspaceId,orderId,origin=base){return fetch(`${base}/api/merchant/${workspaceId}/orders/${orderId}/dispatch`,{method:'POST',headers:{cookie,origin}});}
    assert.equal((await dispatch('', 'W-1','O-1001')).status,401);
    assert.equal((await dispatch(alex,'W-1','O-1001')).status,409);
    await pool.query('UPDATE "Order" SET status=$1 WHERE id=$2',['paid','O-1001']);
    await pool.query('INSERT INTO "Fulfillment" ("orderId","workspaceId",status,"createdAt") VALUES ($1,$2,$3,now())',['O-1001','W-1','ready']);
    assert.equal((await dispatch(bob,'W-1','O-1001')).status,409);
    assert.equal((await dispatch(alex,'W-2','O-1001')).status,409);
    assert.equal((await dispatch(alex,'W-1','O-1001','https://wrong.invalid')).status,403);
    await pool.query('UPDATE "Membership" SET role=$1 WHERE "workspaceId"=$2 AND "userId"=$3',['viewer','W-1',user]);
    assert.equal((await dispatch(alex,'W-1','O-1001')).status,409);
    await pool.query('UPDATE "Membership" SET role=$1 WHERE "workspaceId"=$2 AND "userId"=$3',['owner','W-1',user]);
    assert.equal((await dispatch(alex,'W-1','O-1001')).status,200);
    assert.equal((await dispatch(alex,'W-1','O-1001')).status,200);
    const row=(await pool.query('SELECT status FROM "Fulfillment" WHERE "orderId"=$1 AND "workspaceId"=$2',['O-1001','W-1'])).rows;
    assert.deepEqual(row,[{status:'dispatched'}]);
    const dispatched=await (await fetch(`${base}/merchant/W-1?status=dispatched`,{headers:{cookie:alex}})).text();
    assert.ok(dispatched.includes('O-1001'));assert.ok(!dispatched.includes('Terracotta Travel Mug'));
    const ready=await (await fetch(`${base}/merchant/W-1?status=ready`,{headers:{cookie:alex}})).text();
    assert.ok(ready.includes('No orders in this view.'));
  }finally{
    await pool.query('DELETE FROM "Fulfillment" WHERE "orderId"=$1',['O-1001']);
    await pool.query('UPDATE "Order" SET status=$1 WHERE id=$2',['pending','O-1001']);
    await pool.query('UPDATE "Product" SET stock=$1 WHERE id=$2',[original,'P-101']);
    await pool.query('UPDATE "Membership" SET role=$1 WHERE "workspaceId"=$2 AND "userId"=$3',['owner','W-1',user]);
    await pool.end();
  }
});
