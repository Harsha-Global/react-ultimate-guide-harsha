import 'server-only';
import { randomUUID } from 'node:crypto';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { db } from './db';
import { getMyOrder } from './orderAccess';
import { getStorage, uploadBucket } from './storage';
export async function createUploadTicket(orderId: string, contentType: string, size: number) {
  await getMyOrder(orderId);
  const id = randomUUID(); const temporaryKey = `quarantine/${id}`;
  await db.attachment.create({ data: { id, orderId, temporaryKey, contentType, expectedSize: size } });
  const command = new PutObjectCommand({ Bucket: uploadBucket, Key: temporaryKey, ContentType: contentType, ContentLength: size });
  const url = await getSignedUrl(getStorage(), command, { expiresIn: 60, signableHeaders: new Set(['content-type', 'content-length']) });
  return { id, url };
}
