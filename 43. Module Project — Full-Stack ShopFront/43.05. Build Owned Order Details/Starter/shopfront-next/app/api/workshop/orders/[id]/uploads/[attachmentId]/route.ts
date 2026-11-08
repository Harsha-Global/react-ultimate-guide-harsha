import { attachVerifiedUpload } from '@/lib/verifyUpload';
import { failureResponse, requireSameOrigin } from '@/lib/httpBoundary';
export async function POST(request: Request, { params }: { params: Promise<{ id: string; attachmentId: string }> }) {
  try {
    requireSameOrigin(request); const { id, attachmentId } = await params;
    return Response.json(await attachVerifiedUpload(id, attachmentId), { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) { return failureResponse(error); }
}
