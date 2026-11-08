import 'server-only';
import { db } from './db';
import type { FulfillmentFilter } from './fulfillmentFilter';
import { AccessError, requireCurrentUser } from './orderAccess';
export async function readMyWorkspaces() {
  const user = await requireCurrentUser();
  return db.workspace.findMany({ where: { members: { some: { userId: user.id } } },
    orderBy: { name: 'asc' }, select: { id: true, name: true } });
}
export async function requireWorkspace(workspaceId: string) {
  const user = await requireCurrentUser();
  const membership = await db.membership.findUnique({
    where: { workspaceId_userId: { workspaceId, userId: user.id } },
    select: { role: true, workspace: { select: { id: true, name: true } } },
  });
  if (!membership) throw new AccessError(404, 'Workspace not found.');
  return { ...membership, userId: user.id };
}
export async function readMerchantWorkspace(workspaceId: string, status: FulfillmentFilter = 'all') {
  const membership = await requireWorkspace(workspaceId);
  const allowed = { members: { some: { userId: membership.userId } } };
  const [products, orders] = await Promise.all([
    db.product.findMany({ where: { workspaceId, workspace: allowed }, orderBy: { id: 'asc' },
      select: { id: true, name: true, stock: true, priceMinor: true } }),
    db.order.findMany({ where: {
      ...(status === 'awaiting' ? { status: 'pending' } : status === 'all' ? {} : {
        fulfillments: { some: { workspaceId, status } },
      }), items: { some: { product: { workspaceId, workspace: allowed } } } },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }], take: 20,
      select: { id: true, status: true,
        merchantNotes: { where: { workspaceId }, select: { body: true, revision: true } },
        fulfillments: { where: { workspaceId }, select: { status: true } },
        items: { where: { product: { workspaceId } }, select: {
          quantity: true, unitPriceMinor: true, product: { select: { name: true } } } } } }),
  ]);
  return { workspace: membership.workspace, canEdit: ['owner','editor'].includes(membership.role), products, orders };
}
export async function changeMerchantStock(workspaceId: string, productId: string, expectedStock: number, stock: number) {
  const user = await requireCurrentUser();
  const changed = await db.product.updateMany({ where: {
    id: productId, workspaceId, stock: expectedStock,
    workspace: { members: { some: { userId: user.id, role: { in: ['owner','editor'] } } } },
  }, data: { stock } });
  if (changed.count !== 1) throw new AccessError(409, 'Stock changed or editing is unavailable. Refresh before trying again.');
}
