import { GetObjectCommand } from '@aws-sdk/client-s3';
import { db } from '@/lib/db';
import { getMyOrder, AccessError } from '@/lib/orderAccess';
import { getStorage, uploadBucket } from '@/lib/storage';
import { failureResponse } from '@/lib/httpBoundary';
export async function GET(request: Request, { params }: { params: Promise<{ id: string; attachmentId: string }> }) {
  try {
    const { id, attachmentId } = await params; await getMyOrder(id);
    const image = await db.attachment.findFirst({ where: { id: attachmentId, orderId: id, status: 'attached' }, select: { objectKey: true } });
    if (!image?.objectKey) throw new AccessError(404, 'Image not found.');
    const object = await getStorage().send(new GetObjectCommand({ Bucket: uploadBucket, Key: image.objectKey }));
    if (!object.Body) throw new Error('Image unavailable.');
    return new Response(new Uint8Array(await object.Body.transformToByteArray()), { headers: {
      'Content-Type': 'image/png', 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff',
      'Content-Disposition': 'inline; filename="order-image.png"',
    } });
  } catch (error) { return failureResponse(error); }
}
