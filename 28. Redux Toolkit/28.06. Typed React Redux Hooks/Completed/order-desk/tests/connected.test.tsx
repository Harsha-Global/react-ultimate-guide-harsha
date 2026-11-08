import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { expect, it } from "vitest";
import { makeStore } from "../src/app/store";
import { App } from "../src/App";
it("keeps one selection across the queue, filter and summary", async () => {
  const user = userEvent.setup();
  render(
    <Provider store={makeStore()}>
      <App />
    </Provider>,
  );
  await user.click(screen.getByRole("checkbox", { name: "Select OD-1042" }));
  expect(within(screen.getByRole("status")).getByText("1")).toBeInTheDocument();
  await user.click(screen.getByRole("checkbox", { name: "Show ready orders only" }));
  expect(screen.queryByRole("checkbox", { name: "Select OD-1042" })).not.toBeInTheDocument();
  expect(within(screen.getByRole("status")).getByText("1")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Clear selection" }));
  await user.click(screen.getByRole("checkbox", { name: "Show ready orders only" }));
  expect(screen.getByRole("checkbox", { name: "Select OD-1042" })).not.toBeChecked();
  expect(screen.getByRole("button", { name: "Clear selection" })).toBeDisabled();
});
