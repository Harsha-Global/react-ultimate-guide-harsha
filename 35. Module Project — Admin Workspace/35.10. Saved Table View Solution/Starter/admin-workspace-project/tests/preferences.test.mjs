import test from "node:test";
import assert from "node:assert/strict";
import { readPreferences, migratePreferences } from "../src/preferenceSchema.ts";
const defaults = { density: "comfortable", summaryOpen: true };
test("current preferences accept valid values and drop unknown properties", () => {
  assert.deepEqual(readPreferences({ density: "compact", summaryOpen: false, token: "do-not-restore", toggleSummary: "bad" }), { density: "compact", summaryOpen: false });
});
test("invalid saved preferences use complete safe defaults", () => {
  for (const value of [null, [], "compact", {}, { density: "tiny", summaryOpen: false }, { density: "compact", summaryOpen: "yes" }]) assert.deepEqual(readPreferences(value), defaults);
});
test("old boolean density migrates without mutating its input", () => {
  const old = Object.freeze({ dense: true, summaryOpen: false });
  assert.deepEqual(migratePreferences(old, 0), { density: "compact", summaryOpen: false });
  assert.deepEqual(migratePreferences({ dense: false, summaryOpen: true }, 0), defaults);
});
test("unsupported versions and malformed old values fall back", () => {
  assert.deepEqual(migratePreferences({ dense: true, summaryOpen: false }, 99), defaults);
  assert.deepEqual(migratePreferences({ dense: "yes", summaryOpen: true }, 0), defaults);
});
