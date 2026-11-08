import { startMyCheckout } from '@/lib/checkout';
import { requireSameOrigin, failureResponse } from '@/lib/httpBoundary';
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireSameOrigin(request);
    return Response.json({ url: await startMyCheckout((await params).id) }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) { return failureResponse(error); }
}
