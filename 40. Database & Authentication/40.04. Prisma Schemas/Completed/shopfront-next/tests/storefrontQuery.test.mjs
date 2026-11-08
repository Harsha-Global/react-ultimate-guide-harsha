import test from 'node:test';
import assert from 'node:assert/strict';
import { products } from '../lib/catalog.ts';
import { readStorefrontQuery, selectStorefrontProducts } from '../lib/storefrontQuery.ts';
test('normalizes omitted, invalid and repeated values',()=>{assert.deepEqual(readStorefrontQuery({}),{q:'',category:'All',sort:'featured'});assert.deepEqual(readStorefrontQuery({q:['lamp','mug'],category:['Travel'],sort:['price']}),{q:'',category:'All',sort:'featured'});assert.equal(readStorefrontQuery({category:'Unknown'}).category,'All');});
test('trims and bounds search, accepts exact category and sort',()=>{assert.deepEqual(readStorefrontQuery({q:'  lamp  ',category:'Workspace',sort:'price'}),{q:'lamp',category:'Workspace',sort:'price'});assert.equal(readStorefrontQuery({q:'x'.repeat(70)}).q.length,60);});
test('filters the supplied snapshot without mutating it',()=>{const data=products.map(p=>({...p}));const original=structuredClone(data);assert.deepEqual(selectStorefrontProducts(data,{q:'STUDIO',category:'Audio',sort:'featured'}).map(p=>p.id),['P-104']);assert.equal(selectStorefrontProducts(data,{q:'zzzzz',category:'All',sort:'featured'}).length,0);assert.deepEqual(data,original);});
test('sort returns a fresh ordered array and retains unavailable products',()=>{const before=products.map(p=>p.id);assert.deepEqual(selectStorefrontProducts(products,{q:'',category:'All',sort:'price'}).map(p=>p.id),['P-103','P-102','P-101','P-104']);assert.deepEqual(products.map(p=>p.id),before);});
