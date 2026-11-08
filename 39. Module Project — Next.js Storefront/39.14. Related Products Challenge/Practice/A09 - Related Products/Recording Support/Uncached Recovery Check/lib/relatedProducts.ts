import type { Product } from './catalog.ts';
export function selectRelatedProducts(products: Product[], currentId: string): Product[] {
 const current = products.find(product => product.id === currentId);
 if (!current) return [];
 const seen = new Set([currentId]);
 const eligible = products.filter(product => {
  if (product.stock <= 0 || seen.has(product.id)) return false;
  seen.add(product.id);
  return true;
 });
 const sameCategory = eligible.filter(product => product.category === current.category);
 const otherCategories = eligible.filter(product => product.category !== current.category);
 return [...sameCategory, ...otherCategories].slice(0, 2);
}
