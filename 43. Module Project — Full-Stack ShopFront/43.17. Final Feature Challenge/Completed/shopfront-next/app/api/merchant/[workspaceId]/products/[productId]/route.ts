import { z } from 'zod';
import { revalidateTag } from 'next/cache';
import { databaseCatalogTag } from '@/lib/databaseCatalog';
import { changeMerchantStock } from '@/lib/merchant';
import { requireSameOrigin, failureResponse } from '@/lib/httpBoundary';
import { readJson } from '@/lib/readJson';
const stockInput = z.object({
  expectedStock: z.number().int().min(0).max(100000),
  stock: z.number().int().min(0).max(100000),
}).strict();
export async function PATCH(request: Request, context: { params: Promise<{ workspaceId: string; productId: string }> }) {
  try {
    requireSameOrigin(request);
    const parsed = stockInput.safeParse(await readJson(request));
    if (!parsed.success) return Response.json({ error: 'Enter a whole stock quantity from 0 to 100000.' }, { status: 400 });
    const { workspaceId, productId } = await context.params;
    await changeMerchantStock(workspaceId, productId, parsed.data.expectedStock, parsed.data.stock);
    revalidateTag(databaseCatalogTag, { expire: 0 });
    return Response.json({ saved: true }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    return failureResponse(error);
  }
}
