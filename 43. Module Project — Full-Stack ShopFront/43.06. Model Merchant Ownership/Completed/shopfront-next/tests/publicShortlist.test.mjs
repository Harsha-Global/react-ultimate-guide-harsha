import test from 'node:test';
import assert from 'node:assert/strict';
import { parseShortlist } from '../lib/publicShortlist.ts';
test('new browser starts empty',()=>assert.deepEqual(parseShortlist(null),[]));
test('restoration removes duplicates, unknown IDs and non-string entries',()=>assert.deepEqual(parseShortlist('["P-101","P-101",{},"P-104","P-999"]'),['P-101','P-104']));
test('malformed saved data takes the recovery path',()=>{assert.throws(()=>parseShortlist('{'));assert.throws(()=>parseShortlist('{}'));});
