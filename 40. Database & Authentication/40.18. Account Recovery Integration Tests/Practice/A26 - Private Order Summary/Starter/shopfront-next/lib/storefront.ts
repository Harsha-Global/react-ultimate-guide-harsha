import 'server-only';
import { readCachedCatalog } from './catalogCache';
export const readStorefront = readCachedCatalog;
export async function readStorefrontProduct(slug: string) {
 const snapshot = await readStorefront();
 return snapshot.products.find(product => product.slug === slug);
}
