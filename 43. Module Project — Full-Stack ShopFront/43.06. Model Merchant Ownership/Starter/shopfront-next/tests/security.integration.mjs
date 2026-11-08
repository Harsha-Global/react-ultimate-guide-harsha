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
    assert.equal((await write(JSON.stringify({note:'forged'}),'https://example.com')).status,403);
    assert.equal((await write('{')).status,400);
    assert.equal((await write(JSON.stringify({note:'x'.repeat(5000)}))).status,413);
    const attack='<img src=x onerror=alert(1)>';
    assert.equal((await write(JSON.stringify({note:attack}))).status,200);
    const response=await fetch(url,{headers:{cookie}});assert.match(response.headers.get('cache-control'),/private.*no-store/);
    assert.equal((await response.json()).note,attack);
    const page=await fetch(`${base}/workshop/orders/O-1001`,{headers:{cookie}});const html=await page.text();
    assert.equal(page.headers.get('x-content-type-options'),'nosniff');assert.match(page.headers.get('content-security-policy'),/frame-ancestors 'none'/);
    assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('<img src=x onerror=alert(1)>'));
  } finally { await write(JSON.stringify({note:original.note})); }
});
