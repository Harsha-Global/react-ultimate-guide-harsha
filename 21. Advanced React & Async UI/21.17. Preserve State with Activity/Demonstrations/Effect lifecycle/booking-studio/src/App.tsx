import { Activity, useCallback, useEffect, useState } from "react";

function Draft({
  onTick,
  onEffect,
}: {
  onTick: () => void;
  onEffect: (event: string) => void;
}) {
  const [draft, setDraft] = useState("");
  useEffect(() => {
    onEffect("Effect setup / interval started");
    const timer = window.setInterval(onTick, 1000);
    return () => {
      window.clearInterval(timer);
      onEffect("Effect cleanup / interval stopped");
    };
  }, [onTick, onEffect]);
  return (
    <div>
      <label htmlFor="draft">Visit note</label>
      <textarea id="draft" value={draft} onChange={(event) => setDraft(event.target.value)} />
    </div>
  );
}
export default function App() {
  const [show, setShow] = useState(true);
  const [ticks, setTicks] = useState(0);
  const [events, setEvents] = useState<string[]>([]);
  const onTick = useCallback(() => setTicks((value) => value + 1), []);
  const onEffect = useCallback(
    (event: string) => setEvents((value) => [...value.slice(-7), event]),
    [],
  );
  return (
    <main>
      <section className="panel">
        <p className="eyebrow">ISOLATED EFFECT DEMONSTRATION</p>
        <h1>Keep the draft. Stop the interval.</h1>
        <button type="button" onClick={() => setShow((value) => !value)}>
          {show ? "Hide draft" : "Show draft"}
        </button>
        <p>
          Interval callbacks received: <output>{ticks}</output>
        </p>
        <Activity mode={show ? "visible" : "hidden"}>
          <Draft onTick={onTick} onEffect={onEffect} />
        </Activity>
        <h2>Effect events</h2>
        <ol>
          {events.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ol>
        <p>
          The development StrictMode check can add a setup, cleanup and setup
          sequence. Watch the final cleanup on hide, then the new setup on
          reveal.
        </p>
      </section>
    </main>
  );
}
