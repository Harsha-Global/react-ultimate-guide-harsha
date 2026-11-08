import test from 'node:test';
import assert from 'node:assert/strict';
import pg from 'pg';
const base=process.env.BETTER_AUTH_URL;
const databaseUrl=new URL(process.env.DATABASE_URL??'');
if(base!=='http://127.0.0.1:3140'||!['localhost','127.0.0.1'].includes(databaseUrl.hostname)||databaseUrl.pathname!=='/shopfront_test')throw new Error('Use the guarded local test launcher.');
async function request(path,body,cookie='') {
 for(let attempt=0;attempt<4;attempt++) {
  const response=await fetch(`${base}${path}`,{method:'POST',redirect:'manual',headers:{origin:base,'Content-Type':'application/json',cookie},body:JSON.stringify(body)});
  if(response.status!==429)return response;
  const seconds=Math.max(1,Math.min(12,Number(response.headers.get('retry-after'))||10));
  await response.body?.cancel();await new Promise(resolve=>setTimeout(resolve,(seconds+1)*1000));
 }
 throw new Error('The local authentication rate limit did not clear.');
}
const cookie=response=>response.headers.getSetCookie().map(value=>value.split(';')[0]).join('; ');
async function mailLink(email,subject,previous=''){
 for(let attempt=0;attempt<50;attempt++){
  const html=await(await fetch('http://127.0.0.1:3041')).text();
  const article=html.split('<article>').find(part=>part.includes(email)&&part.includes(subject));
  const raw=article?.match(/href="([^"]+)"/)?.[1];
  const link=raw?.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
  if(link&&link!==previous){assert.equal(new URL(link).origin,base);return link;}
  await new Promise(resolve=>setTimeout(resolve,100));
 }
 throw new Error('The expected local test message did not arrive.');
}
test('verification, reset, token reuse, session revocation and expiry',async()=>{
 const email=`recovery-${Date.now()}@example.test`;const password='Initial-course-only-password!';
 const db=new pg.Client({connectionString:databaseUrl.toString()});await db.connect();
 try{
  assert.equal((await request('/api/auth/sign-up/email',{email,password,name:'Recovery Check',callbackURL:'/workshop/account'})).status,200);
  assert.equal((await request('/api/auth/sign-in/email',{email,password})).status,403);
  const verification=await mailLink(email,'Verify your ShopFront email');
  const verified=await fetch(verification,{redirect:'manual'});assert.equal(verified.status,302);
  const signedIn=await request('/api/auth/sign-in/email',{email,password});assert.equal(signedIn.status,200);const originalCookie=cookie(signedIn);
  assert.equal((await request('/api/auth/request-password-reset',{email,redirectTo:'/workshop/recovery'})).status,200);
  const firstLink=await mailLink(email,'Reset your ShopFront password');
  const resetPage=await fetch(firstLink,{redirect:'manual'});assert.equal(resetPage.status,302);
  const token=new URL(resetPage.headers.get('location'),base).searchParams.get('token');assert.ok(token);
  const newPassword='Replacement-course-only-password!';
  assert.equal((await request('/api/auth/reset-password',{token,newPassword})).status,200);
  assert.equal((await request('/api/auth/sign-in/email',{email,password})).status,401);
  assert.equal((await request('/api/auth/sign-in/email',{email,password:newPassword})).status,200);
  const oldSession=await fetch(`${base}/api/auth/get-session`,{headers:{cookie:originalCookie}});assert.equal(await oldSession.json(),null);
  assert.equal((await request('/api/auth/reset-password',{token,newPassword})).status,400);
  assert.equal((await request('/api/auth/request-password-reset',{email,redirectTo:'/workshop/recovery'})).status,200);
  const expiredLink=await mailLink(email,'Reset your ShopFront password',firstLink);
  const user=(await db.query('SELECT id FROM "user" WHERE email=$1',[email])).rows[0];
  const expiredRows=await db.query('UPDATE verification SET "expiresAt"=$1 WHERE value=$2',[new Date(0),user.id]);assert.ok(expiredRows.rowCount>0);
  const expired=await fetch(expiredLink,{redirect:'manual'});assert.equal(expired.status,302);assert.ok(expired.headers.get('location').includes('error='));
 }finally{await db.query('DELETE FROM verification WHERE value IN (SELECT id FROM "user" WHERE email=$1)',[email]);await db.query('DELETE FROM "user" WHERE email=$1',[email]);await db.end();}
});
