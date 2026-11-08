import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { readOrders } from "./contracts";
import type { ApiOrder } from "./contracts";
export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5188/api/",
    credentials: "same-origin",
  }),
  endpoints: (build) => ({
    getOrders: build.query<ApiOrder[], string>({
      query: (search) => ({ url: "orders", params: { search } }),
      transformResponse: readOrders,
    }),
  }),
});
export const { useGetOrdersQuery } = ordersApi;
