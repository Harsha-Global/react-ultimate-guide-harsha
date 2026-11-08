import test from "node:test";
import assert from "node:assert/strict";
// This isolated Node process has no browser. Install a memory-only test adapter
// before importing the persisted singleton; no user browser storage is read.
const values = new Map();
Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  },
});
const { useWorkspaceStore } = await import("../src/workspaceStore.ts");

test("focused actions preserve unrelated values and previous snapshots", () => {
  useWorkspaceStore.getState().resetPreferences();
  const previous = useWorkspaceStore.getState();
  previous.setDensity("compact");
  assert.equal(previous.density, "comfortable");
  assert.equal(useWorkspaceStore.getState().summaryOpen, true);
  useWorkspaceStore.getState().toggleSummary();
  assert.equal(useWorkspaceStore.getState().summaryOpen, false);
  assert.equal(useWorkspaceStore.getState().density, "compact");
  useWorkspaceStore.getState().toggleSummary();
  assert.equal(useWorkspaceStore.getState().summaryOpen, true);
});
test("reset restores only display preferences and preserves actions", () => {
  useWorkspaceStore.getState().setDensity("compact");
  useWorkspaceStore.getState().resetPreferences();
  assert.equal(useWorkspaceStore.getState().density, "comfortable");
  useWorkspaceStore.getState().toggleSummary();
  assert.equal(useWorkspaceStore.getState().summaryOpen, false);
  useWorkspaceStore.getState().resetPreferences();
});
