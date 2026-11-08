import { afterAll, afterEach, beforeAll, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { makeStore } from "../src/app/store";
import { ordersApi } from "../src/services/ordersApi";
import { baseApi } from "../src/services/baseApi";
import { orders } from "../src/orders";
import {
  workspaceEntered,
  sessionBoundary,
} from "../src/features/session/sessionSlice";
import { orderToggled } from "../src/features/selection/selectionSlice";
import { taskAdded } from "../src/features/checklist/checklistSlice";
import { densityChanged } from "../src/features/preferences/preferencesSlice";
import { OrderQueue } from "../src/OrderQueue";
import { StatusEditor } from "../src/StatusEditor";
import type { ApiOrder } from "../src/services/contracts";
const url = "http://127.0.0.1:5188/api";
let rows: ApiOrder[] = [],
  listRequests = 0,
  detailRequests = 0;
const server = setupServer(
  http.get(`${url}/orders`, ({ request }) => {
    listRequests++;
    const params = new URL(request.url).searchParams;
    const search = params.get("search") || "";
    const matches = rows.filter((o) => o.customer.includes(search));
    if (params.has("page")) {
      const page = Number(params.get("page"));
      return HttpResponse.json({
        items: matches.slice((page - 1) * 2, page * 2),
        page,
        total: matches.length,
        nextPage: page * 2 < matches.length ? page + 1 : null,
      });
    }
    return HttpResponse.json(matches);
  }),
  http.get(`${url}/orders/:id`, ({ params }) => {
    detailRequests++;
    return HttpResponse.json(rows.find((o) => o.id === params.id));
  }),
  http.patch(`${url}/orders/:id`, async ({ params, request }) => {
    const body = (await request.json()) as {
      status: ApiOrder["status"];
      version: number;
    };
    const order = rows.find((o) => o.id === params.id)!;
    if (order.status === "payment-pending")
      return HttpResponse.json(
        {
          message: "Payment must be confirmed.",
          fields: { status: "Waiting for payment." },
        },
        { status: 422 },
      );
    if (body.version !== order.version)
      return HttpResponse.json(
        { message: "Order changed." },
        { status: 409 },
      );
    order.status = body.status;
    order.version++;
    return HttpResponse.json(order);
  }),
);
const stores: ReturnType<typeof makeStore>[] = [];
function fresh() {
  const store = makeStore(null);
  store.dispatch(
    workspaceEntered({ workspace: "north", role: "operator" }),
  );
  stores.push(store);
  return store;
}
function gate<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => (resolve = r));
  return { promise, resolve };
}
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  cleanup();
  for (const store of stores) store.dispatch(baseApi.util.resetApiState());
  stores.length = 0;
  server.resetHandlers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
