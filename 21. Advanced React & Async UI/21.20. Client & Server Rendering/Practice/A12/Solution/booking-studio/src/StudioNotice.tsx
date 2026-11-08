import { Suspense, use, useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import {
  getStudioNotice,
  invalidateStudioNotice,
} from "./studioNoticeResource";

function StudioNotice() {
  const message = use(getStudioNotice());
  return <p className="notice">{message}</p>;
}

export function StudioNoticePanel() {
  const [attempt, setAttempt] = useState(0);
  function refreshNotice() {
    invalidateStudioNotice();
    setAttempt((previous) => previous + 1);
  }
  return (
    <section className="panel wide" aria-labelledby="studio-notice-title">
      <div className="row">
        <div>
          <p className="eyebrow">BEFORE YOU ARRIVE</p>
          <h2 id="studio-notice-title">A note from the studio</h2>
        </div>
        <button type="button" className="secondary" onClick={refreshNotice}>
          Refresh notice
        </button>
      </div>
      <ErrorBoundary
        key={attempt}
        fallback={
          <div role="alert">
            <p>
              We couldn't load the studio notice. Check the connection and try
              again.
            </p>
            <button type="button" onClick={refreshNotice}>
              Try notice again
            </button>
          </div>
        }
      >
        <Suspense fallback={<p role="status">Loading the studio notice…</p>}>
          <StudioNotice />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}
