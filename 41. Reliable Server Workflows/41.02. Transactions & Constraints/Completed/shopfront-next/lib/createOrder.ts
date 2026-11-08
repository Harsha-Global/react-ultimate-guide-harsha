import 'server-only';
import { randomUUID } from 'node:crypto';
import { db } from './db';
import { AccessError, requireCurrentUser } from './orderAccess';
import type { OrderInput } from './orderInput';
export async function createMyOrder(input: OrderInput) {
  const user = await requireCurrentUser();
  const profile = await db.user.findUniqueOrThrow({ where: { id: user.id }, select: { email: true } });
  const customer = await db.customer.upsert({
    where: { userId: user.id }, update: {}, create: { id: randomUUID(), userId: user.id, name: user.name, email: profile.email },
  });
  return db.$transaction(async tx => {
    const product = await tx.product.findUnique({ where: { id: input.productId } });
    if (!product) throw new AccessError(404, 'Product not found.');
    const order = await tx.order.create({ data: { customerId: customer.id } });
    await tx.orderItem.create({ data: { orderId: order.id, productId: product.id, quantity: input.quantity, unitPriceMinor: product.priceMinor } });
    return { id: order.id, total: product.priceMinor * input.quantity };
  });
}
