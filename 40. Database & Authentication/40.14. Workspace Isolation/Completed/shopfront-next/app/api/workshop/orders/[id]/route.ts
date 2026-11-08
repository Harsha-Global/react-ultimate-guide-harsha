import { getMyOrder, updateMyOrderNote } from '@/lib/orderAccess';
import { failureResponse, requireSameOrigin } from '@/lib/httpBoundary';
type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, { params }: Context) {
  try { return Response.json(await getMyOrder((await params).id), { headers: { 'Cache-Control': 'private, no-store' } }); }
  catch (error) { return failureResponse(error); }
}
export async function PATCH(request: Request, { params }: Context) {
  try {
    requireSameOrigin(request);
    const body: unknown = await request.json();
    if (typeof body !== 'object' || body === null || !('note' in body) || typeof body.note !== 'string' || body.note.length > 200) {
      return Response.json({ error: 'Enter a note of 200 characters or fewer.' }, { status: 400 });
    }
    await updateMyOrderNote((await params).id, body.note.trim());
    return Response.json({ saved: true }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) { return failureResponse(error); }
}
