import type { Product } from './catalog.ts';
export function selectRelatedProducts(products: Product[], currentId: string): Product[] {
 // TODO: follow the assignment's availability, priority and uniqueness rules.
 return products.filter(product => product.id !== currentId).slice(0, 2);
}
