import 'server-only';
import { randomUUID } from 'node:crypto';
import type { Readable } from 'node:stream';
import sharp from 'sharp';
import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { db } from './db';
import { getMyOrder, AccessError } from './orderAccess';
import { getStorage, uploadBucket } from './storage';
export async function attachVerifiedUpload(orderId: string, attachmentId: string) {
  await getMyOrder(orderId);
  const ticket = await db.attachment.findFirst({ where: { id: attachmentId, orderId } });
  if (!ticket) throw new AccessError(404, 'Upload not found.');
  if (ticket.status === 'attached') return { id: ticket.id };
  const storage = getStorage();
  const object = await storage.send(new GetObjectCommand({ Bucket: uploadBucket, Key: ticket.temporaryKey }));
  if (!object.Body || object.ContentLength !== ticket.expectedSize || object.ContentType !== ticket.contentType) {
    (object.Body as Readable | undefined)?.destroy();
    throw new AccessError(400, 'The uploaded file does not match its ticket.');
  }
  const stream = object.Body as Readable;
  const chunks: Buffer[] = []; let size = 0;
  for await (const chunk of stream) {
    size += chunk.length;
    if (size > 512000) { stream.destroy(); throw new AccessError(400, 'The image is too large.'); }
    chunks.push(Buffer.from(chunk));
  }
  if (size !== ticket.expectedSize) throw new AccessError(400, 'The upload is incomplete.');
  let normalized: Buffer;
  try {
    const image = sharp(Buffer.concat(chunks), { limitInputPixels: 4000000, failOn: 'warning' });
    const metadata = await image.metadata();
    const expectedFormat = ticket.contentType === 'image/png' ? 'png' : 'jpeg';
    if (metadata.format !== expectedFormat || (metadata.pages ?? 1) !== 1) throw new Error('Unsupported image.');
    normalized = await image.rotate().resize(1200,1200,{ fit: 'inside', withoutEnlargement: true }).png().toBuffer();
    if (normalized.length > 2000000) throw new Error('Output is too large.');
  } catch { throw new AccessError(400, 'The file is not a supported, readable image.'); }
  const objectKey = `verified/${ticket.id}/${randomUUID()}.png`;
  await storage.send(new PutObjectCommand({ Bucket: uploadBucket, Key: objectKey, Body: normalized, ContentType: 'image/png' }));
  const saved = await db.attachment.updateMany({ where: { id: ticket.id, status: 'pending' }, data: { objectKey, status: 'attached' } });
  if (saved.count !== 1) await storage.send(new DeleteObjectCommand({ Bucket: uploadBucket, Key: objectKey }));
  return { id: ticket.id };
}
