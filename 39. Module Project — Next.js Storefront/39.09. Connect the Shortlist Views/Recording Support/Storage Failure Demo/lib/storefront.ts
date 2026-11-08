import 'server-only';
import { readCatalog } from './catalogApi';
export const readStorefront = readCatalog;
export async function readStorefrontProduct(slug: string) {
 const snapshot = await readStorefront();
 return snapshot.products.find(product => product.slug === slug);
}
