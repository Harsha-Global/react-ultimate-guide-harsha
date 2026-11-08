import { expect, it } from "vitest";
import { makeStore } from "../src/app/store";
import { orderToggled } from "../src/features/selection/selectionSlice";
import {
  selectCanPrioritize,
  selectReadyCount,
  selectSelectedCount,
} from "../src/features/selection/selectors";
function selected(...ids: string[]) {
  const store = makeStore();
  ids.forEach((id) => store.dispatch(orderToggled(id)));
  return store.getState();
}
it("does not accept an empty selection", () => {
  expect(selectCanPrioritize(selected())).toBe(false);
});
it("accepts only selected ready orders", () => {
  const state = selected("OD-1041", "OD-1043");
  expect(selectSelectedCount(state)).toBe(2);
  expect(selectReadyCount(state)).toBe(2);
  expect(selectCanPrioritize(state)).toBe(true);
});
it("rejects mixed readiness without hiding the ready count", () => {
  const state = selected("OD-1041", "OD-1042");
  expect(selectSelectedCount(state)).toBe(2);
  expect(selectReadyCount(state)).toBe(1);
  expect(selectCanPrioritize(state)).toBe(false);
});
it("does not silently approve a missing record", () => {
  const state = selected("OD-1041", "OD-missing");
  expect(selectSelectedCount(state)).toBe(1);
  expect(selectCanPrioritize(state)).toBe(false);
});
