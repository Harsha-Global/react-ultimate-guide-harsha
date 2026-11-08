import 'dotenv/config';
import test from 'node:test';
import assert from 'node:assert/strict';
import pg from 'pg';
import { fetchWithAuthRetry } from './test-auth.mjs';
const base = process.env.TEST_BASE_URL ?? 'http://127.0.0.1:3140';
const url = new URL(process.env.TEST_DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Use the isolated local test database.');
const pool = new pg.Pool({ connectionString: url.href });
async function login(email) {
  const response = await fetchWithAuthRetry(`${base}/api/auth/sign-in/email`, {method:'POST',headers:{origin:base,'content-type':'application/json'},body:JSON.stringify({email,password:'Course-only-passphrase-40!'})});
  assert.equal(response.status,200);
  return response.headers.getSetCookie().map(value=>value.split(';')[0]).join('; ');
}
test('stock writes require the workspace role, valid input and the reviewed current value',async()=>{
  const alex=await login('alex@example.test'),bob=await login('bob@example.test');
  const original=(await pool.query('SELECT stock FROM "Product" WHERE id=$1',['P-101'])).rows[0].stock;
  const user=(await pool.query('SELECT id FROM "user" WHERE email=$1',['alex@example.test'])).rows[0].id;
  const role=(await pool.query('SELECT role FROM "Membership" WHERE "workspaceId"=$1 AND "userId"=$2',['W-1',user])).rows[0].role;
  const saved=original+1;
  async function patch(cookie,workspaceId,productId,body,origin=base){return fetch(`${base}/api/merchant/${workspaceId}/products/${productId}`,{method:'PATCH',headers:{cookie,origin,'content-type':'application/json'},body:JSON.stringify(body)});}
  async function stock(){return (await pool.query('SELECT stock FROM "Product" WHERE id=$1',['P-101'])).rows[0].stock;}
  try {
    // Write the narrated requests and saved-result assertions here.
  } finally {
    await pool.query('UPDATE "Product" SET stock=$1 WHERE id=$2',[original,'P-101']);
    await pool.query('UPDATE "Membership" SET role=$1 WHERE "workspaceId"=$2 AND "userId"=$3',[role,'W-1',user]);
    await pool.end();
  }
});
