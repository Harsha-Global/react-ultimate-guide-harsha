import 'server-only';
export async function readRawBody(request: Request, limit = 1024 * 1024) {
  const reader = request.body?.getReader(); if (!reader) throw new Error('Body missing.');
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); throw new Error('Body too large.'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(chunks).toString('utf8');
}
