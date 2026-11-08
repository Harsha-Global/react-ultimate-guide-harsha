import test from 'node:test'; import assert from 'node:assert/strict';
import { makeShortlistStore } from '../lib/shortlistStore.ts';
import { restoreIds } from '../lib/shortlistPersistence.ts';
test('separate stores preserve independent initial values and actions', () => {
 const first = makeShortlistStore(['P-101'], 'test-a'); const second = makeShortlistStore([], 'test-b');
 const memory = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
 first.persist.setOptions({ storage: memory }); second.persist.setOptions({ storage: memory });
 first.getState().toggle('P-103');
 assert.deepEqual(first.getState().ids, ['P-101','P-103']); assert.deepEqual(second.getState().ids, []);
});
test('a saved empty shortlist replaces initial ids only after explicit hydration', async () => {
 const store = makeShortlistStore(['P-101']);
 store.persist.setOptions({ storage: { getItem: () => ({ state: { ids: [] }, version: 0 }), setItem: () => {}, removeItem: () => {} } });
 assert.deepEqual(store.getState().ids, ['P-101']); await store.persist.rehydrate();
 assert.deepEqual(store.getState().ids, []); assert.equal(store.persist.hasHydrated(), true);
});
test('invalid saved ids retain the initial array, duplicates are removed', () => {
 assert.deepEqual(restoreIds({ ids: ['P-101','P-101'] }, []), ['P-101']);
 for (const value of [null, 5, {ids: 'P-101'}, {ids: ['wrong']}, {ids: ['P-999']}, {ids: [4]}]) assert.deepEqual(restoreIds(value, ['P-103']), ['P-103']);
});
test('denied reads retain initial values and expose failed hydration', async () => {
 const store = makeShortlistStore(['P-101']);
 store.persist.setOptions({ storage: { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('denied'); }, removeItem: () => {} } });
 await store.persist.rehydrate(); assert.equal(store.persist.hasHydrated(), false);
 assert.deepEqual(store.getState().ids, ['P-101']);
 assert.throws(() => store.getState().toggle('P-103'), /denied/);
 assert.deepEqual(store.getState().ids, ['P-101','P-103']);
});
