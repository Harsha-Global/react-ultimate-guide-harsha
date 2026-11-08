import 'server-only';
import { Prisma } from '../generated/prisma/client';
import { db } from './db';
import { AccessError, requireCurrentUser } from './orderAccess';
export async function saveMerchantNote(workspaceId: string, orderId: string, body: string, revision: number) {
  const user = await requireCurrentUser();
  try {
    return await db.$transaction(async tx => {
      const order = await tx.order.findFirst({ where: { id: orderId, items: { some: { product: {
        workspaceId, workspace: { members: { some: { userId: user.id, role: { in: ['owner','editor'] } } } },
      } } } }, select: { id: true } });
      if (!order) throw new AccessError(404, 'Order not found in this workspace.');
      if (revision === 0) {
        await tx.merchantOrderNote.create({ data: { workspaceId, orderId, body } });
      } else {
        const saved = await tx.merchantOrderNote.updateMany({ where: { workspaceId, orderId, revision }, data: { body, revision: { increment: 1 } } });
        if (saved.count !== 1) throw new AccessError(409, 'A newer note exists. Refresh and review it before saving again.');
      }
      return { saved: true };
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new AccessError(409, 'A note was saved by another request. Refresh and review it before saving again.');
    throw error;
  }
}
