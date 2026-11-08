import type { Product } from './catalog.ts';
export type CatalogSnapshot = { revision: number; products: Product[] };
export function parseCatalog(value: unknown): CatalogSnapshot {
 if (typeof value !== 'object' || value === null) throw new Error('Invalid catalog response');
 const record = value as Record<string,unknown>;
 if (!Number.isInteger(record.revision) || (record.revision as number) < 1 || !Array.isArray(record.products)) throw new Error('Invalid catalog response');
 const products = record.products.map((item: unknown): Product => {
  if (typeof item !== 'object' || item === null) throw new Error('Invalid product');
  const p = item as Record<string,unknown>;
  if (typeof p.id !== 'string' || !/^P-\d{3}$/.test(p.id) || typeof p.slug !== 'string' || !/^[a-z0-9-]+$/.test(p.slug) || typeof p.name !== 'string' || typeof p.category !== 'string' || typeof p.image !== 'string' || !/^\/assets\/[a-z0-9-]+\.jpg$/.test(p.image) || !Number.isInteger(p.priceMinor) || (p.priceMinor as number)<0 || !Number.isInteger(p.stock) || (p.stock as number)<0) throw new Error('Invalid product');
  return { id:p.id,slug:p.slug,name:p.name,category:p.category,image:p.image,priceMinor:p.priceMinor as number,stock:p.stock as number };
 });
 return { revision:record.revision as number, products };
}
