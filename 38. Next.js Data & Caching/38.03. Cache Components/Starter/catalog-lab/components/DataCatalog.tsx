import { readCatalog } from '@/lib/catalogApi';
import { ProductGrid } from './ProductGrid';
export async function DataCatalog() {
 const snapshot = await readCatalog();
 return <section><h2>Public catalog</h2><p>Catalog revision: {snapshot.revision}</p>{snapshot.products.length ? <ProductGrid products={snapshot.products}/> : <p>No products are available.</p>}</section>;
}
