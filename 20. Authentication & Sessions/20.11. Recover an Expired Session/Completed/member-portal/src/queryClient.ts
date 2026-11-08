import { QueryClient } from "@tanstack/react-query";
export const privateKeys = {
  all: ["private"] as const,
  account: (id: string) => ["private", id, "account"] as const,
  admin: (id: string) => ["private", id, "admin"] as const,
};
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, staleTime: 30_000, gcTime: 120_000 },
  },
});
