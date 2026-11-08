import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { makeStore } from "../src/app/store";
import { App } from "../src/App";
import { completedCleared, taskToggled, selectTasks, selectCompletedCount } from "../src/features/checklist/checklistSlice";
import { orderToggled } from "../src/features/selection/selectionSlice";
it("removes completed tasks while preserving unfinished tasks and the order selection", () => {
  const store = makeStore();
  store.dispatch(orderToggled("OD-1041"));
  store.dispatch(taskToggled("labels"));
  const before = store.getState();
  store.dispatch(completedCleared());
  const after = store.getState();
  expect(selectTasks(after).map((task) => task.id)).toEqual(["supplies"]);
  expect(after.checklist.entities.labels).toBeUndefined();
  expect(after.checklist.ids).toEqual(["supplies"]);
  expect(after.selection).toBe(before.selection);
  expect(before.checklist.entities.labels?.done).toBe(true);
});
it("leaves an already-clear collection unchanged", () => {
  const store = makeStore();
  const before = store.getState();
  store.dispatch(completedCleared());
  expect(store.getState()).toBe(before);
  expect(selectCompletedCount(store.getState())).toBe(0);
});
it("handles an all-completed collection", () => {
  const store = makeStore();
  store.dispatch(taskToggled("labels"));
  store.dispatch(taskToggled("supplies"));
  store.dispatch(completedCleared());
  expect(selectTasks(store.getState())).toEqual([]);
  expect(selectCompletedCount(store.getState())).toBe(0);
});
it("connects the disabled state, clear action and empty-list feedback", async () => {
  const user = userEvent.setup();
  render(
    <Provider store={makeStore()}>
      <App />
    </Provider>,
  );
  const button = screen.getByRole("button", { name: "Clear completed tasks" });
  expect(button).toBeDisabled();
  await user.click(screen.getByRole("checkbox", { name: "Check shipping labels" }));
  expect(button).toBeEnabled();
  await user.click(button);
  expect(screen.queryByRole("checkbox", { name: "Check shipping labels" })).not.toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "Prepare packing supplies" })).not.toBeChecked();
  expect(button).toBeDisabled();
  await user.click(screen.getByRole("checkbox", { name: "Prepare packing supplies" }));
  await user.click(button);
  expect(screen.getByText("No preparation tasks yet.")).toBeInTheDocument();
  expect(button).toBeDisabled();
});
