import 'server-only';
import { AccessError } from './orderAccess';
export async function getMyOrderSummary(id: string): Promise<{id: string; status: string; lineCount: number; unitCount: number; totalMinor: number}> {
  // TODO: enforce ownership, calculate from saved items, and return only the documented fields.
  void id;
  throw new AccessError(501, 'Complete the private summary operation.');
}
