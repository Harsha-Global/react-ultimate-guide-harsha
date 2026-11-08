import { expect, it } from "vitest";
import { makeStore } from "../src/app/store";
import { orderToggled, selectionCleared } from "../src/features/selection/selectionSlice";
it("notifies a subscriber after the reducer has produced the next selection", () => {
  const store = makeStore();
  // Initialize RTK Query middleware before observing the user action.
  store.dispatch({ type: "test/initialize" });
  const observed: string[][] = [];
  const unsubscribe = store.subscribe(() => {
    observed.push(store.getState().selection.selectedIds);
  });
  const action = orderToggled("OD-1041");
  expect(action).toEqual({ type: "selection/orderToggled", payload: "OD-1041" });
  expect(store.getState().selection.selectedIds).toEqual([]);
  store.dispatch(action);
  expect(observed).toEqual([["OD-1041"]]);
  unsubscribe();
  store.dispatch(selectionCleared());
  expect(observed).toHaveLength(1);
});
