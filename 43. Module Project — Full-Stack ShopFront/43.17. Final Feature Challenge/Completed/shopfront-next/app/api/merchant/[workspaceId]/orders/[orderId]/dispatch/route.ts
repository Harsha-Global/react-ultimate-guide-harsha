import { db } from '@/lib/db';
import { AccessError, requireCurrentUser } from '@/lib/orderAccess';
import { requireSameOrigin, failureResponse } from '@/lib/httpBoundary';
export async function POST(request: Request, context: { params: Promise<{ workspaceId: string; orderId: string }> }) {
  try {
    requireSameOrigin(request);
    const user = await requireCurrentUser();
    const { workspaceId, orderId } = await context.params;
    const result = await db.fulfillment.updateMany({
      where: {
        workspaceId,
        orderId,
        order: { status: 'paid' },
        workspace: { members: { some: { userId: user.id, role: { in: ['owner', 'editor'] } } } },
      },
      data: { status: 'dispatched' },
    });
    if (result.count !== 1) throw new AccessError(409, 'This fulfillment is unavailable for dispatch.');
    return Response.json({ saved: true }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    return failureResponse(error);
  }
}
