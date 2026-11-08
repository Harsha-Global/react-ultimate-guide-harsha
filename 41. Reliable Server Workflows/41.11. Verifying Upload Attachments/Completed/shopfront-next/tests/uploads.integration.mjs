import { fetchWithAuthRetry } from './test-auth.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import pg from 'pg';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
const base = process.env.BETTER_AUTH_URL;
if (base !== 'http://127.0.0.1:3140') throw new Error('Use the isolated test launcher.');
async function login(email) {
  const response=await fetchWithAuthRetry(`${base}/api/auth/sign-in/email`,{method:'POST',headers:{origin:base,'content-type':'application/json'},body:JSON.stringify({email,password:'Course-only-passphrase-40!'})});
  assert.equal(response.status,200);return response.headers.getSetCookie().map(value=>value.split(';')[0]).join('; ');
}
async function post(path,cookie,body) {
  const response=await fetch(`${base}${path}`,{method:'POST',headers:{cookie,origin:base,'content-type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
  return {status:response.status,body:await response.json()};
}
test('private upload ownership, size, image bytes and idempotent attachment',async()=>{
  const alex=await login('alex@example.test');const bob=await login('bob@example.test');
  const path='/api/workshop/orders/O-1001/uploads';
  const created=[];
  try {
  const image=await sharp({create:{width:2,height:2,channels:3,background:'#2549ad'}}).png().toBuffer();
  const data={contentType:'image/png',size:image.length};
  assert.equal((await post(path,'',data)).status,401);
  assert.equal((await post(path,bob,data)).status,404);
  assert.equal((await post(path,alex,{...data,size:512001})).status,400);
  assert.equal((await post(path,alex,{...data,contentType:'image/svg+xml'})).status,400);
  const ticket=await post(path,alex,data);assert.equal(ticket.status,200);created.push(ticket.body.id);
  assert.equal((await fetch(ticket.body.url,{method:'PUT',headers:{'content-type':'image/png'},body:image})).status,200);
  assert.equal((await post(`${path}/${ticket.body.id}`,bob)).status,404);
  const simultaneous = await Promise.all([post(`${path}/${ticket.body.id}`,alex), post(`${path}/${ticket.body.id}`,alex)]);
  assert.deepEqual(simultaneous.map(value=>value.status),[200,200]);
  assert.equal((await post(`${path}/${ticket.body.id}`,alex)).status,200);
  const saved=await fetch(`${base}${path}/${ticket.body.id}/image`,{headers:{cookie:alex}});assert.equal(saved.status,200);assert.equal(saved.headers.get('content-type'),'image/png');
  assert.match(saved.headers.get('cache-control'),/private/);assert.match(saved.headers.get('cache-control'),/no-store/);assert.equal(saved.headers.get('x-content-type-options'),'nosniff');
  assert.equal((await fetch(`${base}${path}/${ticket.body.id}/image`)).status,401);
  assert.equal((await fetch(`${base}${path}/${ticket.body.id}/image`,{headers:{cookie:bob}})).status,404);
  const bad=Buffer.from('This is not a PNG image.');const forged=await post(path,alex,{contentType:'image/png',size:bad.length});
  created.push(forged.body.id);
  assert.equal((await fetch(forged.body.url,{method:'PUT',headers:{'content-type':'image/png'},body:bad})).status,200);
  assert.equal((await post(`${path}/${forged.body.id}`,alex)).status,400);
  const mismatch=await post(path,alex,data);assert.equal(mismatch.status,200);created.push(mismatch.body.id);
  assert.equal((await fetch(mismatch.body.url,{method:'PUT',headers:{'content-type':'image/png'},body:image})).status,200);
  const dbCheck=new pg.Client({connectionString:process.env.DATABASE_URL});await dbCheck.connect();
  try{
    await dbCheck.query('UPDATE "Attachment" SET "expectedSize"="expectedSize"+1 WHERE id=$1',[mismatch.body.id]);
    assert.equal((await post(`${path}/${mismatch.body.id}`,alex)).status,400);
    assert.equal((await dbCheck.query('SELECT status FROM "Attachment" WHERE id=$1',[mismatch.body.id])).rows[0].status,'pending');
    const attached=(await dbCheck.query('SELECT status,"objectKey" FROM "Attachment" WHERE id=$1',[ticket.body.id])).rows;
    assert.equal(attached.length,1);assert.equal(attached[0].status,'attached');assert.ok(attached[0].objectKey.startsWith(`verified/${ticket.body.id}/`));
  }finally{await dbCheck.end();}
  } finally {
    const url=new URL(process.env.DATABASE_URL);const endpoint=new URL(process.env.S3_ENDPOINT);
    if(url.pathname!=='/shopfront_test'||!['localhost','127.0.0.1'].includes(endpoint.hostname))throw new Error('Cleanup is restricted to local test fixtures.');
    const database=new pg.Client({connectionString:url.toString()});await database.connect();
    const storage=new S3Client({endpoint:endpoint.href,region:'us-east-1',forcePathStyle:true,credentials:{accessKeyId:process.env.S3_ACCESS_KEY,secretAccessKey:process.env.S3_SECRET_KEY}});
    try {const rows=await database.query('SELECT "temporaryKey","objectKey" FROM "Attachment" WHERE id=ANY($1)',[created]);
      for(const row of rows.rows)for(const key of [row.temporaryKey,row.objectKey].filter(Boolean))await storage.send(new DeleteObjectCommand({Bucket:process.env.S3_BUCKET,Key:key}));
      await database.query('DELETE FROM "Attachment" WHERE id=ANY($1)',[created]);
    }finally{storage.destroy();await database.end();}
  }
});
