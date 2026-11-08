import 'server-only';
import { db } from './db';
export async function saveReceipt(orderId: string) {
  const order = await db.order.findUniqueOrThrow({ where: { id: orderId }, include: { items: true } });
  if (order.status !== 'paid') throw new Error('Receipt waits for a verified paid order.');
  const totalMinor = order.items.reduce((sum, item) => sum + item.quantity * item.unitPriceMinor, 0);
  const receipt = await db.receipt.upsert({ where: { orderId }, update: {}, create: { orderId, totalMinor } });
  return { orderId: receipt.orderId, totalMinor: receipt.totalMinor };
}
