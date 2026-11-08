import test from 'node:test';
import assert from 'node:assert/strict';
import Sentry from '@sentry/nextjs';
import { telemetryPrivacy } from '../lib/telemetryPrivacy.ts';
test('the installed SDK filters an event before the transport receives it',async()=>{
  const envelopes=[];
  Sentry.init({...telemetryPrivacy,dsn:'http://public@127.0.0.1:3999/1',defaultIntegrations:false,
    transport:()=>({send:async envelope=>{envelopes.push(envelope);return {statusCode:200};},flush:async()=>true}),
  });
  try {
    Sentry.setUser({email:'alex@example.test'});Sentry.setExtra('privateOrder','Secret note');
    const id=Sentry.captureException(new Error('ShopFront controlled telemetry check'));
    await Sentry.flush(2000);
    const event=envelopes.flatMap(envelope=>envelope[1]).find(item=>item[0].type==='event')?.[1];
    assert.ok(event);assert.equal(event.event_id,id);assert.equal(event.user,undefined);assert.equal(event.extra,undefined);
    assert.equal(event.exception.values[0].value,'ShopFront controlled telemetry check');
    assert.doesNotMatch(JSON.stringify(event),/alex@example|Secret note/);
  }finally{await Sentry.getClient()?.close(2000);}
});
