import { readCachedCatalog } from '@/lib/catalogCache';
import { ProductGrid } from './ProductGrid';
export async function DataCatalog() {
 const snapshot = await readCachedCatalog();
 return <section><h2>Public catalog</h2><p>Catalog revision: {snapshot.revision}</p>{snapshot.products.length ? <ProductGrid products={snapshot.products}/> : <p>No products are available.</p>}</section>;
}
