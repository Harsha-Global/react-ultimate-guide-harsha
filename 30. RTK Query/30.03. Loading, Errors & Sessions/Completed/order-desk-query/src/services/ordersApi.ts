import { createApi } from "@reduxjs/toolkit/query/react";
import { sessionBaseQuery } from "./sessionBaseQuery";
import { readOrders } from "./contracts";
import type { ApiOrder } from "./contracts";
export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: sessionBaseQuery,
  endpoints: (build) => ({
    getOrders: build.query<ApiOrder[], string>({
      query: (search) => ({ url: "orders", params: { search } }),
      transformResponse: readOrders,
    }),
  }),
});
export const { useGetOrdersQuery } = ordersApi;
