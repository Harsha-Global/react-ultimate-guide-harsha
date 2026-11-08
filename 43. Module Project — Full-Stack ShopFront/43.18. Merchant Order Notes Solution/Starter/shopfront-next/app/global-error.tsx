'use client';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => { Sentry.captureException(error); }, [error]);
  return <html lang="en">
    <body>
      <h1>ShopFront could not load this page.</h1>
      <p>Please reload and try again.</p>
    </body>
  </html>;
}
