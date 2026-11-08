import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { expect, it } from "vitest";
import { makeStore } from "../src/app/store";
import { PackingChecklist } from "../src/PackingChecklist";
it("rejects a blank task and lets the user add, complete and remove a local task", async () => {
  const user = userEvent.setup();
  render(
    <Provider store={makeStore()}>
      <PackingChecklist />
    </Provider>,
  );
  await user.click(screen.getByRole("button", { name: "Add task" }));
  expect(screen.getByRole("alert")).toHaveTextContent("Enter a task");
  await user.type(screen.getByRole("textbox", { name: "New packing task" }), "  Inspect boxes  ");
  await user.click(screen.getByRole("button", { name: "Add task" }));
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  const task = screen.getByRole("checkbox", { name: "Inspect boxes" });
  await user.click(task);
  expect(task).toBeChecked();
  await user.click(screen.getByRole("button", { name: "Remove Inspect boxes" }));
  expect(screen.queryByRole("checkbox", { name: "Inspect boxes" })).not.toBeInTheDocument();
});
