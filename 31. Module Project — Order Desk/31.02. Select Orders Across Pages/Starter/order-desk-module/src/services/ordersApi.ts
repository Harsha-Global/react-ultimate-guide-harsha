import type { RootState } from "../app/store";
import { beginMutation } from "./mutationGroups";
import { baseApi } from "./baseApi";
import { readOrders, readOrder, readPage, isOrder } from "./contracts";
import type { ApiOrder, OrderPage, LiveOrders } from "./contracts";
export const ordersApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getOrders: build.query<ApiOrder[], string>({
      query: (search) => ({ url: "orders", params: { search } }),
      transformResponse: readOrders,
      providesTags: (result) => [
        { type: "Order", id: "LIST" },
        ...(result ?? []).map((o) => ({ type: "Order" as const, id: o.id })),
      ],
    }),
    updateOrder: build.mutation<ApiOrder, { id: string; status: "ready" | "shipped"; version: number }>({
      query: ({ id, ...body }) => ({
        url: `orders/${encodeURIComponent(id)}`,
        method: "PATCH",
        body,
      }),
      transformResponse: readOrder,
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }): Promise<void> {
        const epoch = (getState() as RootState).session.epoch;
        const active = beginMutation(dispatch, arg.id);
        const patch = dispatch(ordersApi.util.updateQueryData("getOrder", arg.id, (draft: ApiOrder) => {
          draft.status = arg.status;
        }));
        try {
          await queryFulfilled;
        } catch {
          const state = getState() as RootState;
          const current = ordersApi.endpoints.getOrder.select(arg.id)(state).data;
          const sameSession = state.session.epoch === epoch;
          if (
            sameSession &&
            !active.group.overlapped &&
            current?.version === arg.version &&
            current.status === arg.status
          )
            patch.undo();
          // Otherwise, the existing invalidatesTags callback refreshes authoritative data.
        } finally {
          active.finish();
        }
      },
      invalidatesTags: (_, __, arg) => [
        { type: "Order", id: arg.id },
        { type: "Order", id: "LIST" },
      ],
    }),
    getOrderPage: build.query<OrderPage, { search: string; page: number }>({
      query: (arg) => ({ url: "orders", params: arg }),
      transformResponse: readPage,
      providesTags: (result) => [
        { type: "Order", id: "LIST" },
        ...(result?.items ?? []).map((o) => ({ type: "Order" as const, id: o.id })),
      ],
    }),
    getOrderFeed: build.infiniteQuery<OrderPage, string, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (last) => last.nextPage ?? undefined,
      },
      query: ({ queryArg, pageParam }) => ({
        url: "orders",
        params: { search: queryArg, page: pageParam },
      }),
      transformResponse: readPage,
      providesTags: (result) => [
        { type: "Order", id: "LIST" },
        ...(result?.pages.flatMap((p) => p.items) ?? []).map((o) => ({ type: "Order" as const, id: o.id })),
      ],
    }),
    getLiveOrders: build.query<LiveOrders, void>({
      query: () => "orders",
      transformResponse: (value) => ({
        items: readOrders(value),
        connection: "connecting",
      }),
      // Refetches share this cache entry with the existing event connection.
      merge(current, incoming) {
        const byId = new Map(current.items.map((order) => [order.id, order]));
        current.items = incoming.items.map((order) => {
          const previous = byId.get(order.id);
          return previous && previous.version > order.version ? previous : order;
        });
        // Only the connection callbacks change its status.
      },
      keepUnusedDataFor: 0,
      providesTags: [{ type: "Order", id: "LIST" }],
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }): Promise<void> {
        let stream: EventSource | undefined;
        try {
          await cacheDataLoaded;
          if (typeof EventSource !== "undefined") {
            stream = new EventSource("http://127.0.0.1:5188/api/order-events");
            stream.onopen = () => updateCachedData((draft) => {
              draft.connection = "live";
            });
            stream.onmessage = (event) => {
              try {
                const value: unknown = JSON.parse(event.data);
                if (isOrder(value))
                  updateCachedData((draft) => {
                    const index = draft.items.findIndex((o) => o.id === value.id);
                    if (index >= 0 && value.version > draft.items[index].version)
                      draft.items[index] = value;
                  });
              } catch {
                /* Ignore malformed stream messages. */
              }
            };
            stream.onerror = () => {
              stream?.close();
              updateCachedData((draft) => {
                draft.connection = "closed";
              });
            };
          }
          await cacheEntryRemoved;
        } catch {
          /* The cache entry can disappear before its first response. */
        } finally {
          stream?.close();
        }
      },
    }),
    getOrder: build.query<ApiOrder, string>({
      query: (id) => `orders/${encodeURIComponent(id)}`,
      transformResponse: readOrder,
      providesTags: (_, __, id) => [{ type: "Order", id }],
    }),
  }),
});
export const { useGetOrdersQuery, useGetOrderQuery, useUpdateOrderMutation, useGetOrderPageQuery, useGetOrderFeedInfiniteQuery, useGetLiveOrdersQuery } = ordersApi;
