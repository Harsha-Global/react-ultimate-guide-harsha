import assert from 'node:assert/strict';
import { getOrders } from './orders.mjs';
import { memberships } from './fixture.mjs';
const alex = {userId:'alex'}, bob = {userId:'bob'};
assert.deepEqual(getOrders(alex,'studio').map(r=>r.id), ['O-A1']);
const actual = getOrders(bob,'studio').map(r=>r.id);
console.log('Bob studio view:', actual);
assert.deepEqual(actual, ['O-B1'], "Bob must never receive Alex's order");
// Reverse the requester order as required by the worked investigation.
assert.deepEqual(getOrders(bob,'studio').map(r=>r.id), ['O-B1']);
assert.deepEqual(getOrders(alex,'studio').map(r=>r.id), ['O-A1']);
assert.deepEqual(getOrders(alex,'travel').map(r=>r.id), ['O-A2']);
assert.throws(()=>getOrders(bob,'travel'), /Forbidden/);
assert.throws(()=>getOrders(null,'studio'), /Forbidden/);
memberships.delete('alex:studio');
assert.throws(()=>getOrders(alex,'studio'), /Forbidden/);
console.log('PASS: both requester orders, changed workspace, missing session and revoked membership.');
