import 'server-only';
import { db } from './db';
import { requireCurrentUser } from './orderAccess';
export async function readMyOrders() {
  const user = await requireCurrentUser();
  return db.order.findMany({
    where: { customer: { userId: user.id } },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    take: 20,
    select: { id: true, status: true, createdAt: true, items: { select: { quantity: true, unitPriceMinor: true } } },
  });
}
