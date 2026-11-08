import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import { createWorkspaceStore } from "../src/workspaceStore.ts";
import { memoryStorage } from "./memory-storage.mjs";
let store;
beforeEach(() => { store = createWorkspaceStore(memoryStorage()); });

test("focused actions preserve unrelated values and previous snapshots", () => {
  const previous = store.getState(); previous.setDensity("compact");
  assert.equal(previous.density, "comfortable"); assert.equal(store.getState().summaryOpen, true);
  store.getState().toggleSummary();
  assert.equal(store.getState().summaryOpen, false); assert.equal(store.getState().density, "compact");
});
test("a new test starts with default choices", () => {
  assert.equal(store.getState().density, "comfortable"); assert.equal(store.getState().summaryOpen, true);
});
test("separate stores do not share mutable state or actions", () => {
  const other = createWorkspaceStore(memoryStorage());
  store.getState().setDensity("compact"); store.getState().toggleSummary();
  assert.equal(other.getState().density, "comfortable"); assert.equal(other.getState().summaryOpen, true);
  store.getState().resetPreferences();
  assert.equal(store.getState().density, "comfortable");
  store.getState().toggleSummary(); assert.equal(store.getState().summaryOpen, false);
});
test("async storage finishes hydration before preferences are considered ready", async () => {
  let resolveRead; const delayed = createWorkspaceStore({ getItem: () => new Promise(resolve => { resolveRead = resolve; }), setItem() {}, removeItem() {} });
  const pending = delayed.persist.rehydrate();
  assert.equal(delayed.persist.hasHydrated(), false);
  resolveRead(JSON.stringify({ state: { density: "compact", summaryOpen: false }, version: 1 }));
  await pending;
  assert.equal(delayed.persist.hasHydrated(), true); assert.equal(delayed.getState().density, "compact");
});
test("hydration cannot replace executable actions with saved fields", async () => {
  const stored = memoryStorage({ "admin-workspace-preferences": JSON.stringify({ state: { density: "compact", summaryOpen: false, toggleSummary: "untrusted" }, version: 1 }) });
  const current = createWorkspaceStore(stored); await current.persist.rehydrate();
  current.getState().toggleSummary(); assert.equal(current.getState().summaryOpen, true);
});
