import Link from 'next/link';
import { products, formatPrice } from '@/lib/products';
import { parseCatalogQuery, type SearchValues } from '@/lib/catalogQuery';

export default async function CatalogPage({ searchParams }: { searchParams: Promise<SearchValues> }) {
  const query = parseCatalogQuery(await searchParams);
  const visible = products.filter(product => product.name.toLowerCase().includes(query.q.toLowerCase()));
  if (query.sort === 'price') visible.sort((a, b) => a.priceMinor - b.priceMinor);
  return <main><h1>Catalog</h1><p>Applied search: {query.q || 'all products'}. Order: {query.sort}.</p>
    <p>{visible.length} {visible.length === 1 ? 'product' : 'products'}</p><ul>{visible.map(product =>
      <li key={product.slug}><Link id={`product-${product.slug}`} href={`/products/${product.slug}`}>{product.name}</Link> — {formatPrice(product.priceMinor)}</li>
    )}</ul>{visible.length === 0 && <p>No products match this search.</p>}
  </main>;
}
