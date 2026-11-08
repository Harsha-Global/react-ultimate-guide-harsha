import Link from 'next/link';
import { products, formatPrice } from '@/lib/products';

export default function CatalogPage() {
  return <main><h1>Catalog</h1><ul>{products.map(product =>
    <li key={product.slug}><Link id={`product-${product.slug}`} href={`/products/${product.slug}`}>{product.name}</Link> — {formatPrice(product.priceMinor)}</li>
  )}</ul></main>;
}
