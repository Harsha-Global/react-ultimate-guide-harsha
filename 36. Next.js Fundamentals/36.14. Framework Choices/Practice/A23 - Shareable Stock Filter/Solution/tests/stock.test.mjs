import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCatalogQuery } from '../lib/catalogQuery.ts';
for (const [label,raw,expected] of [
 ['accepted single stock value',{stock:'1'},true],
 ['omitted stock',{},false],
 ['unsupported value',{stock:'true'},false],
 ['repeated stock',{stock:['1','1']},false],
]) test(label,()=>assert.equal(parseCatalogQuery(raw).inStock,expected));
test('stock composes with normalized search and sort',()=>assert.deepEqual(parseCatalogQuery({q:'  desk ',sort:'price',stock:'1'}),{q:'desk',sort:'price',inStock:true}));
