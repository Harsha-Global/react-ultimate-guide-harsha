import { db } from '@/lib/db';
export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;
    return Response.json({ database: 'ready' }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ database: 'unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
