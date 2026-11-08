import * as Sentry from '@sentry/nextjs';
import { requireCurrentUser } from '@/lib/orderAccess';
import { failureResponse, requireSameOrigin } from '@/lib/httpBoundary';
export async function POST(request: Request) {
  try {
    requireSameOrigin(request); await requireCurrentUser();
    if (process.env.COURSE_TELEMETRY_DEMO !== 'enabled') return new Response(null, { status: 404 });
    if (!process.env.SENTRY_DSN) return Response.json({ error: 'Configure the course Sentry project first.' }, { status: 503 });
    const eventId = Sentry.captureException(new Error('ShopFront controlled telemetry check'));
    await Sentry.flush(2000);
    return Response.json({ eventId }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) { return failureResponse(error); }
}
