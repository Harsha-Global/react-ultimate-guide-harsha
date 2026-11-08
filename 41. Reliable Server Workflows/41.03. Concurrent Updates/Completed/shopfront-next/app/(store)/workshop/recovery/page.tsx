import Link from 'next/link';
import { Suspense } from 'react';
import { RecoveryPanel } from '@/components/RecoveryPanel';
export default function RecoveryPage() {
  return (
    <section className="fs-shell">
      <Link href="/workshop/account">Back to account</Link>
      <h1>Account recovery</h1>
      <Suspense fallback={<p>Opening recovery form…</p>}>
        <RecoveryPanel/>
      </Suspense>
    </section>
  );
}
