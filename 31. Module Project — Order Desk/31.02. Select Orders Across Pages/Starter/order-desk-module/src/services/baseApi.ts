import { createApi } from "@reduxjs/toolkit/query/react";
import { sessionBaseQuery } from "./sessionBaseQuery";
export const baseApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: sessionBaseQuery,
  tagTypes: ["Order"],
  endpoints: () => ({}),
});
