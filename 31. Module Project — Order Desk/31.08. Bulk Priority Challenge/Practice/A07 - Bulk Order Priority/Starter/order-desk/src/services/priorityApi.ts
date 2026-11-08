import { baseApi } from "./baseApi";
import { readOrders } from "./contracts";
import type { ApiOrder } from "./contracts";
export const priorityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSelectedOrders: build.query<ApiOrder[], string[]>({
      query: (ids) => ({
        url: "orders/selected",
        method: "POST",
        body: { ids },
      }),
      transformResponse: readOrders,
      keepUnusedDataFor: 0,
    }),
  }),
});
export const { useLazyGetSelectedOrdersQuery } = priorityApi;
