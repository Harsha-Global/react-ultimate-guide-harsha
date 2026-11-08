import 'server-only';
import { AccessError } from './orderAccess';
export async function readJson(request: Request, limit = 4096): Promise<unknown> {
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new AccessError(415, 'Send a JSON request.');
  const reader = request.body?.getReader();
  if (!reader) throw new AccessError(400, 'A request body is required.');
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); throw new AccessError(413, 'The request is too large.'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw new AccessError(400, 'The JSON request is invalid.'); }
}
