import { updateWorkspaceNote } from '@/lib/workspaceAccess';
import { failureResponse, requireSameOrigin } from '@/lib/httpBoundary';
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string; noteId: string }> }) {
  try {
    requireSameOrigin(request);
    const body: unknown = await request.json();
    if (typeof body !== 'object' || body === null || !('body' in body) || typeof body.body !== 'string' || body.body.length > 200) {
      return Response.json({ error: 'Enter a note of 200 characters or fewer.' }, { status: 400 });
    }
    const { id, noteId } = await params;
    await updateWorkspaceNote(id, noteId, body.body.trim());
    return Response.json({ saved: true }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) { return failureResponse(error); }
}
