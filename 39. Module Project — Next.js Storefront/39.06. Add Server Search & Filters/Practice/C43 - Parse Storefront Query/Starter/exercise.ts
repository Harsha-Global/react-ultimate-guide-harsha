type Category = 'Workspace' | 'Travel' | 'Everyday' | 'Audio';
type RawSearch = Record<string, string | string[] | undefined>;
type StorefrontQuery = { q: string; category: Category | 'All'; sort: 'featured' | 'price' };
function readStorefrontQuery(raw: RawSearch): StorefrontQuery {
 // TODO: normalize each untrusted query value without changing raw.
 return { q: String(raw.q ?? ''), category: 'All', sort: 'featured' };
}
