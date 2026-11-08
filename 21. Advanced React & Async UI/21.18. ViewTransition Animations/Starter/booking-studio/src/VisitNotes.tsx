import { Activity, useEffect, useId, useState } from "react";

function VisitNotes() {
  const id = useId();
  const [notes, setNotes] = useState("");
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    function updateConnection() {
      setOnline(navigator.onLine);
    }
    updateConnection();
    window.addEventListener("online", updateConnection);
    window.addEventListener("offline", updateConnection);
    return () => {
      window.removeEventListener("online", updateConnection);
      window.removeEventListener("offline", updateConnection);
    };
  }, []);
  return (
    <div className="visit-notes">
      <label htmlFor={id}>Notes for my visit</label>
      <textarea id={id} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="An idea for the piece I want to make…" />
      <p className="muted">
        These notes stay on this page only. Reloading clears them.
      </p>
      <p className="muted" role="status">
        {online
          ? "Your browser reports it is online."
          : "Your browser reports it is offline."}{" "}
        This does not check the studio service.
      </p>
    </div>
  );
}

export function VisitNotesPanel() {
  const [show, setShow] = useState(true);
  const id = useId();
  return (
    <section className="panel wide" aria-labelledby={`${id}-heading`}>
      <div className="row">
        <div>
          <p className="eyebrow">A SMALL PLAN</p>
          <h2 id={`${id}-heading`}>Make it your own.</h2>
        </div>
        <button type="button" className="secondary" aria-expanded={show} aria-controls={`${id}-notes`} onClick={() => setShow((value) => !value)}>
          {show ? "Hide visit notes" : "Show visit notes"}
        </button>
      </div>
      <Activity mode={show ? "visible" : "hidden"}>
        <div id={`${id}-notes`}>
          <VisitNotes />
        </div>
      </Activity>
    </section>
  );
}
