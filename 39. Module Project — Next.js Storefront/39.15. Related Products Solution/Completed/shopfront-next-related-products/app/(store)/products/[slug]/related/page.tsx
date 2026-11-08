import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readStorefront } from '@/lib/storefront';
import { selectRelatedProducts } from '@/lib/relatedProducts';
import { ProductGrid } from '@/components/ProductGrid';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { slug } = await params;
 const snapshot = await readStorefront();
 const current = snapshot.products.find(product => product.slug === slug);
 if (!current) return { title: 'Product not found', robots: { index: false } };
 return { title: `Related to ${current.name}`, alternates: { canonical: `/products/${current.slug}/related` } };
}
export default async function RelatedPage({ params }: Props) {
 const { slug } = await params;
 const snapshot = await readStorefront();
 const current = snapshot.products.find(product => product.slug === slug);
 if (!current) notFound();
 const related = selectRelatedProducts(snapshot.products, current.id);
 return <><header className="catalog-heading"><p className="eyebrow">More to consider</p><h1>Related to {current.name}</h1><p>Other available products, with the same category first.</p><Link href={`/products/${current.slug}`}>Back to {current.name}</Link></header>{related.length ? <ProductGrid products={related}/> : <p className="panel">No other products are currently available. <Link href="/catalog">Return to the collection</Link>.</p>}</>;
}
