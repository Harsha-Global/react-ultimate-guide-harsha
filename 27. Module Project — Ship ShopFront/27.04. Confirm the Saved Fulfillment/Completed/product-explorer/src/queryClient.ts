import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./api";
export const privateKeys = { all: ["private"] as const };
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30000,
            gcTime: 120000,
            retry: (count, error) => count < 1 &&
                (error instanceof TypeError ||
                    (error instanceof ApiError && error.status >= 500)),
            retryDelay: 500,
        },
    },
});
