import { expect, it } from "vitest";
import { makeStore } from "../src/app/store";
import { orderToggled, readyFilterChanged } from "../src/features/selection/selectionSlice";
it("keeps a previous snapshot unchanged while producing the new selection", () => {
  const store = makeStore();
  const before = store.getState();
  store.dispatch(orderToggled("OD-1041"));
  const after = store.getState();
  expect(before.selection.selectedIds).toEqual([]);
  expect(after.selection.selectedIds).toEqual(["OD-1041"]);
  expect(after.selection).not.toBe(before.selection);
});
it("reuses the unchanged selected IDs when only the filter changes", () => {
  const store = makeStore();
  store.dispatch(orderToggled("OD-1041"));
  const before = store.getState();
  store.dispatch(readyFilterChanged(true));
  const after = store.getState();
  expect(after.selection).not.toBe(before.selection);
  expect(after.selection.selectedIds).toBe(before.selection.selectedIds);
});
it("shows why push on an ordinary object is a real mutation", () => {
  const ordinary = { selectedIds: [] as string[] };
  const alias = ordinary;
  ordinary.selectedIds.push("OD-1041");
  expect(alias.selectedIds).toEqual(["OD-1041"]);
});
