import test from 'node:test';
import assert from 'node:assert/strict';
import { createLoader, createSerializer } from 'nuqs/server';
import { viewParsers } from '../src/viewParsers.ts';
const load = createLoader(viewParsers);
const serialize = createSerializer(viewParsers);
test('valid shared view retains typed choices', () => {
  assert.deepEqual(load('?q=Travel&sort=priceMinor&dir=desc&page=2&size=4'), {q:'Travel',sort:'priceMinor',dir:'desc',page:2,size:4});
});
test('invalid page and unknown choices fall back safely', () => {
  for (const page of ['-1','0','1.5','1e2','100001','cat']) assert.equal(load('?page='+page).page,1);
  assert.deepEqual(load('?sort=no&dir=no&size=500&q='+ 'x'.repeat(61)),{q:'',sort:'',dir:'asc',page:1,size:2});
});
test('managed defaults clear while unrelated params and hash survive', () => {
  const output = serialize('/?campaign=demo&page=2#catalog', {page:1,q:'desk lamp'});
  const url = new URL(output, 'http://local');
  assert.equal(url.searchParams.get('page'),null);
  assert.equal(url.searchParams.get('q'),'desk lamp');
  assert.equal(url.searchParams.get('campaign'),'demo');
  assert.equal(url.hash,'#catalog');
});
