import 'server-only';
import { db } from './db';
import { reconcilePaymentEvent } from './paymentReconciliation';
export async function recoverPendingPayments() {
  const events = await db.paymentEvent.findMany({ where: { status: 'received' }, orderBy: { receivedAt: 'asc' }, take: 10 });
  let recovered = 0; let pending = 0;
  for (const event of events) {
    try { await reconcilePaymentEvent(event.id); recovered++; }
    catch { pending++; }
  }
  return { recovered, pending };
}
