import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import { waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { makeStore } from "../src/app/store";
import { ordersApi } from "../src/services/ordersApi";
import { orders } from "../src/orders";
const url = "http://127.0.0.1:5188/api";
const record = { ...orders[0], version: 1 };
const server = setupServer(
  http.get(`${url}/orders/:id`, () => HttpResponse.json(record)),
);
const stores: ReturnType<typeof makeStore>[] = [];
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  for (const store of stores) store.dispatch(ordersApi.util.resetApiState());
  stores.length = 0;
});
it("patches the exact detail entry immediately and restores it after rejection", async () => {
  const store = makeStore(null);
  stores.push(store);
  const detail = store.dispatch(
    ordersApi.endpoints.getOrder.initiate(record.id),
  );
  await detail.unwrap();
  let release!: () => void;
  const pending = new Promise<void>((r) => (release = r));
  server.use(
    http.patch(`${url}/orders/:id`, async () => {
      await pending;
      return HttpResponse.json({ message: "Not accepted." }, { status: 422 });
    }),
  );
  const change = store.dispatch(
    ordersApi.endpoints.updateOrder.initiate({
      id: record.id,
      status: "shipped",
      version: 1,
    }),
  );
  const optimistic = ordersApi.endpoints.getOrder.select(record.id)(
    store.getState(),
  ).data?.status;
  release();
  await change;
  await waitFor(() =>
    expect(
      ordersApi.endpoints.getOrder.select(record.id)(store.getState()).data
        ?.status,
    ).toBe("ready"),
  );
  expect(optimistic).toBe("shipped");
  expect(record.status).toBe("ready");
  detail.unsubscribe();
});
it("does not manufacture a missing detail cache entry", async () => {
  const store = makeStore(null);
  stores.push(store);
  server.use(
    http.patch(`${url}/orders/:id`, () =>
      HttpResponse.json({ ...record, status: "shipped", version: 2 }),
    ),
  );
  await store.dispatch(
    ordersApi.endpoints.updateOrder.initiate({
      id: record.id,
      status: "shipped",
      version: 1,
    }),
  );
  expect(
    ordersApi.endpoints.getOrder.select(record.id)(store.getState()).data,
  ).toBeUndefined();
});
