import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from './db';
import type { Product } from './catalog';
export const databaseCatalogTag = 'database-catalog';
export async function readDatabaseCatalog(): Promise<{ products: Product[] }> {
  'use cache';
  cacheLife({ stale: 30, revalidate: 60, expire: 300 });
  cacheTag(databaseCatalogTag);
  const products = await db.product.findMany({
    where: { workspaceId: { not: null } },
    orderBy: { id: 'asc' },
    select: { id: true, slug: true, name: true, category: true, priceMinor: true, stock: true, image: true },
  });
  return { products };
}
