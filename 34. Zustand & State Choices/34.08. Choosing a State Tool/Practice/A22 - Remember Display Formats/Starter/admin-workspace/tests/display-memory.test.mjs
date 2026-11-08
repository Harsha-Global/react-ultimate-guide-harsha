import test from "node:test";
import assert from "node:assert/strict";
import { createWorkspaceStore } from "../src/workspaceStore.ts";
import { memoryStorage } from "./memory-storage.mjs";
import { readPreferences } from "../src/preferenceSchema.ts";

test("locale and zone changes have one store owner and persist", async () => {
  const storage = memoryStorage(); const store = createWorkspaceStore(storage);
  store.getState().setLocale("de-DE"); store.getState().setZone("America/New_York");
  const other = createWorkspaceStore(storage); await other.persist.rehydrate();
  assert.equal(other.getState().locale, "de-DE"); assert.equal(other.getState().zone, "America/New_York");
  const envelope = JSON.parse(storage.getItem("admin-workspace-preferences"));
  assert.equal(envelope.version, 2); assert.equal(Object.hasOwn(envelope.state, "setLocale"), false);
});
test("a previous display snapshot preserves layout while adding format defaults", async () => {
  const store = createWorkspaceStore(memoryStorage({ "admin-workspace-preferences": JSON.stringify({ state: { density: "compact", summaryOpen: false }, version: 1 }) }));
  await store.persist.rehydrate();
  assert.equal(store.getState().density, "compact"); assert.equal(store.getState().summaryOpen, false);
  assert.equal(store.getState().locale, "en-US"); assert.equal(store.getState().zone, "UTC");
});
test("the earliest boolean format still migrates", async () => {
  const store = createWorkspaceStore(memoryStorage({ "admin-workspace-preferences": JSON.stringify({ state: { dense: true, summaryOpen: true }, version: 0 }) }));
  await store.persist.rehydrate(); assert.equal(store.getState().density, "compact"); assert.equal(store.getState().locale, "en-US");
});
test("invalid current format choices fall back before reaching Intl", () => {
  assert.deepEqual(readPreferences({ density: "compact", summaryOpen: false, locale: "not-a-locale", zone: "bad-zone" }), { density: "comfortable", summaryOpen: true, locale: "en-US", zone: "UTC" });
});
test("reset restores all display choices and preserves action functions", () => {
  const store = createWorkspaceStore(memoryStorage()); store.getState().setLocale("de-DE"); store.getState().setZone("America/New_York");
  store.getState().setDensity("compact"); store.getState().resetPreferences();
  assert.equal(store.getState().locale, "en-US"); assert.equal(store.getState().zone, "UTC"); assert.equal(store.getState().density, "comfortable");
  store.getState().setLocale("en-IN"); assert.equal(store.getState().locale, "en-IN");
});
test("format changes do not add URL or product data to preferences", () => {
  const store = createWorkspaceStore(memoryStorage());
  assert.equal(Object.hasOwn(store.getState(), "products"), false); assert.equal(Object.hasOwn(store.getState(), "q"), false);
});
