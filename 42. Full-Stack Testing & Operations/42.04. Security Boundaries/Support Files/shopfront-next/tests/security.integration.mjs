import { fetchWithAuthRetry } from './test-auth.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
const base=process.env.BETTER_AUTH_URL;
if(base!=='http://127.0.0.1:3140')throw new Error('Use the isolated test launcher.');
test('origin, bounded JSON, private cache and escaped note boundaries',async()=>{
  const login=await fetchWithAuthRetry(`${base}/api/auth/sign-in/email`,{method:'POST',headers:{origin:base,'content-type':'application/json'},body:JSON.stringify({email:'alex@example.test',password:'Course-only-passphrase-40!'})});
  assert.equal(login.status,200);const cookie=login.headers.getSetCookie().map(value=>value.split(';')[0]).join('; ');
  const url=`${base}/api/workshop/orders/O-1001`;
  const original=await (await fetch(url,{headers:{cookie}})).json();
  async function write(body,origin=base){return fetch(url,{method:'PATCH',headers:{cookie,origin,'content-type':'application/json'},body});}
  try {
    // LIVE: add direct-request boundary assertions.
  } finally { await write(JSON.stringify({note:original.note})); }
});
