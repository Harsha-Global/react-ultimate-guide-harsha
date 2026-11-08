import * as Sentry from '@sentry/nextjs';
import { telemetryPrivacy } from './lib/telemetryPrivacy';
Sentry.init({ ...telemetryPrivacy, dsn: process.env.SENTRY_DSN, enabled: Boolean(process.env.SENTRY_DSN) });
