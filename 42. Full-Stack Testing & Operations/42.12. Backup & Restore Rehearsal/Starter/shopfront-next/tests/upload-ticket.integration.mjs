import { fetchWithAuthRetry } from './test-auth.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import pg from 'pg';
import {S3Client,DeleteObjectCommand} from '@aws-sdk/client-s3';
const base=process.env.BETTER_AUTH_URL,url=new URL(process.env.DATABASE_URL??''),endpoint=new URL(process.env.S3_ENDPOINT??'');
if(base!=='http://127.0.0.1:3140'||url.pathname!=='/shopfront_test'||!['localhost','127.0.0.1'].includes(url.hostname)||!['localhost','127.0.0.1'].includes(endpoint.hostname))throw new Error('Use isolated local database and storage.');
async function login(email){const r=await fetchWithAuthRetry(`${base}/api/auth/sign-in/email`,{method:'POST',headers:{origin:base,'content-type':'application/json'},body:JSON.stringify({email,password:'Course-only-passphrase-40!'})});assert.equal(r.status,200);return r.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');}
test('signed tickets enforce ownership, input bounds and their actual sixty-second expiry',async()=>{
 const db=new pg.Client({connectionString:url.href});await db.connect();const created=[];
 const storage=new S3Client({endpoint:endpoint.href,region:'us-east-1',forcePathStyle:true,credentials:{accessKeyId:process.env.S3_ACCESS_KEY,secretAccessKey:process.env.S3_SECRET_KEY}});
 try{
  const alex=await login('alex@example.test'),bob=await login('bob@example.test');
  const bytes=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a9WQAAAAASUVORK5CYII=','base64');
  const data={contentType:'image/png',size:bytes.length};
  const ticket=(cookie,body=data)=>fetch(`${base}/api/workshop/orders/O-1001/uploads`,{method:'POST',headers:{cookie,origin:base,'content-type':'application/json'},body:JSON.stringify(body)});
  assert.equal((await ticket('')).status,401);assert.equal((await ticket(bob)).status,404);
  assert.equal((await ticket(alex,{...data,size:512001})).status,400);assert.equal((await ticket(alex,{...data,contentType:'image/svg+xml'})).status,400);
  const response=await ticket(alex);assert.equal(response.status,200);const first=await response.json();created.push(first.id);
  assert.equal((await fetch(first.url,{method:'PUT',headers:{'content-type':'image/png'},body:bytes})).status,200);
  assert.equal((await db.query('SELECT status FROM "Attachment" WHERE id=$1',[first.id])).rows[0].status,'pending');
  const expiration=await ticket(alex);assert.equal(expiration.status,200);const expired=await expiration.json();created.push(expired.id);
  await new Promise(resolve=>setTimeout(resolve,65000));
  const denied=await fetch(expired.url,{method:'PUT',headers:{'content-type':'image/png'},body:bytes});assert.equal(denied.status,403);
 }finally{
  const rows=(await db.query('SELECT "temporaryKey" FROM "Attachment" WHERE id=ANY($1)',[created])).rows;
  for(const row of rows)await storage.send(new DeleteObjectCommand({Bucket:process.env.S3_BUCKET,Key:row.temporaryKey}));
  await db.query('DELETE FROM "Attachment" WHERE id=ANY($1)',[created]);storage.destroy();await db.end();
 }
});
