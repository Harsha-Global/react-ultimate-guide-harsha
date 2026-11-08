import { createApi } from "@reduxjs/toolkit/query/react";
import { sessionBaseQuery } from "./sessionBaseQuery";
import { readOrders, readOrder } from "./contracts";
import type { ApiOrder } from "./contracts";
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
    getOrder: build.query<ApiOrder, string>({
      query: (id) => `orders/${encodeURIComponent(id)}`,
      transformResponse: readOrder,
      providesTags: (_, __, id) => [{ type: "Order", id }],
    }),
  }),
});
export const { useGetOrdersQuery, useGetOrderQuery, useUpdateOrderMutation } = ordersApi;
