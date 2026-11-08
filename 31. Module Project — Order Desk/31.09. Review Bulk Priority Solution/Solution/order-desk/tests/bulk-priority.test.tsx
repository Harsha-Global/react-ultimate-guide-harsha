import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { makeStore } from "../src/app/store";
import { baseApi } from "../src/services/baseApi";
import { orders } from "../src/orders";
import { BulkPriority } from "../src/BulkPriority";
import { workspaceEntered } from "../src/features/session/sessionSlice";
import { orderToggled } from "../src/features/selection/selectionSlice";
const url = "http://127.0.0.1:5188/api";
const rows = orders.map((row) => ({ ...row, version: 1 }));
const stores: ReturnType<typeof makeStore>[] = [];
const server = setupServer(
  http.post(`${url}/orders/selected`, async ({ request }) => {
    const { ids } = (await request.json()) as { ids: string[] };
    return HttpResponse.json(
      ids.map((id) => rows.find((row) => row.id === id)),
    );
  }),
);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  cleanup();
  stores.forEach((store) => store.dispatch(baseApi.util.resetApiState()));
  stores.length = 0;
  server.resetHandlers();
});
afterAll(() => server.close());
function start() {
  const store = makeStore(null);
  store.dispatch(
    workspaceEntered({ workspace: "north", role: "operator" }),
  );
  store.dispatch(orderToggled("OD-1041"));
  store.dispatch(orderToggled("OD-1042"));
  stores.push(store);
  render(
    <Provider store={store}>
      <BulkPriority />
    </Provider>,
  );
  return { store, user: userEvent.setup() };
}
test("reviews selected records, including IDs outside the current page", async () => {
  const { user } = start();
  await user.click(
    screen.getByRole("button", { name: "Review selected priorities" }),
  );
  expect(
    await screen.findByText("OD-1041: normal · version 1"),
  ).toBeVisible();
  expect(screen.getByText("OD-1042: normal · version 1")).toBeVisible();
});
test("submits reviewed versions, removes accepted IDs and retains rejected or newly selected IDs", async () => {
  let release!: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  let submitted: unknown;
  server.use(
    http.post(`${url}/order-priorities`, async ({ request }) => {
      submitted = await request.json();
      await pending;
      return HttpResponse.json({
        results: [
          {
            id: "OD-1041",
            ok: true,
            order: { ...rows[0], priority: "high", version: 2 },
          },
          {
            id: "OD-1042",
            ok: false,
            code: 422,
            message: "Only ready orders may change priority.",
          },
        ],
      });
    }),
  );
  const { user, store } = start();
  await user.click(
    screen.getByRole("button", { name: "Review selected priorities" }),
  );
  await screen.findByText("OD-1041: normal · version 1");
  await user.click(
    screen.getByRole("button", { name: "Apply high priority" }),
  );
  await waitFor(() => expect(submitted).toBeDefined());
  store.dispatch(orderToggled("OD-1043"));
  release();
  expect(await screen.findByText(/1 accepted; 1 rejected/)).toBeVisible();
  expect(submitted).toEqual({
    priority: "high",
    items: [
      { id: "OD-1041", version: 1 },
      { id: "OD-1042", version: 1 },
    ],
  });
  expect(store.getState().selection.selectedIds).toEqual([
    "OD-1042",
    "OD-1043",
  ]);
});
test("keeps all selected IDs when the entire request fails", async () => {
  server.use(
    http.post(`${url}/order-priorities`, () =>
      HttpResponse.json(
        { message: "Priority service unavailable." },
        { status: 503 },
      ),
    ),
  );
  const { user, store } = start();
  await user.click(
    screen.getByRole("button", { name: "Review selected priorities" }),
  );
  await screen.findByText("OD-1041: normal · version 1");
  await user.click(
    screen.getByRole("button", { name: "Apply high priority" }),
  );
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Priority service unavailable.",
  );
  expect(store.getState().selection.selectedIds).toEqual([
    "OD-1041",
    "OD-1042",
  ]);
});
