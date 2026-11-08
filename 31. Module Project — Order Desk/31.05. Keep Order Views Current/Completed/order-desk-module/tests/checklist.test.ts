import { orders } from "../src/orders";
import { expect, it } from "vitest";
import { makeStore } from "../src/app/store";
import {
  taskAdded,
  taskRemoved,
  taskToggled,
  selectTasks,
} from "../src/features/checklist/checklistSlice";
import { selectVisibleSelectedOrders } from "../src/features/selection/selectors";
it("adds, changes and removes one normalized task", () => {
  const store = makeStore();
  store.dispatch(
    taskAdded({ id: "check", text: "Check boxes", done: false }),
  );
  expect(store.getState().checklist.ids).toContain("check");
  expect(store.getState().checklist.entities.check?.done).toBe(false);
  store.dispatch(taskToggled("check"));
  expect(
    selectTasks(store.getState()).find((task) => task.id === "check")?.done,
  ).toBe(true);
  store.dispatch(taskRemoved("check"));
  expect(store.getState().checklist.ids).not.toContain("check");
  expect(store.getState().checklist.entities.check).toBeUndefined();
});
it("ignores a removed ID without changing existing tasks", () => {
  const store = makeStore();
  const before = store.getState().checklist;
  store.dispatch(taskToggled("missing"));
  expect(store.getState().checklist).toBe(before);
});
it("keeps the memoized order selection unchanged after a checklist edit", () => {
  const store = makeStore();
  const selected = selectVisibleSelectedOrders(store.getState(), orders);
  store.dispatch(taskToggled("labels"));
  expect(selectVisibleSelectedOrders(store.getState(), orders)).toBe(
    selected,
  );
});
