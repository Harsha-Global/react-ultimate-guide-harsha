"use client";
import type { Product } from '@/lib/catalog';
import { ProductGrid } from './ProductGrid';
import { usePublicShortlist } from './PublicShortlistProvider';
export function ShortlistResults({ products }: { products: Product[] }) {
 const { ids, ready } = usePublicShortlist();
 if (!ready) return <p role="status">Restoring your shortlist…</p>;
 const selected = products.filter(product => ids.includes(product.id));
 return selected.length ? <ProductGrid products={selected}/> : <p className="panel">Your shortlist is empty. Explore the collection and save a few favorites.</p>;
}
