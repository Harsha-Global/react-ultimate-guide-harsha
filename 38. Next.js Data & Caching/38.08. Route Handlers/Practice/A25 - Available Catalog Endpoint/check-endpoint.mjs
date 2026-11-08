import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
if (!process.argv[2] || !process.argv[3]) throw new Error('Use node check-endpoint.mjs <Next origin> <active API project folder>');
const apiProject=path.resolve(process.argv[3]);
const report=new URL('./A25 endpoint acceptance.txt',import.meta.url);
const mode=(m)=>execFileSync(process.execPath,['scripts/api-mode.mjs',m],{cwd:apiProject});
const origin=process.argv[2];let lines=[];
mode('reset');
const cases=[['',200,4],['?inStock=0',200,4],['?inStock=1',200,3],['?category=Travel&inStock=1',200,0],['',200,4],['?inStock=',400],['?inStock=2',400],['?inStock=true',400],['?inStock=1&inStock=0',400],['?category=Unknown',400],['?category=Travel&category=Workspace',400]];
try{
for(const [query,status,count]of cases){const r=await fetch(origin+'/api/catalog'+query);assert.equal(r.status,status,query);const b=await r.json();if(count!==undefined){assert.equal(b.products.length,count,query);assert.equal(b.revision,1);assert.equal(r.headers.get('cache-control'),'no-store');}lines.push(`PASS ${query||'(no query)'}: ${status}${count===undefined?'':', '+count+' products, revision 1'}`);}
assert.equal((await fetch(origin+'/api/catalog',{method:'POST'})).status,405);lines.push('PASS POST: 405');
mode('error');let r=await fetch(origin+'/api/catalog?category=Audio');assert.equal(r.status,503);lines.push('PASS uncached Audio during API outage: 503');
mode('ready');r=await fetch(origin+'/api/catalog?category=Audio');assert.equal(r.status,200);lines.push('PASS Audio after API restoration: 200');
}finally{mode('ready');await fs.writeFile(fileURLToPath(report),lines.join('\n')+'\n');console.log(lines.join('\n'));}
