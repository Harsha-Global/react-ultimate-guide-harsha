import test from 'node:test';
import assert from 'node:assert/strict';
import {createMotionPreference,reducedMotionQuery} from '../src/motionPreference.ts';
test('unknown environment opts for the static presentation',()=>{
 const preference=createMotionPreference();assert.equal(preference.getSnapshot(),true);assert.equal(preference.getServerSnapshot(),true);preference.subscribe(()=>{})();
});
test('media changes notify subscribers and read the latest preference',()=>{
 const listeners=new Set();const media={matches:false,addEventListener:(_,f)=>listeners.add(f),removeEventListener:(_,f)=>listeners.delete(f)};
 const preference=createMotionPreference((query)=>{assert.equal(query,reducedMotionQuery);return media});let updates=0;
 const dispose=preference.subscribe(()=>updates++);assert.equal(preference.getSnapshot(),false);
 media.matches=true;listeners.forEach(f=>f());assert.equal(updates,1);assert.equal(preference.getSnapshot(),true);
 media.matches=false;listeners.forEach(f=>f());assert.equal(updates,2);assert.equal(preference.getSnapshot(),false);
 dispose();assert.equal(listeners.size,0);listeners.forEach(f=>f());assert.equal(updates,2);
});
test('StrictMode subscribe/cleanup/reconnect leaves one listener',()=>{
 const listeners=new Set();const preference=createMotionPreference(()=>({matches:true,addEventListener:(_,f)=>listeners.add(f),removeEventListener:(_,f)=>listeners.delete(f)}));
 preference.subscribe(()=>{})();const dispose=preference.subscribe(()=>{});assert.equal(listeners.size,1);dispose();assert.equal(listeners.size,0);
});
