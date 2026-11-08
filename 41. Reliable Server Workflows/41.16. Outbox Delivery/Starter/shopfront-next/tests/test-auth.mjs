// Test infrastructure: respect the real authentication rate limit between repeated course checks.
export async function withAuthRetry(request) {
 for (let attempt = 0; attempt < 4; attempt++) {
  const response = await request();
  if (response.status !== 429 || attempt === 3) return response;
  const seconds = Math.max(1, Math.min(120, Number(response.headers.get('retry-after')) || 10));
  await response.body?.cancel();
  console.log(`Authentication rate limit: waiting ${seconds + 1} seconds before retrying the fixture sign-in.`);
  await new Promise(resolve => setTimeout(resolve, (seconds + 1) * 1000));
 }
 throw new Error('Authentication retry limit reached.');
}
export function fetchWithAuthRetry(...args) { return withAuthRetry(() => fetch(...args)); }
