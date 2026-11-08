import type { Product } from './catalog';
export type ProductPreview = Pick<Product, 'id' | 'name' | 'priceMinor'>;
export function toProductPreview(product: Product): ProductPreview {
 return { id: product.id, name: product.name, priceMinor: product.priceMinor };
}
