import assert from "node:assert/strict";
import { basketReducer, initialBasket } from "./basketReducer.ts";
import { ticketCount, totalCents } from "./totals.ts";
import type { BasketState } from "./models.ts";
function frozen<T>(value: T): T {
  if (value && typeof value === "object") {
    Object.freeze(value);
    for (const v of Object.values(value)) frozen(v);
  }
  return value;
}
const empty = frozen(structuredClone(initialBasket));
const one = basketReducer(empty, { type: "ticketAdded", eventId: "e1" });
assert.deepEqual(one.lines, [{ eventId: "e1", quantity: 1 }]);
assert.deepEqual(empty.lines, []);
const two = basketReducer(frozen(one), { type: "ticketAdded", eventId: "e1" });
assert.equal(two.lines.length, 1);
assert.equal(two.lines[0].quantity, 2);
assert.equal(ticketCount(two.lines), 2);
assert.equal(totalCents(two.lines), 7000);
const four = basketReducer(frozen(two), {
  type: "quantityChanged",
  eventId: "e1",
  quantity: 4,
});
assert.equal(four.lines[0].quantity, 4);
assert.equal(
  basketReducer(frozen(four), { type: "ticketAdded", eventId: "e1" }),
  four,
);
for (const quantity of [0, -1, 1.5, 5, NaN, Infinity])
  assert.equal(
    basketReducer(four, { type: "quantityChanged", eventId: "e1", quantity }),
    four,
  );
assert.equal(
  basketReducer(four, { type: "quantityChanged", eventId: "e1", quantity: 4 }),
  four,
);
assert.equal(
  basketReducer(four, { type: "quantityChanged", eventId: "e2", quantity: 1 }),
  four,
);
assert.equal(
  basketReducer(four, { type: "ticketAdded", eventId: "unknown" }),
  four,
);
assert.equal(
  basketReducer(four, { type: "ticketRemoved", eventId: "unknown" }),
  four,
);
const mixed = basketReducer(frozen(two), {
  type: "ticketAdded",
  eventId: "e2",
});
assert.equal(mixed.lines[0], two.lines[0]);
assert.equal(ticketCount(mixed.lines), 3);
assert.equal(totalCents(mixed.lines), 13000);
const removed = basketReducer(frozen(mixed), {
  type: "ticketRemoved",
  eventId: "e1",
});
assert.deepEqual(removed.lines, [{ eventId: "e2", quantity: 1 }]);
assert.equal(totalCents(removed.lines), 6000);
const cleared = basketReducer(frozen(mixed), { type: "basketCleared" });
assert.deepEqual(cleared.lines, []);
assert.equal(ticketCount(cleared.lines), 0);
assert.equal(totalCents(cleared.lines), 0);
assert.equal(basketReducer(empty, { type: "basketCleared" }), empty);
assert.deepEqual(
  basketReducer(two, { type: "quantityChanged", eventId: "e1", quantity: 3 }),
  basketReducer(two, { type: "quantityChanged", eventId: "e1", quantity: 3 }),
);
const invalidAction = { type: "unhandled" } as unknown as Parameters<
  typeof basketReducer
>[1];
assert.throws(
  () => basketReducer(empty, invalidAction),
  /Unhandled basket action/,
);
const nonempty: BasketState = { lines: [{ eventId: "e1", quantity: 1 }] };
assert.equal(
  basketReducer(nonempty, {
    type: "quantityChanged",
    eventId: "e1",
    quantity: NaN,
  }),
  nonempty,
);
console.log(
  "Reducer checks passed: add, repeated add, quantity guards, identity, remove, clear, immutability, determinism, totals and unknown action.",
);
