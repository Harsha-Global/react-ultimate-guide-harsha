import { formatPrice, type Product } from '@/lib/products';

export function ProductDetails({ product }: { product: Product }) {
  return <><p>{formatPrice(product.priceMinor)}</p><p>{product.inStock ? 'In stock' : 'Currently unavailable'}</p></>;
}
