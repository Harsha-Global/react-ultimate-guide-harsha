import 'server-only';
import type { OrderInput } from './orderInput';
import { AccessError } from './orderAccess';
export async function reorderLine(orderId: string, input: OrderInput): Promise<{id: string; total: number}> {
  // TODO: verify ownership and that the selected product is one of this order's saved lines.
  // Reuse the taught atomic, idempotent order-creation operation.
  void orderId; void input;
  throw new AccessError(501, 'Complete the reorder operation.');
}
