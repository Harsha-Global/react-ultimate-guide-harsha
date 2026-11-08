import 'server-only';
import { db } from './db';
import { inngest } from '@/inngest/client';
type PaidEvent = { id: string; name: 'shopfront/order.paid'; data: { orderId: string } };
export async function dispatchOutbox(sendEvent: (event: PaidEvent) => Promise<unknown> = event => inngest.send(event)) {
  const rows = await db.outbox.findMany({ where: { deliveredAt: null }, orderBy: { createdAt: 'asc' }, take: 20 });
  let sent = 0;
  for (const row of rows) {
    await db.outbox.update({ where: { id: row.id }, data: { attempts: { increment: 1 } } });
    await sendEvent({ id: row.id, name: 'shopfront/order.paid', data: { orderId: row.orderId } });
    // Mark only after the event service acknowledges the send.
    await db.outbox.updateMany({ where: { id: row.id, deliveredAt: null }, data: { deliveredAt: new Date() } });
    sent++;
  }
  return { sent };
}
