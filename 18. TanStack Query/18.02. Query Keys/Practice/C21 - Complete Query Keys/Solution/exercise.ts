type EventFilters = Readonly<{
  q: string;
  category: "all" | "art" | "food" | "outdoors";
  sort: "title" | "price";
  page: number;
}>;

const eventKeys = {
  lists: () => ["events", "list"] as const,
  list: (filters: EventFilters) => ["events", "list", filters] as const,
  detail: (id: string) => ["events", "detail", id] as const
};