afterAll(() => server.close());
// Each test resets its records through this explicit helper.
function reset() {
  rows = orders.map((o) => ({ ...o, version: 1 }));
  listRequests = 0;
  detailRequests = 0;
  return fresh();
}
it("shares an identical endpoint and argument, while a different search owns another cache entry", async () => {
  const store = reset();
  const first = store.dispatch(ordersApi.endpoints.getOrders.initiate(""));
  await first.unwrap();
  const same = store.dispatch(ordersApi.endpoints.getOrders.initiate(""));
  await same.unwrap();
  expect(listRequests).toBe(1);
  const other = store.dispatch(
    ordersApi.endpoints.getOrders.initiate("Avery"),
  );
  expect(await other.unwrap()).toHaveLength(1);
  expect(listRequests).toBe(2);
  expect(
    ordersApi.endpoints.getOrders.select("")(store.getState()).data,
  ).toHaveLength(5);
  first.unsubscribe();
  same.unsubscribe();
  other.unsubscribe();
});
it("invalidates both the entity detail and all subscribed collection results after a mutation", async () => {
  const store = reset();
  const all = store.dispatch(ordersApi.endpoints.getOrders.initiate(""));
  const empty = store.dispatch(
    ordersApi.endpoints.getOrders.initiate("Nobody"),
  );
  const detail = store.dispatch(
    ordersApi.endpoints.getOrder.initiate("OD-1041"),
  );
  await Promise.all([all.unwrap(), empty.unwrap(), detail.unwrap()]);
  await store
    .dispatch(
      ordersApi.endpoints.updateOrder.initiate({
        id: "OD-1041",
        status: "shipped",
        version: 1,
      }),
    )
    .unwrap();
  await waitFor(() => {
    expect(listRequests).toBe(4);
    expect(detailRequests).toBe(2);
    expect(
      ordersApi.endpoints.getOrder.select("OD-1041")(store.getState()).data
        ?.version,
    ).toBe(2);
  });
  all.unsubscribe();
  empty.unsubscribe();
  detail.unsubscribe();
});
it("renders the server's business rejection and preserves the selected form value", async () => {
  const store = reset();
  const user = userEvent.setup();
  render(
    <Provider store={store}>
      <StatusEditor order={rows[1]} />
    </Provider>,
  );
  await user.selectOptions(
    screen.getByRole("combobox", { name: "Fulfillment status" }),
    "shipped",
  );
  await user.click(screen.getByRole("button", { name: "Save status" }));
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Waiting for payment.",
  );
  expect(screen.getByRole("combobox")).toHaveValue("shipped");
  expect(rows[1].status).toBe("payment-pending");
});
it("clears private query, selection and task state at a boundary while retaining the layout preference", async () => {
  const store = reset();
  await store.dispatch(ordersApi.endpoints.getOrders.initiate("")).unwrap();
  store.dispatch(orderToggled("OD-1041"));
  store.dispatch(
    taskAdded({
      id: "private",
      text: "North customer request",
      done: false,
    }),
  );
  store.dispatch(densityChanged("compact"));
  store.dispatch(sessionBoundary());
  expect(
    ordersApi.endpoints.getOrders.select("")(store.getState())
      .isUninitialized,
  ).toBe(true);
  expect(store.getState().selection.selectedIds).toEqual([]);
  expect(store.getState().checklist.entities.private).toBeUndefined();
  expect(store.getState().preferences.density).toBe("compact");
  expect(store.getState().session.workspace).toBeNull();
});
it("ignores an old unauthorized response after a newer workspace has opened", async () => {
  const store = reset();
  const release = gate<void>();
  const entered = gate<void>();
  server.use(
    http.get(`${url}/orders`, async () => {
      entered.resolve();
      await release.promise;
      return HttpResponse.json(
        { message: "Expired old session." },
        { status: 401 },
      );
    }),
  );
  const old = store.dispatch(ordersApi.endpoints.getOrders.initiate(""));
  await entered.promise;
  store.dispatch(sessionBoundary());
  store.dispatch(
    workspaceEntered({ workspace: "south", role: "operator" }),
  );
  release.resolve();
  await old;
  expect(store.getState().session.workspace).toBe("south");
  expect(
    ordersApi.endpoints.getOrders.select("")(store.getState()).data,
  ).toBeUndefined();
});
it("uses the current unauthorized response to close the workspace", async () => {
  const store = reset();
  server.use(
    http.get(`${url}/orders`, () =>
      HttpResponse.json({ message: "Expired." }, { status: 401 }),
    ),
  );
  await store.dispatch(ordersApi.endpoints.getOrders.initiate(""));
  expect(store.getState().session.workspace).toBeNull();
  expect(store.getState().ordersApi.queries).toEqual({});
});
it("shows an optimistic status before the response, then undoes a rejected isolated update", async () => {
  const store = reset();
  const detail = store.dispatch(
    ordersApi.endpoints.getOrder.initiate("OD-1041"),
  );
  await detail.unwrap();
  const release = gate<void>();
  server.use(
    http.patch(`${url}/orders/:id`, async () => {
      await release.promise;
      return HttpResponse.json({ message: "Rejected." }, { status: 422 });
    }),
  );
  const change = store.dispatch(
    ordersApi.endpoints.updateOrder.initiate({
      id: "OD-1041",
      status: "shipped",
      version: 1,
    }),
  );
  expect(
    ordersApi.endpoints.getOrder.select("OD-1041")(store.getState()).data
      ?.status,
  ).toBe("shipped");
  release.resolve();
  await change;
  await waitFor(() =>
    expect(
      ordersApi.endpoints.getOrder.select("OD-1041")(store.getState()).data
        ?.status,
    ).toBe("ready"),
  );
  detail.unsubscribe();
});
it("reconciles overlapping changes with the server without undoing a newer accepted value", async () => {
  const store = reset();
  const detail = store.dispatch(
    ordersApi.endpoints.getOrder.initiate("OD-1041"),
  );
  await detail.unwrap();
  const first = gate<void>();
  const second = gate<void>();
  let calls = 0;
  server.use(
    http.patch(`${url}/orders/:id`, async () => {
      const call = ++calls;
      if (call === 1) {
        await first.promise;
        return HttpResponse.json({ message: "Conflict." }, { status: 409 });
      }
      await second.promise;
      rows[0] = { ...rows[0], status: "shipped", version: 2 };
      return HttpResponse.json(rows[0]);
    }),
  );
  const a = store.dispatch(
    ordersApi.endpoints.updateOrder.initiate({
      id: "OD-1041",
      status: "ready",
      version: 1,
    }),
  );
  const b = store.dispatch(
    ordersApi.endpoints.updateOrder.initiate({
      id: "OD-1041",
      status: "shipped",
      version: 1,
    }),
  );
  await waitFor(() => expect(calls).toBe(2));
  first.resolve();
  await a;
  expect(
    ordersApi.endpoints.getOrder.select("OD-1041")(store.getState()).data
      ?.status,
  ).toBe("shipped");
  second.resolve();
  await b;
  await waitFor(() =>
    expect(
      ordersApi.endpoints.getOrder.select("OD-1041")(store.getState()).data
        ?.version,
    ).toBe(2),
  );
  expect(
    ordersApi.endpoints.getOrder.select("OD-1041")(store.getState()).data
      ?.status,
  ).toBe("shipped");
  detail.unsubscribe();
});
it("accumulates infinite pages under one search argument and stops at the returned boundary", async () => {
  const store = reset();
  const subscription = store.dispatch(
    ordersApi.endpoints.getOrderFeed.initiate(""),
  );
  await subscription.unwrap();
  await store
    .dispatch(
      ordersApi.endpoints.getOrderFeed.initiate("", {
        direction: "forward",
      }),
    )
    .unwrap();
  await store
    .dispatch(
      ordersApi.endpoints.getOrderFeed.initiate("", {
        direction: "forward",
      }),
    )
    .unwrap();
  const result = ordersApi.endpoints.getOrderFeed.select("")(
    store.getState(),
  ).data!;
  expect(result.pageParams).toEqual([1, 2, 3]);
  expect(result.pages.flatMap((p) => p.items).map((o) => o.id)).toEqual(
    rows.map((o) => o.id),
  );
  expect(result.pages.at(-1)?.nextPage).toBeNull();
  expect(listRequests).toBe(3);
  subscription.unsubscribe();
});
it("keeps current rows during a failed background refetch, then recovers on retry", async () => {
  const store = reset();
  const user = userEvent.setup();
  render(
    <Provider store={store}>
      <OrderQueue />
    </Provider>,
  );
  await screen.findByRole("checkbox", { name: "Select OD-1041" });
  server.use(
    http.get(`${url}/orders`, () =>
      HttpResponse.json({ message: "Temporary outage." }, { status: 503 }),
    ),
  );
  await user.click(screen.getByRole("button", { name: "Refresh queue" }));
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Temporary outage.",
  );
  expect(
    screen.getByRole("checkbox", { name: "Select OD-1041" }),
  ).toBeInTheDocument();
  server.resetHandlers();
  await user.click(screen.getByRole("button", { name: "Refresh queue" }));
  await waitFor(() =>
    expect(screen.queryByRole("alert")).not.toBeInTheDocument(),
  );
});
it("rejects a response that does not satisfy the runtime order contract", async () => {
  const store = reset();
  vi.spyOn(console, "error").mockImplementation(() => {});
  server.use(
    http.get(`${url}/orders`, () =>
      HttpResponse.json([{ id: "missing-fields" }]),
    ),
  );
  await expect(
    store.dispatch(ordersApi.endpoints.getOrders.initiate("")).unwrap(),
  ).rejects.toMatchObject({ message: "Unexpected queue response." });
  expect(
    ordersApi.endpoints.getOrders.select("")(store.getState()).data,
  ).toBeUndefined();
});
it("applies only newer valid stream events and closes the connection after cache removal", async () => {
  const store = reset();
  const connections: FakeStream[] = [];
  class FakeStream {
    onopen: (() => void) | null = null;
    onmessage: ((event: { data: string }) => void) | null = null;
    onerror: (() => void) | null = null;
    closed = false;
    url: string;
    constructor(url: string) {
      this.url = url;
      connections.push(this);
    }
    close() {
      this.closed = true;
    }
  }
  vi.stubGlobal("EventSource", FakeStream);
  const sub = store.dispatch(ordersApi.endpoints.getLiveOrders.initiate());
  await sub.unwrap();
  await waitFor(() => expect(connections).toHaveLength(1));
  const stream = connections[0];
  stream.onopen?.();
  stream.onmessage?.({
    data: JSON.stringify({ ...rows[0], status: "shipped", version: 2 }),
  });
  stream.onmessage?.({
    data: JSON.stringify({ ...rows[0], status: "ready", version: 1 }),
  });
  stream.onmessage?.({ data: "bad-json" });
  const live = ordersApi.endpoints.getLiveOrders.select()(
    store.getState(),
  ).data!;
  expect(live.connection).toBe("live");
  expect(live.items[0].status).toBe("shipped");
  expect(live.items[0].version).toBe(2);
  // A collection invalidation may finish while this stream is still open.
  // The HTTP snapshot below is older than the event already applied above.
  await sub.refetch().unwrap();
  const refreshed = ordersApi.endpoints.getLiveOrders.select()(
    store.getState(),
  ).data!;
  expect(refreshed.connection).toBe("live");
  expect(refreshed.items[0].status).toBe("shipped");
  expect(refreshed.items[0].version).toBe(2);
  expect(connections).toHaveLength(1);
  rows[0] = { ...rows[0], status: "ready", version: 3 };
  await sub.refetch().unwrap();
  expect(
    ordersApi.endpoints.getLiveOrders.select()(store.getState()).data
      ?.items[0],
  ).toMatchObject({ status: "ready", version: 3 });
  expect(stream.closed).toBe(false);
  sub.unsubscribe();
  await waitFor(() => expect(stream.closed).toBe(true));
  const reopened = store.dispatch(
    ordersApi.endpoints.getLiveOrders.initiate(),
  );
  await reopened.unwrap();
  await waitFor(() => expect(connections).toHaveLength(2));
  connections[1].onopen?.();
  connections[1].onerror?.();
  await reopened.refetch().unwrap();
  expect(
    ordersApi.endpoints.getLiveOrders.select()(store.getState()).data
      ?.connection,
  ).toBe("closed");
  reopened.unsubscribe();
});
it("extends the original API instance instead of installing a competing cache", () => {
  expect(ordersApi).toBe(baseApi);
});

