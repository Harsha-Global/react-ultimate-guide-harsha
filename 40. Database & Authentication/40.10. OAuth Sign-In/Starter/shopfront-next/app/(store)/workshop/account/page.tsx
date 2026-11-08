import { Suspense } from 'react';
import { AccountPanel } from '@/components/AccountPanel';
import { getCurrentUser } from '@/lib/session';
async function ServerSession() {
  const user = await getCurrentUser();
  return <p className="fs-notice">Server check: {user ? `signed in as ${user.name}` : 'signed out'}.</p>;
}
export default function AccountPage() {
  return (
    <section className="fs-shell">
      <p className="fs-eyebrow">Your account</p>
      <h1>A session the server can verify.</h1>
      <Suspense fallback={<p>Checking the server session…</p>}>
        <ServerSession/>
      </Suspense>
      <AccountPanel/>
    </section>
  );
}
