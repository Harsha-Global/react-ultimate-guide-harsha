'use client';
import { useState } from 'react';
export function TelemetryPanel() {
  const [message,setMessage]=useState('');const [busy,setBusy]=useState(false);
  async function check() {
    setBusy(true);
    try {const response=await fetch('/api/workshop/telemetry-test',{method:'POST'});const result=await response.json();setMessage(response.ok?`SDK event ${result.eventId}. Find this event in Sentry to confirm delivery.`:result.error??'Test capture is disabled.');}
    catch {setMessage('Test capture is unavailable.');}finally{setBusy(false);}
  }
  return (
    <section className="fs-card">
      <h2>Controlled error check</h2>
      <p>Use only the separate course telemetry project.</p>
      <button disabled={busy} onClick={check}>Send controlled test error</button>
      <p role="status">{message}</p>
    </section>
  );
}
