type EventFilters = Readonly<{
  q: string;
  category: "all" | "art" | "food" | "outdoors";
  sort: "title" | "price";
  page: number;
}>;

const eventKeys = {
  lists: () => ["events", "list"] as const,
  // BUG: the category sent by the request is missing from its cache identity.
  list: (filters: EventFilters) => ["events", "list", { q: filters.q, sort: filters.sort, page: filters.page }] as const,
  detail: (id: string) => ["events", "detail", id] as const
};
