import { expect, it } from "vitest";
import { makeStore } from "../src/app/store";
import {
  orderToggled,
  selectionCleared,
  readyFilterChanged,
} from "../src/features/selection/selectionSlice";
it("toggles one order without losing other selected orders", () => {
  const store = makeStore();
  store.dispatch(orderToggled("OD-1041"));
  store.dispatch(orderToggled("OD-1043"));
  store.dispatch(orderToggled("OD-1041"));
  expect(store.getState().selection.selectedIds).toEqual(["OD-1043"]);
});
it("keeps the selection when the queue filter changes and clears only the selection", () => {
  const store = makeStore();
  store.dispatch(orderToggled("OD-1042"));
  store.dispatch(readyFilterChanged(true));
  expect(store.getState().selection.selectedIds).toEqual(["OD-1042"]);
  store.dispatch(selectionCleared());
  expect(store.getState().selection).toEqual({ selectedIds: [], readyOnly: true });
});
