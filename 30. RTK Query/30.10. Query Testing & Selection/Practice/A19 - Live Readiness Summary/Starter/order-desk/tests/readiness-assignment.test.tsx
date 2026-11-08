import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { App } from "../src/App";
import { makeStore } from "../src/app/store";
import { ordersApi } from "../src/services/ordersApi";
import { orders } from "../src/orders";
import { workspaceEntered, sessionBoundary } from "../src/features/session/sessionSlice";
const url = "http://127.0.0.1:5188/api";
let rows = orders.map((o) => ({ ...o, version: 1 }));
let readyRequests = 0;
const server = setupServer(
  http.get(`${url}/orders`, ({ request }) => {
    const ready = new URL(request.url).searchParams.get("status") === "ready";
    if (ready) readyRequests++;
    return HttpResponse.json(
      ready ? rows.filter((o) => o.status === "ready") : rows,
    );
  }),
);
const stores: ReturnType<typeof makeStore>[] = [];
function mount() {
  rows = orders.map((o) => ({ ...o, version: 1 }));
  readyRequests = 0;
  const store = makeStore(null);
  stores.push(store);
  store.dispatch(workspaceEntered("north"));
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  return store;
}
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => {
  cleanup();
  server.resetHandlers();
  for (const s of stores) s.dispatch(ordersApi.util.resetApiState());
  stores.length = 0;
});
it("requests the ready resource and shows its count", async () => {
  mount();
  expect(await screen.findByText("3 orders ready to pack")).toBeInTheDocument();
  expect(readyRequests).toBe(1);
});
it("reacts to collection invalidation without a second copy of order state", async () => {
  const store = mount();
  await screen.findByText("3 orders ready to pack");
  rows[0].status = "shipped";
  store.dispatch(
    ordersApi.util.invalidateTags([{ type: "Order", id: "LIST" }]),
  );
  expect(await screen.findByText("2 orders ready to pack")).toBeInTheDocument();
  expect(readyRequests).toBe(2);
});
it("renders a legitimate zero after all ready records leave the resource", async () => {
  const store = mount();
  await screen.findByText("3 orders ready to pack");
  rows = rows.map((o) => ({ ...o, status: "shipped" }));
  store.dispatch(
    ordersApi.util.invalidateTags([{ type: "Order", id: "LIST" }]),
  );
  expect(await screen.findByText("0 orders ready to pack")).toBeInTheDocument();
});
it("preserves the last count during an outage and recovers when refreshed", async () => {
  mount();
  const user = userEvent.setup();
  await screen.findByText("3 orders ready to pack");
  server.use(
    http.get(`${url}/orders`, () =>
      HttpResponse.json(
        { message: "Readiness service unavailable." },
        { status: 503 },
      ),
    ),
  );
  await user.click(screen.getByRole("button", { name: "Refresh readiness" }));
  expect(
    await screen.findByText("Readiness service unavailable."),
  ).toBeInTheDocument();
  expect(screen.getByText("3 orders ready to pack")).toBeInTheDocument();
  server.resetHandlers();
  await user.click(screen.getByRole("button", { name: "Refresh readiness" }));
  await waitFor(() =>
    expect(
      screen.queryByText("Readiness service unavailable."),
    ).not.toBeInTheDocument(),
  );
});
it("hides the private count and clears its cache at sign-out", async () => {
  const store = mount();
  await screen.findByText("3 orders ready to pack");
  store.dispatch(sessionBoundary());
  await waitFor(() =>
    expect(
      screen.queryByRole("region", { name: "Packing readiness" }),
    ).not.toBeInTheDocument(),
  );
  expect(store.getState().ordersApi.queries).toEqual({});
});
