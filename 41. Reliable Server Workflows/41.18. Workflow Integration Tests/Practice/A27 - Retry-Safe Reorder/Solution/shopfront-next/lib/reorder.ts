import 'server-only';
import type { OrderInput } from './orderInput';
import { AccessError, getMyOrder } from './orderAccess';
import { createMyOrder } from './createOrder';
export async function reorderLine(orderId: string, input: OrderInput) {
  const original = await getMyOrder(orderId);
  if (!original.items.some(item => item.productId === input.productId)) throw new AccessError(400, 'Choose a product from this order.');
  return createMyOrder(input);
}
