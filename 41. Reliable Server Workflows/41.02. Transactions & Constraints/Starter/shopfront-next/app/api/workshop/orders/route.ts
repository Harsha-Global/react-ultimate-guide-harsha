import { z } from 'zod';
import { db } from '@/lib/db';
import { orderInput } from '@/lib/orderInput';
import { requireCurrentUser, AccessError } from '@/lib/orderAccess';
import { requireSameOrigin, failureResponse } from '@/lib/httpBoundary';
import { readJson } from '@/lib/readJson';
export async function POST(request: Request) {
  try {
    requireSameOrigin(request); await requireCurrentUser();
    const parsed = orderInput.safeParse(await readJson(request));
    if (!parsed.success) return Response.json({ error: 'Check the order fields.', fields: z.flattenError(parsed.error).fieldErrors }, { status: 400 });
    const product = await db.product.findUnique({ where: { id: parsed.data.productId }, select: { name: true, priceMinor: true } });
    if (!product) throw new AccessError(404, 'Product not found.');
    return Response.json({ quote: product.priceMinor * parsed.data.quantity, message: 'The server calculated this quote. No order was saved.' });
  } catch (error) { return failureResponse(error); }
}
