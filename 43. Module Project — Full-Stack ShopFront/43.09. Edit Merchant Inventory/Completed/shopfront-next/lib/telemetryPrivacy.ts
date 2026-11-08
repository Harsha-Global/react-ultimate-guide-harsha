import type { ErrorEvent } from '@sentry/nextjs';
const controlledMessage = 'ShopFront controlled telemetry check';
export function redactTelemetry(event: ErrorEvent): ErrorEvent {
  return {
    type: undefined, event_id: event.event_id, timestamp: event.timestamp, platform: event.platform,
    level: event.level, environment: 'course-rehearsal', release: 'shopfront-course',
    exception: { values: event.exception?.values?.map(error => ({
      type: 'Error', value: error.value === controlledMessage ? controlledMessage : 'Application error',
      stacktrace: { frames: error.stacktrace?.frames?.map(frame => ({
        filename: frame.filename?.split(/[?#]/)[0].split(/[\\/]/).pop(),
        lineno: frame.lineno, colno: frame.colno, in_app: frame.in_app,
      })) },
    })) },
  };
}
export const telemetryPrivacy = {
  dataCollection: {
    userInfo: false, cookies: false, httpHeaders: false, httpBodies: [], urlQueryParams: false,
    databaseQueryData: false, queues: false, stackFrameVariables: false, frameContextLines: 0,
    graphQL: { document: false, variables: false }, genAI: { inputs: false, outputs: false },
  },
  tracesSampleRate: 0, tracePropagationTargets: [],
  beforeSend: redactTelemetry,   beforeSendLog: () => null, beforeSendMetric: () => null,
};
