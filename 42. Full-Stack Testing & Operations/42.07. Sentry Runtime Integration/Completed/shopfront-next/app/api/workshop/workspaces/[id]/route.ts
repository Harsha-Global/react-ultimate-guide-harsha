import { getMyWorkspace } from '@/lib/workspaceAccess';
import { failureResponse } from '@/lib/httpBoundary';
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { return Response.json(await getMyWorkspace((await params).id), { headers: { 'Cache-Control': 'private, no-store' } }); }
  catch (error) { return failureResponse(error); }
}
