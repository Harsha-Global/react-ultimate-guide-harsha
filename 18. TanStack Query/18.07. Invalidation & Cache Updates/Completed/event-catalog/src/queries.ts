import { queryOptions, keepPreviousData } from "@tanstack/react-query";
import { getEvents, getEvent, getVenue } from "./api.ts";
import type { EventFilters } from "./events.ts";
export const eventKeys = {
  lists: () => ["events", "list"] as const,
  list: (filters: EventFilters) => ["events", "list", filters] as const,
  detail: (id: string) => ["events", "detail", id] as const,
};
export function eventListOptions(filters: EventFilters) {
  return queryOptions({
    queryKey: eventKeys.list(filters),
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) => getEvents(filters, signal),
  });
}
export function eventOptions(id: string) {
  return queryOptions({
    queryKey: eventKeys.detail(id),
    queryFn: ({ signal }) => getEvent(id, signal),
  });
}

export function venueOptions(id: string | undefined) {
  return queryOptions({
    queryKey: ["venues", "detail", id ?? null] as const,
    enabled: !!id,
    queryFn: ({ signal }) => {
      if (!id) throw new Error("An event must supply a venue id first.");
      return getVenue(id, signal);
    },
  });
}