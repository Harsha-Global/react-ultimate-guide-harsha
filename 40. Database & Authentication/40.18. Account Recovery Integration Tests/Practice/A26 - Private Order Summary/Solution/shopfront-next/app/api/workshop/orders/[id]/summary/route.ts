import { getMyOrderSummary } from '@/lib/orderSummary';
import { failureResponse } from '@/lib/httpBoundary';
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    return Response.json(await getMyOrderSummary((await params).id), { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) { return failureResponse(error); }
}
