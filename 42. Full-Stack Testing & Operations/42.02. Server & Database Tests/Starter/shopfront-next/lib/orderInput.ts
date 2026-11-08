import { z } from 'zod';
export const orderInput = z.strictObject({
  requestKey: z.uuid(),
  productId: z.string().min(1).max(50),
  quantity: z.number().int().min(1).max(5),
});
export type OrderInput = z.infer<typeof orderInput>;
