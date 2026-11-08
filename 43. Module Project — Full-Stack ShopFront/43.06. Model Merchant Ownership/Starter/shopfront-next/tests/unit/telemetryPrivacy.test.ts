import { expect, test } from 'vitest';
import { redactTelemetry, telemetryPrivacy } from '@/lib/telemetryPrivacy';
test('keeps a useful controlled error while discarding private payloads', () => {
  const result=redactTelemetry({type:undefined, event_id:'a'.repeat(32),user:{email:'alex@example.test'},request:{url:'https://example.com/reset?token=secret',data:'password'},extra:{order:'private'},breadcrumbs:[{message:'private note'}],exception:{values:[{type:'Error',value:'ShopFront controlled telemetry check',stacktrace:{frames:[{filename:'file:///private/course/app/page.tsx?token=secret',lineno:12,colno:4,vars:{secret:'value'}}]}}]} });
  const text=JSON.stringify(result);expect(text).not.toMatch(/alex|password|private|token|secret/);
  expect(result.exception?.values?.[0].value).toBe('ShopFront controlled telemetry check');
  expect(result.exception?.values?.[0].stacktrace?.frames?.[0].filename).toBe('page.tsx');
  expect(redactTelemetry({type:undefined,exception:{values:[{value:'Customer alex@example.test failed'}]}}).exception?.values?.[0].value).toBe('Application error');
  expect(telemetryPrivacy.beforeSendLog()).toBe(null);expect(telemetryPrivacy.beforeSendMetric()).toBe(null);
});
