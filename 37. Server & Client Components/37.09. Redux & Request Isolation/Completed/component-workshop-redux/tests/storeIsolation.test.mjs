import test from 'node:test'; import assert from 'node:assert/strict';
import { makeShortlistStore, toggle } from '../lib/shortlistStore.ts';
test('two request stores do not share a mutable shortlist', () => {
 const first = makeShortlistStore(['P-101']); const second = makeShortlistStore([]);
 first.dispatch(toggle('P-103'));
 assert.deepEqual(first.getState().ids, ['P-101', 'P-103']); assert.deepEqual(second.getState().ids, []);
});
test('the caller cannot mutate the store through its initial array', () => {
 const initial = ['P-101']; const store = makeShortlistStore(initial);
 initial.push('P-103'); assert.deepEqual(store.getState().ids, ['P-101']);
});
