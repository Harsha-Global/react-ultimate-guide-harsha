import { ProductGrid } from '@/components/ProductGrid';
import { StorefrontHeading } from '@/components/StorefrontHeading';
import { CategoryLinks } from '@/components/CategoryLinks';
import { readStorefront } from '@/lib/storefront';
export default async function CatalogPage() {
 const snapshot = await readStorefront();
 return <><StorefrontHeading/><CategoryLinks/><p className="revision">Catalog revision: {snapshot.revision}</p>{snapshot.products.length ? <ProductGrid products={snapshot.products}/> : <p className="panel">No products are available.</p>}</>;
}
