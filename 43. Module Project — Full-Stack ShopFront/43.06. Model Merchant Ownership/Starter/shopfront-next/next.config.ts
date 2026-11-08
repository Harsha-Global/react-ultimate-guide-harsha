import { withSentryConfig } from '@sentry/nextjs/config';
import type { NextConfig } from 'next';
const config: NextConfig = {
 reactStrictMode: true,
 cacheComponents: true,
 partialPrefetching: true,
 poweredByHeader: false,
 async headers() { return [{ source: '/:path*', headers: [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'same-origin' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'" },
 ] }]; },
};
export default withSentryConfig(config, { silent: true, telemetry: false, sourcemaps: { disable: true } });
