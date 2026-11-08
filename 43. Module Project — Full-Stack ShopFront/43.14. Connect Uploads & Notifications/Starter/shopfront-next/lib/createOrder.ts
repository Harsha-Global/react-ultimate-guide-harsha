import 'server-only';
import { Prisma } from '../generated/prisma/client';
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
  const fingerprint = JSON.stringify({ productId: input.productId, quantity: input.quantity });
  const identity = { customerId: customer.id, requestKey: input.requestKey };
  async function existingResult() {
    const existing = await db.order.findUnique({ where: { customerId_requestKey: identity }, include: { items: true } });
    if (!existing) return null;
    if (existing.requestFingerprint !== fingerprint) throw new AccessError(409, 'Use a new request key for a different order.');
    return { id: existing.id, total: existing.items.reduce((sum, item) => sum + item.quantity * item.unitPriceMinor, 0) };
  }
  const existing = await existingResult(); if (existing) return existing;
  try { return await db.$transaction(async tx => {
    const product = await tx.product.findUnique({ where: { id: input.productId } });
    if (!product) throw new AccessError(404, 'Product not found.');
    if (!product.workspaceId) throw new AccessError(409, 'This product is not ready for ordering.');
    const reserved = await tx.product.updateMany({
      where: { id: product.id, stock: { gte: input.quantity } }, data: { stock: { decrement: input.quantity } },
    });
    if (reserved.count !== 1) throw new AccessError(409, 'There is not enough stock.');
    const order = await tx.order.create({ data: { ...identity, requestFingerprint: fingerprint } });
    await tx.orderItem.create({ data: { orderId: order.id, productId: product.id, quantity: input.quantity, unitPriceMinor: product.priceMinor } });
    return { id: order.id, total: product.priceMinor * input.quantity };
  }); } catch (error) {
    if ((error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') ||
        (error instanceof AccessError && error.status === 409)) {
      const winner = await existingResult(); if (winner) return winner;
    }
    throw error;
  }
}
