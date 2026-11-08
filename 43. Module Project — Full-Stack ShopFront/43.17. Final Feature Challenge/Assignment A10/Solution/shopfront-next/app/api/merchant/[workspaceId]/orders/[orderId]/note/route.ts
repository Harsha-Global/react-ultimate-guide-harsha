import { z } from 'zod';
import { saveMerchantNote } from '@/lib/merchantNote';
import { requireSameOrigin, failureResponse } from '@/lib/httpBoundary';
import { readJson } from '@/lib/readJson';
const input = z.object({ body: z.string().trim().min(1).max(240), revision: z.number().int().min(0) }).strict();
export async function PATCH(request: Request, context: { params: Promise<{ workspaceId: string; orderId: string }> }) {
  try {
    requireSameOrigin(request);
    const result = input.safeParse(await readJson(request));
    if (!result.success) return Response.json({ error: 'Enter a note with 1 to 240 characters.' }, { status: 400 });
    const { workspaceId, orderId } = await context.params;
    return Response.json(await saveMerchantNote(workspaceId, orderId, result.data.body, result.data.revision), { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) { return failureResponse(error); }
}
