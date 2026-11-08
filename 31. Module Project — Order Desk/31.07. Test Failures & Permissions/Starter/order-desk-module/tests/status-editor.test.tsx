import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { makeStore } from "../src/app/store";
import { baseApi } from "../src/services/baseApi";
import { workspaceEntered } from "../src/features/session/sessionSlice";
import { StatusEditor } from "../src/StatusEditor";
import { orders } from "../src/orders";
import type { ApiOrder } from "../src/services/contracts";
const url = "http://127.0.0.1:5188/api/orders/OD-1041";
const initial: ApiOrder = { ...orders[0], status: "ready", version: 1 };
let requests: unknown[] = [];
const stores: ReturnType<typeof makeStore>[] = [];
const server = setupServer(
  http.patch(url, async ({ request }) => {
    const body = (await request.json()) as {
      status: "ready" | "shipped";
      version: number;
    };
    requests.push(body);
    return HttpResponse.json({
      ...initial,
      status: body.status,
      version: body.version + 1,
    });
  }),
);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  cleanup();
  stores.forEach((store) => store.dispatch(baseApi.util.resetApiState()));
  stores.length = 0;
  requests = [];
  server.resetHandlers();
});
afterAll(() => server.close());
function start(role: "operator" | "viewer" = "operator") {
  const store = makeStore(null);
  store.dispatch(workspaceEntered({ workspace: "north", role }));
  stores.push(store);
  const view = (order: ApiOrder) => (
    <Provider store={store}>
      <StatusEditor order={order} />
    </Provider>
  );
  const rendered = render(view(initial));
  return {
    user: userEvent.setup(),
    rerender: (order: ApiOrder) => rendered.rerender(view(order)),
  };
}
test("requires an explicit reload when a newer order arrives during editing", async () => {
  const { user, rerender } = start();
  rerender({ ...initial, status: "shipped", version: 2 });
  expect(screen.getByRole("combobox")).toHaveValue("ready");
  expect(
    screen.getByRole("button", { name: "Save status" }),
  ).toBeDisabled();
  expect(screen.getByRole("status")).toHaveTextContent(
    "This order changed.",
  );
  await user.click(screen.getByRole("button", { name: "Reload editor" }));
  expect(screen.getByRole("combobox")).toHaveValue("shipped");
  await user.selectOptions(screen.getByRole("combobox"), "ready");
  await user.click(screen.getByRole("button", { name: "Save status" }));
  await screen.findByText("Server accepted the status.");
  expect(requests).toEqual([{ status: "ready", version: 2 }]);
});
test("uses its accepted version for a second save before the detail refetch completes", async () => {
  const { user } = start();
  await user.selectOptions(screen.getByRole("combobox"), "shipped");
  await user.click(screen.getByRole("button", { name: "Save status" }));
  await screen.findByText("Server accepted the status.");
  await user.selectOptions(screen.getByRole("combobox"), "ready");
  await user.click(screen.getByRole("button", { name: "Save status" }));
  await waitFor(() => expect(requests).toHaveLength(2));
  expect(requests).toEqual([
    { status: "shipped", version: 1 },
    { status: "ready", version: 2 },
  ]);
});
test("keeps the user's choice after a validation rejection", async () => {
  server.use(
    http.patch(url, () =>
      HttpResponse.json(
        {
          message: "Payment is still pending.",
          fields: { status: "Wait for payment." },
        },
        { status: 422 },
      ),
    ),
  );
  const { user, rerender } = start();
  await user.selectOptions(screen.getByRole("combobox"), "shipped");
  await user.click(screen.getByRole("button", { name: "Save status" }));
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Wait for payment.",
  );
  rerender({ ...initial });
  expect(screen.getByRole("combobox")).toHaveValue("shipped");
  expect(screen.getByRole("button", { name: "Save status" })).toBeEnabled();
});
test("does not submit fulfillment from a viewer session", async () => {
  const { user } = start("viewer");
  expect(screen.getByRole("combobox")).toBeDisabled();
  await user.click(screen.getByRole("button", { name: "Save status" }));
  expect(requests).toEqual([]);
});
