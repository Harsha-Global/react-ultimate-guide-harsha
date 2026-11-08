import 'server-only';
import { AccessError } from './orderAccess';
export function requireSameOrigin(request: Request) {
  const expected = process.env.BETTER_AUTH_URL;
  if (!expected || request.headers.get('origin') !== new URL(expected).origin) {
    throw new AccessError(403, 'Request origin is not allowed.');
  }
}
export function failureResponse(error: unknown) {
  if (error instanceof AccessError) return Response.json({ error: error.message }, { status: error.status, headers: { 'Cache-Control': 'private, no-store' } });
  console.error('A workshop operation failed.');
  return Response.json({ error: 'The request could not be completed.' }, { status: 500 });
}
