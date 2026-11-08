import { z } from 'zod';
import { createMyOrder } from '@/lib/createOrder';
import { orderInput } from '@/lib/orderInput';
import { requireCurrentUser } from '@/lib/orderAccess';
import { requireSameOrigin, failureResponse } from '@/lib/httpBoundary';
import { readJson } from '@/lib/readJson';
export async function POST(request: Request) {
  try {
    requireSameOrigin(request); await requireCurrentUser();
    const parsed = orderInput.safeParse(await readJson(request));
    if (!parsed.success) return Response.json({ error: 'Check the order fields.', fields: z.flattenError(parsed.error).fieldErrors }, { status: 400 });
    const order = await createMyOrder(parsed.data);
    return Response.json(order, { status: 201, headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) { return failureResponse(error); }
}
