import Link from 'next/link';
import { readStorefront } from '@/lib/storefront';
import { selectStorefrontProducts, type StorefrontQuery } from '@/lib/storefrontQuery';
import { ProductGrid } from './ProductGrid';
export async function StorefrontResults({ query }: { query: StorefrontQuery }) {
 const snapshot = await readStorefront();
 const products = selectStorefrontProducts(snapshot.products, query);
 return <><p role="status">{products.length} product{products.length === 1 ? '' : 's'} {query.q ? `matching “${query.q}”` : 'in this view'}</p><p className="revision">Catalog revision: {snapshot.revision}</p>{products.length ? <ProductGrid products={products}/> : <p className="panel">No products match. Try another search. <Link href="/catalog">Clear filters</Link></p>}</>;
}
