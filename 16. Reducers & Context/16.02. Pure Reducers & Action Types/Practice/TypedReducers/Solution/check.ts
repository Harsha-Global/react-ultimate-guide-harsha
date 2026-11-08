import assert from "node:assert/strict";
import { reducer } from "./reducer.ts";
const state = [
  { id: "e1", quantity: 1 },
  { id: "e2", quantity: 2 },
];
Object.freeze(state);
for (const line of state) Object.freeze(line);
const result = reducer(state, {
  type: "quantityChanged",
  id: "e1",
  quantity: 3,
});
assert.equal(result[0].quantity, 3);
assert.equal(state[0].quantity, 1);
assert.equal(result[1], state[1]);
for (const quantity of [0, 5, 1.5, NaN])
  assert.equal(
    reducer(state, { type: "quantityChanged", id: "e1", quantity }),
    state,
  );
assert.equal(
  reducer(state, { type: "quantityChanged", id: "missing", quantity: 3 }),
  state,
);
assert.equal(
  reducer(state, { type: "quantityChanged", id: "e1", quantity: 1 }),
  state,
);
assert.deepEqual(reducer(state, { type: "remove", id: "e1" }), [
  { id: "e2", quantity: 2 },
]);
console.log("Typed reducer practice passed.");
