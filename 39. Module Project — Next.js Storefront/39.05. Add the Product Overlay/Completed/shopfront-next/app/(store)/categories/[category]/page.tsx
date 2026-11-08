import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryLinks } from '@/components/CategoryLinks';
import { categoryFromSlug } from '@/lib/categories';
import { readStorefront } from '@/lib/storefront';
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
 const category = categoryFromSlug((await params).category);
 if (!category) notFound();
 const snapshot = await readStorefront();
 const products = snapshot.products.filter(product => product.category === category);
 return <><header className="catalog-heading"><p className="eyebrow">Shop the collection</p><h1>{category} essentials</h1></header><CategoryLinks current={category}/><p className="revision">Catalog revision: {snapshot.revision}</p>{products.length ? <ProductGrid products={products}/> : <p className="panel">No products are available in this category.</p>}</>;
}
