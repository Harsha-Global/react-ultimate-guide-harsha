import test from 'node:test'; import assert from 'node:assert/strict';
import { parseCatalog } from '../lib/catalogContract.ts'; import { products } from '../lib/catalog.ts';
test('valid sample preserves values without extra fields',()=> { const data=parseCatalog({revision:1,products:products.map(p=>({...p,internal:'private'}))}); assert.deepEqual(data,{revision:1,products}); });
test('empty catalog is valid',()=>assert.deepEqual(parseCatalog({revision:2,products:[]}),{revision:2,products:[]}));
for (const value of [null,{}, {revision:0,products}, {revision:1,products:[{...products[0],stock:-1}]}, {revision:1,products:[{...products[0],image:'https://untrusted.example/image.jpg'}]}]) test('rejects malformed catalog '+JSON.stringify(value).slice(0,50),()=>assert.throws(()=>parseCatalog(value)));
