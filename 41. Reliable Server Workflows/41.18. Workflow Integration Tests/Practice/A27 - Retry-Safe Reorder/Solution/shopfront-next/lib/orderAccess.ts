import 'server-only';
import { db } from './db';
import { getCurrentUser } from './session';
export class AccessError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user) throw new AccessError(401, 'Please sign in.');
  return user;
}
export async function getMyOrder(id: string) {
  const user = await requireCurrentUser();
  const order = await db.order.findFirst({
    where: { id, customer: { userId: user.id } },
    select: { id: true, status: true, note: true, receipt: { select: { totalMinor: true } }, attachments: { where: { status: 'attached' }, select: { id: true }, take: 10 }, items: { select: { productId: true, product: { select: { name: true } }, quantity: true, unitPriceMinor: true } } },
  });
  if (!order) throw new AccessError(404, 'Order not found.');
  return order;
}
export async function updateMyOrderNote(id: string, note: string) {
  const user = await requireCurrentUser();
  const result = await db.order.updateMany({
    where: { id, customer: { userId: user.id } }, data: { note },
  });
  if (result.count !== 1) throw new AccessError(404, 'Order not found.');
}
