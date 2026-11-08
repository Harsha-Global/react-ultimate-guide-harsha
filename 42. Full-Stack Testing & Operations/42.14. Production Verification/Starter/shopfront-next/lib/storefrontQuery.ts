import type { Product } from './catalog.ts';
import { categories, type Category } from './categories.ts';
export type StorefrontQuery = { q: string; category: Category | 'All'; sort: 'featured' | 'price' };
export type RawSearch = Record<string, string | string[] | undefined>;
export function readStorefrontQuery(raw: RawSearch): StorefrontQuery {
 const q = typeof raw.q === 'string' ? raw.q.trim().slice(0, 60) : '';
 const category = categories.find(value => value === raw.category) ?? 'All';
 return { q, category, sort: raw.sort === 'price' ? 'price' : 'featured' };
}
export function selectStorefrontProducts(products: Product[], query: StorefrontQuery) {
 const search = query.q.toLowerCase();
 const matches = products.filter(product => (query.category === 'All' || product.category === query.category) && `${product.name} ${product.category}`.toLowerCase().includes(search));
 return query.sort === 'price' ? matches.toSorted((a, b) => a.priceMinor - b.priceMinor) : matches;
}
