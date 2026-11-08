import { useEffect, useState, useSyncExternalStore } from "react";
import { clearMeasurements, getMeasurements, observeLongTasks, subscribeMeasurements } from "./measurements";
export function MeasurementPanel() {
  const [open, setOpen] = useState(false);
  const entries = useSyncExternalStore(subscribeMeasurements, getMeasurements);
  useEffect(observeLongTasks, []);
  return (
    <aside className="measurement-panel">
      <button type="button" className="quiet" aria-expanded={open} aria-controls="measurements" onClick={() => setOpen((value) => !value)}>
        {open ? "Close" : "Open"} measurement panel
      </button>
      {open && (
        <section id="measurements">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COURSE MEASUREMENT TOOLS</p>
              <h2>Observe one interaction</h2>
            </div>
            <button type="button" className="quiet" onClick={clearMeasurements}>
              Clear measurements
            </button>
          </div>
          <p className="metric-note">
            React render = profiled subtree work. Event to frame = handler start
            to the next animation callback, not paint time or INP. Long tasks
            use the browser API when supported. Timings vary by device and
            build.
          </p>
          <div className="table-scroll">
            <table>
              <caption>Last twenty observations</caption>
              <thead>
                <tr>
                  <th>Kind</th>
                  <th>Interaction or tree</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.kind}</td>
                    <td>{entry.label}</td>
                    <td>{entry.duration.toFixed(1)} ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {entries.length === 0 && (
            <p>No observations yet. Perform the interaction being measured.</p>
          )}
        </section>
      )}
    </aside>
  );
}
