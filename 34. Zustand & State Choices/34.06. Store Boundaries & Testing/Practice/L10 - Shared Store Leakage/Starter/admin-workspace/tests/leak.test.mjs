import test from "node:test";
import assert from "node:assert/strict";
import { makeTestStore } from "./test-store.mjs";
test("a staff member can choose compact rows", () => {
  const store = makeTestStore(); store.getState().setDensity("compact");
  assert.equal(store.getState().density, "compact");
});
test("an independent fixture starts with comfortable rows", () => {
  const store = makeTestStore(); assert.equal(store.getState().density, "comfortable");
});
test("two fixtures keep overview choices independent", () => {
  const first = makeTestStore(); const second = makeTestStore();
  first.getState().toggleSummary(); assert.equal(second.getState().summaryOpen, true);
});
