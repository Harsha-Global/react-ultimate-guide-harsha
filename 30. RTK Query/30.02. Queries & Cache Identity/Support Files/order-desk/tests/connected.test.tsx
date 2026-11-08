import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import {
  render,
  screen,
  within,
  waitFor,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { makeStore } from "../src/app/store";
import { OrderQueue } from "../src/OrderQueue";
import { SelectionSummary } from "../src/SelectionSummary";
import { orders } from "../src/orders";
import { ordersApi } from "../src/services/ordersApi";
const server = setupServer(
  http.get("http://127.0.0.1:5188/api/orders", ({ request }) => {
    const search = new URL(request.url).searchParams.get("search") || "";
    return HttpResponse.json(
      orders
        .filter((o) => o.customer.includes(search))
        .map((o) => ({ ...o, version: 1 })),
    );
  }),
);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
it("retains selection across API searches and clears it explicitly", async () => {
  const store = makeStore(null);
  const user = userEvent.setup();
  render(
    <Provider store={store}>
      <OrderQueue />
      <SelectionSummary />
    </Provider>,
  );
  await user.click(
    await screen.findByRole("checkbox", { name: "Select OD-1042" }),
  );
  const summary = screen.getByRole("complementary", { name: "Selection" });
  expect(within(summary).getByText("1")).toBeInTheDocument();
  await user.type(
    screen.getByRole("textbox", { name: "Search orders" }),
    "Avery",
  );
  await user.click(screen.getByRole("button", { name: "Search" }));
  await waitFor(() =>
    expect(
      screen.queryByRole("checkbox", { name: "Select OD-1042" }),
    ).not.toBeInTheDocument(),
  );
  expect(within(summary).getByText("1")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Clear search" }));
  expect(
    await screen.findByRole("checkbox", { name: "Select OD-1042" }),
  ).toBeChecked();
  await user.click(
    within(summary).getByRole("button", { name: "Clear selection" }),
  );
  expect(within(summary).getByText("0")).toBeInTheDocument();
  cleanup();
  store.dispatch(ordersApi.util.resetApiState());
});
