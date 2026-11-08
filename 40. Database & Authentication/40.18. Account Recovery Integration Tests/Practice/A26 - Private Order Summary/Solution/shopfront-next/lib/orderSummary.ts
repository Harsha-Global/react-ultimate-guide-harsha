import 'server-only';
import { getMyOrder } from './orderAccess';
export async function getMyOrderSummary(id: string) {
  const order = await getMyOrder(id);
  return {
    id: order.id,
    status: order.status,
    lineCount: order.items.length,
    unitCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
    totalMinor: order.items.reduce((sum, item) => sum + item.quantity * item.unitPriceMinor, 0),
  };
}
