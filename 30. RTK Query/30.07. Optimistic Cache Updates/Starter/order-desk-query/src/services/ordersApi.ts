import { createApi } from "@reduxjs/toolkit/query/react";
import { sessionBaseQuery } from "./sessionBaseQuery";
import { readOrders, readOrder, readPage } from "./contracts";
import type { ApiOrder, OrderPage } from "./contracts";
export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: sessionBaseQuery,
  tagTypes: ["Order"],
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
    getOrder: build.query<ApiOrder, string>({
      query: (id) => `orders/${encodeURIComponent(id)}`,
      transformResponse: readOrder,
      providesTags: (_, __, id) => [{ type: "Order", id }],
    }),
  }),
});
export const { useGetOrdersQuery, useGetOrderQuery, useUpdateOrderMutation, useGetOrderPageQuery, useGetOrderFeedInfiniteQuery } = ordersApi;
