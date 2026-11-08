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
