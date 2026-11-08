import { queryOptions } from "@tanstack/react-query";
import { getEvents, getEvent } from "./api.ts";
import type { EventFilters } from "./events.ts";
export const eventKeys = {
  lists: () => ["events", "list"] as const,
  list: (filters: EventFilters) => ["events", "list", filters] as const,
  detail: (id: string) => ["events", "detail", id] as const,
};
export function eventListOptions(filters: EventFilters) {
  return queryOptions({
    queryKey: eventKeys.list(filters),
    queryFn: ({ signal }) => getEvents(filters, signal),
  });
}
export function eventOptions(id: string) {
  return queryOptions({
    queryKey: eventKeys.detail(id),
    queryFn: ({ signal }) => getEvent(id, signal),
  });
}