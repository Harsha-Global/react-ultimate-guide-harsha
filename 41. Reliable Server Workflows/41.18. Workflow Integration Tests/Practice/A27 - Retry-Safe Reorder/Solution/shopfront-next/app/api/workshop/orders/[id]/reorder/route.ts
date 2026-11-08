import { z } from 'zod';
import { orderInput } from '@/lib/orderInput';
import { reorderLine } from '@/lib/reorder';
import { readJson } from '@/lib/readJson';
import { failureResponse, requireSameOrigin } from '@/lib/httpBoundary';
export async function POST(request: Request, { params }: { params: Promise<{id: string}> }) {
  try {
    requireSameOrigin(request);
    const input = orderInput.safeParse(await readJson(request));
    if (!input.success) return Response.json({error:'Check the reorder fields.',fields:z.flattenError(input.error).fieldErrors},{status:400,headers:{'Cache-Control':'private, no-store'}});
    return Response.json(await reorderLine((await params).id,input.data),{status:201,headers:{'Cache-Control':'private, no-store'}});
  } catch(error) { return failureResponse(error); }
}
