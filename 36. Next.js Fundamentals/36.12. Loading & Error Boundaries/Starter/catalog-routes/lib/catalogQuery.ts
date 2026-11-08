export type SearchValues = Record<string, string | string[] | undefined>;
export function parseCatalogQuery(values: SearchValues) {
  const q = typeof values.q === 'string' ? values.q.trim().slice(0, 60) : '';
  const sort = values.sort === 'price' ? 'price' : 'featured';
  return { q, sort };
}
