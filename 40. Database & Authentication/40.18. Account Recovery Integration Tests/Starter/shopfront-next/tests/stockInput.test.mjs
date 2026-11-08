import test from 'node:test';import assert from 'node:assert/strict';import { parseStockInput } from '../lib/stockInput.ts';
function form(id,stock){const value=new FormData();value.set('id',id);value.set('stock',stock);return value;}
for(const stock of ['0','7','99',' 12 ']) test('accepts '+stock,()=>assert.deepEqual(parseStockInput(form('P-101',stock)),{id:'P-101',stock:Number(stock)}));
for(const stock of ['','-1','1.5','100','1e1','7x']) test('rejects '+stock,()=>assert.equal(parseStockInput(form('P-101',stock)),null));
test('rejects an untrusted hidden id',()=>assert.equal(parseStockInput(form('../other','7')),null));
