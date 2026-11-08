import { expect, it } from "vitest";
import { makeStore } from "../src/app/store";
import { orderToggled, readyFilterChanged } from "../src/features/selection/selectionSlice";
import { selectSelectedOrders } from "../src/features/selection/selectors";
it("reuses a selected-order result across an unrelated filter update", () => {
  const store = makeStore();
  store.dispatch(orderToggled("OD-1041"));
  const first = selectSelectedOrders(store.getState());
  const runs = selectSelectedOrders.recomputations();
  store.dispatch(readyFilterChanged(true));
  const second = selectSelectedOrders(store.getState());
  expect(second).toBe(first);
  expect(selectSelectedOrders.recomputations()).toBe(runs);
  store.dispatch(orderToggled("OD-1043"));
  const third = selectSelectedOrders(store.getState());
  expect(third).not.toBe(first);
  expect(third.map((order) => order.id)).toEqual(["OD-1041", "OD-1043"]);
  expect(selectSelectedOrders.recomputations()).toBe(runs + 1);
});
