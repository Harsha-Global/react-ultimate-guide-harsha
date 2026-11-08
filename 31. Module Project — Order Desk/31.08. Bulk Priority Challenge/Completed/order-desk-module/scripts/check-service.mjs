import assert from 'node:assert/strict';
const base='http://127.0.0.1:5189/api';
const results=[];
async function request(path,{cookie,method='GET',body}={}){
 const response=await fetch(base+path,{method,headers:{...(cookie?{Cookie:cookie}:{}),...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});
 return {status:response.status,data:await response.json(),cookie:response.headers.get('set-cookie')?.split(';')[0]};
}
async function session(role){const r=await request('/session',{method:'POST',body:{workspace:'north',role}});assert.equal(r.status,200);assert.equal(r.data.role,role);return r.cookie;}
async function check(name,fn){await fn();results.push({name,passed:true});}
await check('health responds',async()=>assert.equal((await request('/health')).data.status,'ok'));
await check('private read requires a session',async()=>assert.equal((await request('/orders/OD-1041')).status,401));
await check('unknown demo role is rejected',async()=>assert.equal((await request('/session',{method:'POST',body:{workspace:'north',role:'owner'}})).status,422));
const viewer=await session('viewer');
await check('viewer may inspect but cannot bypass fulfillment permission',async()=>{
 const before=await request('/orders/OD-1041',{cookie:viewer});assert.equal(before.status,200);
 const denied=await request('/orders/OD-1041',{cookie:viewer,method:'PATCH',body:{status:'shipped',version:before.data.version,role:'operator'}});assert.equal(denied.status,403);
 const after=await request('/orders/OD-1041',{cookie:viewer});assert.deepEqual(after.data,before.data);
});
const operator=await session('operator');
await check('operator receives a version conflict',async()=>assert.equal((await request('/orders/OD-1041',{cookie:operator,method:'PATCH',body:{status:'shipped',version:0}})).status,409));
await check('operator still cannot fulfill an unpaid order',async()=>{
 const before=await request('/orders/OD-1042',{cookie:operator});const response=await request('/orders/OD-1042',{cookie:operator,method:'PATCH',body:{status:'shipped',version:before.data.version}});assert.equal(response.status,422);assert.equal(response.data.fields.status,'This order is waiting for payment.');
});
await check('operator writes and then restores a sample status using returned versions',async()=>{
 const before=await request('/orders/OD-1045',{cookie:operator});const change=before.data.status==='ready'?'shipped':'ready';
 const accepted=await request('/orders/OD-1045',{cookie:operator,method:'PATCH',body:{status:change,version:before.data.version}});assert.equal(accepted.status,200);assert.equal(accepted.data.version,before.data.version+1);
 const restored=await request('/orders/OD-1045',{cookie:operator,method:'PATCH',body:{status:before.data.status,version:accepted.data.version}});assert.equal(restored.status,200);assert.equal(restored.data.status,before.data.status);
});
await check('revoking a session during the write delay prevents the write',async()=>{
 const temp=await session('operator');const before=await request('/orders/OD-1043',{cookie:temp});
 const pending=request('/orders/OD-1043',{cookie:temp,method:'PATCH',body:{status:'shipped',version:before.data.version}});
 await new Promise(resolve=>setTimeout(resolve,550));await request('/session',{cookie:temp,method:'DELETE'});
 assert.equal((await pending).status,401);const after=await request('/orders/OD-1043',{cookie:operator});assert.deepEqual(after.data,before.data);
});
await check('revoking a session during a packing preview prevents its private result',async()=>{
 const temp=await session('viewer');const pending=request('/packing-preview',{cookie:temp,method:'POST',body:{ids:['OD-1043']}});
 await new Promise(resolve=>setTimeout(resolve,550));await request('/session',{cookie:temp,method:'DELETE'});assert.equal((await pending).status,401);
});
await request('/session',{cookie:viewer,method:'DELETE'});await request('/session',{cookie:operator,method:'DELETE'});
console.log(JSON.stringify({base,checks:results,passed:results.length},null,2));
