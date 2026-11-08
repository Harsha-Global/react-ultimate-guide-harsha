import Link from 'next/link';
import { Suspense } from 'react';
import { connection } from 'next/server';
import { listDatabaseProducts } from '@/lib/productData';
import { formatPrice } from '@/lib/catalog';
async function ProductRows() {
  await connection();
  const products = await listDatabaseProducts();
  return (
    <div className="fs-grid">
      {products.map(product => (
        <article className="fs-card" key={product.id}>
          <p>{product.id}</p>
          <h2>{product.name}</h2>
          <strong>{formatPrice(product.priceMinor)}</strong>
          <p>{product.stock} available</p>
        </article>
      ))}
    </div>
  );
}
export default function DatabaseWorkshop() {
  return (
    <section className="fs-shell">
      <Link href="/catalog">ShopFront catalog</Link>
      <p className="fs-eyebrow">Database workshop</p>
      <h1>Saved products</h1>
      <p>These two sample rows come from PostgreSQL. The public catalog still uses its teaching API.</p>
      <Suspense fallback={<p role="status">Loading saved products…</p>}>
        <ProductRows/>
      </Suspense>
    </section>
  );
}
