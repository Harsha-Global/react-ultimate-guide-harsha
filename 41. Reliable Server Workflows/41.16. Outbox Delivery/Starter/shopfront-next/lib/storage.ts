import 'server-only';
import { S3Client } from '@aws-sdk/client-s3';
export function getStorage() {
  const endpoint = process.env.S3_ENDPOINT;
  const accessKeyId = process.env.S3_ACCESS_KEY;
  const secretAccessKey = process.env.S3_SECRET_KEY;
  if (!endpoint || !accessKeyId || !secretAccessKey) throw new Error('Storage configuration is missing.');
  return new S3Client({ endpoint, region: process.env.S3_REGION ?? 'us-east-1', forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey }, requestChecksumCalculation: 'WHEN_REQUIRED',
  });
}
export const uploadBucket = process.env.S3_BUCKET ?? 'shopfront-uploads';
