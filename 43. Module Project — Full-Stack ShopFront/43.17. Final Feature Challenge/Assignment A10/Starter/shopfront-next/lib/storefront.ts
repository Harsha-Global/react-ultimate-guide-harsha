import 'server-only';
import { readDatabaseCatalog } from './databaseCatalog';
export const readStorefront = readDatabaseCatalog;
export async function readStorefrontProduct(slug: string) {
 const snapshot = await readStorefront();
 return snapshot.products.find(product => product.slug === slug);
}
