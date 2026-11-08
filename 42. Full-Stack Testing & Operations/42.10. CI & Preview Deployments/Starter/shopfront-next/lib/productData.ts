import 'server-only';
import { db } from './db';
export async function listDatabaseProducts() {
  return db.product.findMany({
    select: { id: true, name: true, priceMinor: true, stock: true },
    orderBy: { id: 'asc' }, take: 20,
  });
}
