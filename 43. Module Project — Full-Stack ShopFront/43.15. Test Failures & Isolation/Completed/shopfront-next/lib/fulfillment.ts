import 'server-only';
import type { Prisma } from '../generated/prisma/client';
export async function ensureFulfillments(tx: Prisma.TransactionClient, orderId: string, workspaceIds: string[]) {
  // The business identity survives different provider event IDs and retries.
  await tx.fulfillment.createMany({
    data: [...new Set(workspaceIds)].map(workspaceId => ({ orderId, workspaceId })),
    skipDuplicates: true,
  });
}
