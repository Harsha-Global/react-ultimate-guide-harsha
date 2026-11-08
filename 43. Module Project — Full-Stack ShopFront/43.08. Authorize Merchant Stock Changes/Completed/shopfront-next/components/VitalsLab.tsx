'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { startVitals, subscribeVitals, readVitals, readServerVitals } from '@/lib/vitalsStore';
export function VitalsLab() {
  const readings = useSyncExternalStore(subscribeVitals, readVitals, readServerVitals);
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    startVitals();
    const timer = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <p>This local lab keeps readings in this browser. Reload for a fresh navigation.</p>
      <div className="vitals-banner-space" aria-busy={!ready}>
        {ready && (
          <aside className="vitals-banner">
            <strong>Free delivery this week</strong>
            <p>A delayed response has supplied this message.</p>
          </aside>
        )}
      </div>
      <section className="fs-card">
        <h2>Delivery estimate</h2>
        <p>The order details should stay in the same place when the banner arrives.</p>
        <button onClick={() => setCount(value => value + 1)}>Check delivery</button>
        <p>Checks: {count}</p>
      </section>
      <section className="fs-card vitals-readings">
        <h2>Observed page metrics</h2>
        <p>LCP and INP use milliseconds. CLS is a score.</p>
        <dl>
          {['LCP','INP','CLS'].map(name => {const metric=readings.find(item=>item.name===name);return (
            <div key={name}>
              <dt>{name}</dt>
              <dd>{metric ? `${metric.value.toFixed(name==='CLS'?3:0)} · ${metric.rating}` : 'Waiting for a supported browser measurement'}</dd>
            </div>
          );})}
        </dl>
        <p>One local visit is a diagnosis, not a field performance grade.</p>
      </section>
    </>
  );
}
