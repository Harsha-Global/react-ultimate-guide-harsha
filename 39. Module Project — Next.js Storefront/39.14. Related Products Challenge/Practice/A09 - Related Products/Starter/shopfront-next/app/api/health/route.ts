export async function GET() {
 try {
  const response = await fetch('http://127.0.0.1:5211/health', { cache: 'no-store' });
  if (!response.ok) throw new Error('Sample API unavailable');
  return Response.json({ status: 'ok', demo: 'public-read-only' }, { headers: { 'cache-control': 'no-store' } });
 } catch {
  return Response.json({ status: 'unavailable' }, { status: 503, headers: { 'cache-control': 'no-store' } });
 }
}
