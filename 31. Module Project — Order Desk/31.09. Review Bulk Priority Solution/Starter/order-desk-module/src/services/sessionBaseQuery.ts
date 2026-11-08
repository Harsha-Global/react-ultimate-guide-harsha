import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { sessionBoundary } from "../features/session/sessionSlice";
const raw = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:5188/api/",
  credentials: "same-origin",
});
export const sessionBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extra) => {
  const before = (api.getState() as { session: { epoch: number } }).session.epoch;
  const result = await raw(args, api, extra);
  const current = (api.getState() as { session: { epoch: number } }).session.epoch;
  if (before !== current)
    return {
      error: {
        status: "CUSTOM_ERROR",
        error: "Discarded response from an earlier session.",
      },
    };
  if (result.error?.status === 401) api.dispatch(sessionBoundary());
  return result;
};
