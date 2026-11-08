import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./api.ts";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 120_000,
      retry: (failureCount, error) =>
        failureCount < 1 &&
        (error instanceof TypeError ||
          (error instanceof ApiError && error.status >= 500)),
      retryDelay: 750,
    },
  },
});
