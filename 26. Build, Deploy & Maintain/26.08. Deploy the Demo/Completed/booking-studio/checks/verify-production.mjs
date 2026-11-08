import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
const port = 5431;
const base = `http://127.0.0.1:${port}`;
const child = spawn(process.execPath, ['server/production.mjs'], {env: {...process.env,PORT:String(port)}, stdio:['ignore','pipe','pipe']});
let output='';child.stdout.on('data',c=>output+=c);child.stderr.on('data',c=>output+=c);
try {
  let ready=false;
  for(let n=0;n<80;n++) {try {ready=(await fetch(base+'/api/health')).ok;}catch{} if(ready)break;await new Promise(r=>setTimeout(r,75));}
  assert.ok(ready,output);
  const page=await fetch(base+'/');assert.equal(page.status,200);const html=await page.text();assert.match(page.headers.get('content-type'),/text\/html/);
  const script=html.match(/src="([^"]+\.js)"/)[1];const js=await fetch(base+script);assert.equal(js.status,200);assert.match(js.headers.get('content-type'),/javascript/);assert.match(await js.text(),/Course demo/);
  const css=html.match(/href="([^"]+\.css)"/)[1];assert.equal((await fetch(base+css)).status,200);
  assert.equal((await fetch(base+'/fonts/Manrope-variable.woff2')).status,200);
  const missing=await fetch(base+'/assets/missing.js');assert.equal(missing.status,404);assert.doesNotMatch(missing.headers.get('content-type'),/text\/html/);
  const apiMissing=await fetch(base+'/api/not-a-route');assert.equal(apiMissing.status,404);assert.match(apiMissing.headers.get('content-type'),/application\/json/);
  assert.equal((await fetch(base+'/api/reset',{method:'POST'})).status,404);
  assert.equal((await fetch(base+'/unknown-page')).status,404);
  assert.equal((await fetch(base+'/.env.production')).status,404);
  assert.equal((await fetch(base+'/server/production.mjs')).status,404);
  const invalid=await fetch(base+'/api/typed-bookings',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});assert.equal(invalid.status,422);
  const request={kind:'individual',name:'Alex Morgan',email:'alex@example.com',slot:'morning',requestId:randomUUID()};
  const saved=await fetch(base+'/api/typed-bookings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(request)});assert.equal(saved.status,201);const data=await saved.json();assert.equal(data.places,1);
  const direct=await fetch(base+'/?booking='+data.reference);assert.equal(direct.status,200);assert.match(await direct.text(),/<div id="root">/);
  const confirm=await fetch(base+'/api/typed-bookings/'+data.reference);assert.equal(confirm.status,200);assert.equal((await confirm.json()).places,1);
  const gone=await fetch(base+'/api/typed-bookings/'+randomUUID());assert.equal(gone.status,404);
  console.log('PASS: production HTML/JS/CSS/font, public release label, API validation, save, direct confirmation and load, API/file 404s, no development reset/source/env exposure.');
} finally {child.kill('SIGTERM');}
