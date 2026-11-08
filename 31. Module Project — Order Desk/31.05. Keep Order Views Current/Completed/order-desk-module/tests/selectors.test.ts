import { expect, test } from "vitest";
import { makeStore } from "../src/app/store";
import { orders } from "../src/orders";
import { orderToggled } from "../src/features/selection/selectionSlice";
import {
  selectSelectedCount,
  selectVisibleSelectedOrders,
} from "../src/features/selection/selectors";
import { selectReady } from "../src/features/selection/selectReady";
test("visible selection is derived from the supplied response, not the original fixtures", () => {
  const store = makeStore();
  store.dispatch(orderToggled("NEW-1"));
  const changed = [
    { ...orders[0], id: "NEW-1", status: "shipped" as const },
  ];
  expect(selectVisibleSelectedOrders(store.getState(), changed)).toEqual(
    changed,
  );
  expect(selectVisibleSelectedOrders(store.getState(), orders)).toEqual([]);
  expect(selectSelectedCount(store.getState())).toBe(1);
});
test("page changes preserve selected IDs outside the current page", () => {
  const store = makeStore();
  store.dispatch(orderToggled("OD-1041"));
  store.dispatch(selectReady(orders.slice(2, 4)));
  expect(store.getState().selection.selectedIds).toEqual([
    "OD-1041",
    "OD-1043",
  ]);
  expect(
    selectVisibleSelectedOrders(store.getState(), orders.slice(2, 4)),
  ).toEqual([orders[2]]);
  expect(selectSelectedCount(store.getState())).toBe(2);
});
test("repeated selection and duplicate rows add each ready ID once", () => {
  const store = makeStore();
  const rows = [orders[0], orders[0], orders[1]];
  store.dispatch(selectReady(rows));
  store.dispatch(selectReady(rows));
  expect(store.getState().selection.selectedIds).toEqual(["OD-1041"]);
  expect(rows).toEqual([orders[0], orders[0], orders[1]]);
});
test("changed service readiness and an empty page cannot add stale fixture IDs", () => {
  const store = makeStore();
  store.dispatch(selectReady([{ ...orders[0], status: "shipped" }]));
  store.dispatch(selectReady([]));
  expect(store.getState().selection.selectedIds).toEqual([]);
});
