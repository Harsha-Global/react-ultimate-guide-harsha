import test from 'node:test';
import assert from 'node:assert/strict';
const base=process.env.BETTER_AUTH_URL;
if(base!=='http://127.0.0.1:3140')throw new Error('Use npm run test:setup.');
test('isolated server can reach its database',async()=>{
 const response=await fetch(`${base}/api/workshop/health`);
 assert.equal(response.status,200);
 assert.deepEqual(await response.json(),{database:'ready'});
});
