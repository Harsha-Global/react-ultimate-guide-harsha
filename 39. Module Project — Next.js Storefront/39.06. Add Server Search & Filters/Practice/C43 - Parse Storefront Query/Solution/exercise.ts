type Category = 'Workspace' | 'Travel' | 'Everyday' | 'Audio';
type RawSearch = Record<string, string | string[] | undefined>;
type StorefrontQuery = { q: string; category: Category | 'All'; sort: 'featured' | 'price' };
function readStorefrontQuery(raw: RawSearch): StorefrontQuery {
 const allowed: Category[] = ['Workspace', 'Travel', 'Everyday', 'Audio'];
 const q = typeof raw.q === 'string' ? raw.q.trim().slice(0,60) : '';
 const category = allowed.find(value => value === raw.category) ?? 'All';
 return { q, category, sort: raw.sort === 'price' ? 'price' : 'featured' };
}
