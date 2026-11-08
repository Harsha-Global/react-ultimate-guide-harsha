import { afterAll, afterEach, beforeAll, expect, test, vi } from "vitest";
import { waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { makeStore } from "../src/app/store";
import { ordersApi } from "../src/services/ordersApi";
import { baseApi } from "../src/services/baseApi";
import { workspaceEntered } from "../src/features/session/sessionSlice";
import { orders } from "../src/orders";
import type { ApiOrder } from "../src/services/contracts";
const url = "http://127.0.0.1:5188/api";
let row: ApiOrder = { ...orders[0], version: 1 };
let pageRequests = 0,
  detailRequests = 0,
  liveRequests = 0;
const server = setupServer(
  http.get(`${url}/orders`, ({ request }) => {
    if (new URL(request.url).searchParams.has("page")) {
      pageRequests++;
      return HttpResponse.json({
        items: [row],
        page: 1,
        total: 1,
        nextPage: null,
      });
    }
    liveRequests++;
    return HttpResponse.json([row]);
  }),
  http.get(`${url}/orders/:id`, () => {
    detailRequests++;
    return HttpResponse.json(row);
  }),
);
const stores: ReturnType<typeof makeStore>[] = [];
class FakeStream {
  static all: FakeStream[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((event: { data: string }) => void) | null = null;
  onerror: (() => void) | null = null;
  closed = false;
  constructor() {
    FakeStream.all.push(this);
  }
  close() {
    this.closed = true;
  }
}
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  stores.forEach((store) => store.dispatch(baseApi.util.resetApiState()));
  stores.length = 0;
  server.resetHandlers();
  vi.unstubAllGlobals();
  FakeStream.all = [];
  row = { ...orders[0], version: 1 };
  pageRequests = 0;
  detailRequests = 0;
  liveRequests = 0;
});
afterAll(() => server.close());
test("a newer event refreshes active page and detail without refetching its own stream snapshot", async () => {
  vi.stubGlobal("EventSource", FakeStream);
  const store = makeStore(null);
  stores.push(store);
  store.dispatch(
    workspaceEntered({ workspace: "north", role: "operator" }),
  );
  const arg = { search: "", page: 1 };
  const page = store.dispatch(
    ordersApi.endpoints.getOrderPage.initiate(arg),
  );
  const detail = store.dispatch(
    ordersApi.endpoints.getOrder.initiate(row.id),
  );
  await Promise.all([page.unwrap(), detail.unwrap()]);
  const live = store.dispatch(ordersApi.endpoints.getLiveOrders.initiate());
  await live.unwrap();
  await waitFor(() => {
    expect(pageRequests).toBe(2);
    expect(detailRequests).toBe(2);
    expect(
      ordersApi.endpoints.getOrderPage.select(arg)(store.getState()).status,
    ).toBe("fulfilled");
  });
  const stream = FakeStream.all[0];
  stream.onopen?.();
  row = { ...row, status: "shipped", version: 2 };
  stream.onmessage?.({ data: JSON.stringify(row) });
  await waitFor(() => {
    expect(
      ordersApi.endpoints.getOrderPage.select(arg)(store.getState()).data
        ?.items[0].status,
    ).toBe("shipped");
    expect(
      ordersApi.endpoints.getOrder.select(row.id)(store.getState()).data
        ?.version,
    ).toBe(2);
  });
  expect(liveRequests).toBe(1);
  expect(pageRequests).toBe(3);
  expect(detailRequests).toBe(3);
  stream.onmessage?.({ data: JSON.stringify({ ...row, version: 1 }) });
  stream.onmessage?.({ data: JSON.stringify(row) });
  expect(pageRequests).toBe(3);
  expect(detailRequests).toBe(3);
  live.unsubscribe();
  await waitFor(() => expect(stream.closed).toBe(true));
  row = { ...row, status: "ready", version: 3 };
  expect(
    ordersApi.endpoints.getOrderPage.select(arg)(store.getState()).data
      ?.items[0].version,
  ).toBe(2);
  const reopened = store.dispatch(
    ordersApi.endpoints.getLiveOrders.initiate(),
  );
  await reopened.unwrap();
  await waitFor(() =>
    expect(
      ordersApi.endpoints.getOrderPage.select(arg)(store.getState()).data
        ?.items[0].version,
    ).toBe(3),
  );
  expect(
    ordersApi.endpoints.getOrder.select(row.id)(store.getState()).data
      ?.version,
  ).toBe(3);
  page.unsubscribe();
  detail.unsubscribe();
  reopened.unsubscribe();
});