it("never undoes a detail response from a newer server version", async () => {
  const store = reset();
  const detail = store.dispatch(
    ordersApi.endpoints.getOrder.initiate("OD-1041"),
  );
  await detail.unwrap();
  const release = gate<void>();
  server.use(
    http.patch(`${url}/orders/:id`, async () => {
      await release.promise;
      return HttpResponse.json({ message: "Conflict." }, { status: 409 });
    }),
  );
  const request = store.dispatch(
    ordersApi.endpoints.updateOrder.initiate({
      id: "OD-1041",
      status: "shipped",
      version: 1,
    }),
  );
  rows[0] = { ...rows[0], status: "shipped", version: 2 };
  store.dispatch(
    ordersApi.util.updateQueryData("getOrder", "OD-1041", (draft) => {
      Object.assign(draft, rows[0]);
    }),
  );
  const observed: string[] = [];
  const stop = store.subscribe(() => {
    const current = ordersApi.endpoints.getOrder.select("OD-1041")(
      store.getState(),
    ).data;
    if (current?.version === 2) observed.push(current.status);
  });
  release.resolve();
  await request;
  await waitFor(() => expect(detailRequests).toBe(2));
  expect(observed).not.toContain("ready");
  stop();
  detail.unsubscribe();
});
it("never rolls an earlier workspace patch into a new workspace's matching ID", async () => {
  const store = reset();
  rows[0].status = "shipped";
  const oldDetail = store.dispatch(
    ordersApi.endpoints.getOrder.initiate("OD-1041"),
  );
  await oldDetail.unwrap();
  const release = gate<void>();
  const entered = gate<void>();
  server.use(
    http.patch(`${url}/orders/:id`, async () => {
      entered.resolve();
      await release.promise;
      return HttpResponse.json(
        { message: "Old rejection." },
        { status: 422 },
      );
    }),
  );
  const change = store.dispatch(
    ordersApi.endpoints.updateOrder.initiate({
      id: "OD-1041",
      status: "ready",
      version: 1,
    }),
  );
  await entered.promise;
  store.dispatch(sessionBoundary());
  store.dispatch(
    workspaceEntered({ workspace: "south", role: "operator" }),
  );
  rows[0] = {
    ...rows[0],
    customer: "South Avery Miller",
    status: "ready",
    version: 1,
  };
  const newDetail = store.dispatch(
    ordersApi.endpoints.getOrder.initiate("OD-1041"),
  );
  await newDetail.unwrap();
  const observed: string[] = [];
  const stop = store.subscribe(() => {
    const current = ordersApi.endpoints.getOrder.select("OD-1041")(
      store.getState(),
    ).data;
    if (current) observed.push(current.status);
  });
  release.resolve();
  await change;
  expect(store.getState().session.workspace).toBe("south");
  expect(observed).not.toContain("shipped");
  expect(
    ordersApi.endpoints.getOrder.select("OD-1041")(store.getState()).data
      ?.customer,
  ).toBe("South Avery Miller");
  stop();
  oldDetail.unsubscribe();
  newDetail.unsubscribe();
});
