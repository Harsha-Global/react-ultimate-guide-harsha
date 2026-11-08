import { z } from 'zod';
import { createUploadTicket } from '@/lib/uploadTicket';
import { requireSameOrigin, failureResponse } from '@/lib/httpBoundary';
import { readJson } from '@/lib/readJson';
const uploadInput = z.strictObject({ contentType: z.enum(['image/png','image/jpeg']), size: z.number().int().positive().max(512000) });
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireSameOrigin(request);
    const input = uploadInput.safeParse(await readJson(request));
    if (!input.success) return Response.json({ error: 'Choose a PNG or JPEG image of 500 KB or less.' }, { status: 400 });
    return Response.json(await createUploadTicket((await params).id, input.data.contentType, input.data.size), { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) { return failureResponse(error); }
}
