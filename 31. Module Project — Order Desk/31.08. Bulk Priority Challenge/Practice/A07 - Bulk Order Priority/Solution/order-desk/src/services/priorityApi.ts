import { readPriorityResults } from "./priorityContracts";
import type { PriorityRequest, PriorityResult } from "./priorityContracts";
import { baseApi } from "./baseApi";
import { readOrders } from "./contracts";
import type { ApiOrder } from "./contracts";
export const priorityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updatePriorities: build.mutation<PriorityResult[], PriorityRequest>({
      query: (body) => ({ url: "order-priorities", method: "POST", body }),
      transformResponse: (value, _meta, request) =>
        readPriorityResults(value, request),
      invalidatesTags: (_result, _error, request) => [
        { type: "Order", id: "LIST" },
        ...request.items.map((item) => ({
          type: "Order" as const,
          id: item.id,
        })),
      ],
    }),
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
export const {
  useLazyGetSelectedOrdersQuery,
  useUpdatePrioritiesMutation,
} = priorityApi;
