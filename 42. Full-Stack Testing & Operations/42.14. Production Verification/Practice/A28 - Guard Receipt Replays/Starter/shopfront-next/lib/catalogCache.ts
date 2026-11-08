import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { readCatalog } from './catalogApi';
export const catalogTag = 'public-catalog';
export async function readCachedCatalog(category = 'All') {
 'use cache';
 cacheLife({ stale:30, revalidate:60, expire:300 });
 cacheTag(catalogTag);
 const snapshot = await readCatalog();
 return { ...snapshot, products:category === 'All' ? snapshot.products : snapshot.products.filter(product => product.category === category) };
}
