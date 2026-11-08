import { queryOptions } from "@tanstack/react-query";
import { getOrders } from "./orderApi";
export function ordersOptions(userId: string) {
    return queryOptions({ queryKey: ["orders"], queryFn: ({ signal }) => getOrders(userId, signal), staleTime: 60000, retry: false });
}
