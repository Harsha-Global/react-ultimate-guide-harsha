import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { makeStore } from "../src/app/store";
import { baseApi } from "../src/services/baseApi";
import { workspaceEntered } from "../src/features/session/sessionSlice";
import { orders } from "../src/orders";
import { OperationsQueue } from "../src/OperationsQueue";
const url = "http://127.0.0.1:5188/api/orders";
let calls: URLSearchParams[] = [],
  fail = false;
const stores: ReturnType<typeof makeStore>[] = [];
const server = setupServer(
  http.get(url, ({ request }) => {
    const params = new URL(request.url).searchParams;
    calls.push(params);
    if (fail)
      return HttpResponse.json(
        { message: "The queue is unavailable." },
        { status: 503 },
      );
    const rows = orders.filter(
      (order) =>
        order.customer
          .toLowerCase()
          .includes((params.get("search") || "").toLowerCase()) &&
        (!params.get("status") ||
          params.get("status") === "all" ||
          order.status === params.get("status")),
    );
    const page = Number(params.get("page") || 1);
    return HttpResponse.json({
      items: rows
        .slice((page - 1) * 2, page * 2)
        .map((order) => ({ ...order, version: 1 })),
      page,
      total: rows.length,
      nextPage: page * 2 < rows.length ? page + 1 : null,
    });
  }),
);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  cleanup();
  stores.forEach((store) => store.dispatch(baseApi.util.resetApiState()));
  stores.length = 0;
  calls = [];
  fail = false;
  server.resetHandlers();
});
afterAll(() => server.close());
function start() {
  const store = makeStore(null);
  store.dispatch(workspaceEntered("north"));
  stores.push(store);
  render(
    <Provider store={store}>
      <OperationsQueue />
    </Provider>,
  );
  return { store, user: userEvent.setup() };
}
test("submits combined filters, resets the applied page and retains selection", async () => {
  const { user, store } = start();
  await user.click(
    await screen.findByRole("checkbox", { name: "Select OD-1041" }),
  );
  await user.click(screen.getByRole("button", { name: "Next page" }));
  await screen.findByRole("checkbox", { name: "Select OD-1043" });
  await user.type(
    screen.getByRole("textbox", { name: "Search orders" }),
    " Avery ",
  );
  await user.selectOptions(
    screen.getByRole("combobox", { name: "Order status" }),
    "ready",
  );
  expect(calls).toHaveLength(2);
  expect(
    screen.getByRole("checkbox", { name: "Select OD-1043" }),
  ).toBeVisible();
  await user.click(screen.getByRole("button", { name: "Apply filters" }));
  expect(
    await screen.findByRole("checkbox", { name: "Select OD-1041" }),
  ).toBeChecked();
  expect(screen.getByText("Page 1 · 1 matching orders")).toBeVisible();
  expect(Object.fromEntries(calls.at(-1)!)).toEqual({
    search: "Avery",
    status: "ready",
    page: "1",
  });
  expect(store.getState().selection.selectedIds).toEqual(["OD-1041"]);
  expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
});
test("shows an empty filtered result and recovers when the filter is cleared", async () => {
  const { user } = start();
  await screen.findByRole("checkbox", { name: "Select OD-1041" });
  await user.type(
    screen.getByRole("textbox", { name: "Search orders" }),
    "Nobody",
  );
  await user.click(screen.getByRole("button", { name: "Apply filters" }));
  await screen.findByText(/No orders on this page/);
  expect(
    screen.queryByRole("checkbox", { name: "Select OD-1041" }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  await user.clear(screen.getByRole("textbox", { name: "Search orders" }));
  await user.click(screen.getByRole("button", { name: "Apply filters" }));
  await screen.findByRole("checkbox", { name: "Select OD-1041" });
});
test("does not relabel old rows while a new query is pending", async () => {
  const { user } = start();
  await screen.findByRole("checkbox", { name: "Select OD-1041" });
  let release!: () => void;
  const pending = new Promise<void>((r) => {
    release = r;
  });
  server.use(
    http.get(url, async () => {
      await pending;
      return HttpResponse.json({
        items: [{ ...orders[3], version: 1 }],
        page: 1,
        total: 1,
        nextPage: null,
      });
    }),
  );
  await user.selectOptions(
    screen.getByRole("combobox", { name: "Order status" }),
    "shipped",
  );
  await user.click(screen.getByRole("button", { name: "Apply filters" }));
  expect(screen.getByText("Loading queue…")).toBeVisible();
  expect(
    screen.queryByRole("checkbox", { name: "Select OD-1041" }),
  ).not.toBeInTheDocument();
  release();
  await screen.findByRole("checkbox", { name: "Select OD-1044" });
});
test("keeps an actionable error and retries the same query", async () => {
  fail = true;
  const { user } = start();
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "The queue is unavailable.",
  );
  fail = false;
  await user.click(screen.getByRole("button", { name: "Refresh queue" }));
  await screen.findByRole("checkbox", { name: "Select OD-1041" });
  await waitFor(() =>
    expect(screen.queryByRole("alert")).not.toBeInTheDocument(),
  );
});
