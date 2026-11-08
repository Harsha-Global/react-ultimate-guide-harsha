import test from "node:test";
import assert from "node:assert/strict";
import { createSafePreferenceStorage, createStorageHealth } from "../src/preferenceStorage.ts";

test("a failed write preserves the application and reports recovery", () => {
  const health = createStorageHealth(); let blocked = true; const values = new Map();
  const storage = createSafePreferenceStorage(() => ({ getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => { if (blocked) throw new Error("quota"); values.set(key, value); }, removeItem: (key) => values.delete(key) }), health);
  assert.doesNotThrow(() => storage.setItem("prefs", "compact"));
  assert.equal(health.getSnapshot(), "save"); assert.equal(values.size, 0);
  blocked = false; storage.setItem("prefs", "compact");
  assert.equal(health.getSnapshot(), null); assert.equal(storage.getItem("prefs"), "compact");
});
test("read failures propagate to the persist hydration callback", () => {
  const storage = createSafePreferenceStorage(() => { throw new Error("blocked storage"); }, createStorageHealth());
  assert.throws(() => storage.getItem("prefs"), /blocked storage/);
});
test("health observers unsubscribe and identical values do not notify twice", () => {
  const health = createStorageHealth(); let calls = 0; const stop = health.subscribe(() => calls++);
  health.report("restore"); health.report("restore"); assert.equal(calls, 1);
  stop(); health.report(null); assert.equal(calls, 1);
});
