type SavedEvent = Readonly<{ id: string; title: string; category: string; price: number }>;
type DetailKey = readonly ["events", "detail", string];
type CacheClient = {
  cancelQueries: (options: { queryKey: DetailKey; exact: true }) => Promise<void>;
  setQueryData: (key: DetailKey, saved: SavedEvent) => void;
  invalidateQueries: (options: { queryKey: readonly ["events", "list"] }) => Promise<void>;
};

async function applySavedEvent(client: CacheClient, saved: SavedEvent): Promise<void> {
  const detailKey = ["events", "detail", saved.id] as const;
  await client.cancelQueries({ queryKey: detailKey, exact: true });
  client.setQueryData(detailKey, saved);
  await client.invalidateQueries({ queryKey: ["events", "list"] });
}
