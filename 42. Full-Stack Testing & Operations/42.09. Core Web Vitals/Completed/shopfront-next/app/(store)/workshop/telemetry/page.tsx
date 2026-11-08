import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { requireCurrentUser } from '@/lib/orderAccess';
import { TelemetryPanel } from '@/components/TelemetryPanel';
async function AuthorizedTest() {
  await requireCurrentUser();
  if (process.env.COURSE_TELEMETRY_DEMO !== 'enabled') notFound();
  return <TelemetryPanel/>;
}
export default function TelemetryPage(){return (
  <section className="fs-shell">
    <h1>Telemetry rehearsal</h1>
    <Suspense fallback={<p>Checking access…</p>}>
      <AuthorizedTest/>
    </Suspense>
  </section>
);}
