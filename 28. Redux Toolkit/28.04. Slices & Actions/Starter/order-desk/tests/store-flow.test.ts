import { expect, it } from "vitest";
import { makeStore } from "../src/app/store";
import { selectionReplaced } from "../src/features/selection/selectionSlice";
it("notifies a subscriber after the reducer has produced the next selection", () => {
  const store = makeStore();
  const observed: string[][] = [];
  const unsubscribe = store.subscribe(() => {
    observed.push(store.getState().selection.selectedIds);
  });
  const action = selectionReplaced(["OD-1041"]);
  expect(action).toEqual({ type: "selection/selectionReplaced", payload: ["OD-1041"] });
  expect(store.getState().selection.selectedIds).toEqual([]);
  store.dispatch(action);
  expect(observed).toEqual([["OD-1041"]]);
  unsubscribe();
  store.dispatch(selectionReplaced([]));
  expect(observed).toHaveLength(1);
});
