import * as Sentry from '@sentry/nextjs';
import { telemetryPrivacy } from './lib/telemetryPrivacy';
Sentry.init({ ...telemetryPrivacy, dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN), replaysSessionSampleRate: 0, replaysOnErrorSampleRate: 0 });
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
