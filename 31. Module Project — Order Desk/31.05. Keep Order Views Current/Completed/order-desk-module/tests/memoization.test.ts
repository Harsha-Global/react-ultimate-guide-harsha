import { orders } from "../src/orders";
import { expect, it } from "vitest";
import { makeStore } from "../src/app/store";
import {
  orderToggled,
  readyFilterChanged,
} from "../src/features/selection/selectionSlice";
import { selectVisibleSelectedOrders } from "../src/features/selection/selectors";
it("reuses a selected-order result across an unrelated filter update", () => {
  const store = makeStore();
  store.dispatch(orderToggled("OD-1041"));
  const first = selectVisibleSelectedOrders(store.getState(), orders);
  const runs = selectVisibleSelectedOrders.recomputations();
  store.dispatch(readyFilterChanged(true));
  const second = selectVisibleSelectedOrders(store.getState(), orders);
  expect(second).toBe(first);
  expect(selectVisibleSelectedOrders.recomputations()).toBe(runs);
  store.dispatch(orderToggled("OD-1043"));
  const third = selectVisibleSelectedOrders(store.getState(), orders);
  expect(third).not.toBe(first);
  expect(third.map((order) => order.id)).toEqual(["OD-1041", "OD-1043"]);
  expect(selectVisibleSelectedOrders.recomputations()).toBe(runs + 1);
});
