import { products, formatPrice } from '@/lib/products';

export default function CatalogPage() {
  return <main><h1>Catalog</h1><ul>{products.map(product =>
    <li key={product.slug}>{product.name} — {formatPrice(product.priceMinor)}</li>
  )}</ul></main>;
}
