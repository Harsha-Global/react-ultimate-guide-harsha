import 'server-only';
import { headers } from 'next/headers';
import { connection } from 'next/server';
import { auth } from './auth';
export async function getCurrentUser() {
  await connection();
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders, query: { disableCookieCache: true },
  });
  if (!session) return null;
  return { id: session.user.id, name: session.user.name };
}
