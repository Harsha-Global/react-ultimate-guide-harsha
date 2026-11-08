import { baseApi } from "./baseApi";
import { readOrders } from "./contracts";
import type { ApiOrder } from "./contracts";
export const readinessApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getReadyOrders: build.query<ApiOrder[], void>({
      query: () => ({ url: "orders", params: { status: "ready" } }),
      transformResponse: readOrders,
      providesTags: [{ type: "Order", id: "LIST" }],
    }),
  }),
});
export const { useGetReadyOrdersQuery } = readinessApi;
