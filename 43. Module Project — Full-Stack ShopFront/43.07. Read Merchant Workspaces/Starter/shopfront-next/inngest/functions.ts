import { z } from 'zod';
import { inngest } from './client';
import { dispatchOutbox } from '@/lib/outbox';
import { saveReceipt } from '@/lib/receipt';
const receiptEvent = z.object({ orderId: z.string().min(1).max(100) });
export const createReceipt = inngest.createFunction(
  { id: 'create-order-receipt', triggers: { event: 'shopfront/order.paid' }, retries: 3 },
  async ({ event, step }) => {
    const { orderId } = receiptEvent.parse(event.data);
    return step.run('save-receipt', () => saveReceipt(orderId));
  },
);

export const deliverOutbox = inngest.createFunction(
  { id: 'deliver-order-outbox', triggers: { cron: '* * * * *' }, retries: 3, concurrency: 1 },
  async ({ step }) => step.run('dispatch-pending-orders', () => dispatchOutbox()),
);
