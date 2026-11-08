import { useState } from "react";
import { Shell } from "./Shell";
import { money, slots } from "./slots";
import type { Slot } from "./slots";

export default function App() {
  const [slot, setSlot] = useState<Slot>("morning");
  const selection = slots[slot];
  return (
    <Shell>
      <section className="panel">
        <p className="eyebrow">YOUR NEXT SATURDAY</p>
        <h2>Clay & Colour</h2>
        <p>
          A relaxed two-hour hand-building workshop. Choose the session that
          suits your day.
        </p>
        <div className="slot-grid" role="group" aria-label="Workshop session">
          <button type="button" className="slot-option" aria-pressed={slot === "morning"} onClick={() => setSlot("morning")}>
            <strong>Morning</strong>
            <span>10:00 – 12:00</span>
          </button>
          <button type="button" className="slot-option" aria-pressed={slot === "evening"} onClick={() => setSlot("evening")}>
            <strong>Evening</strong>
            <span>17:00 – 19:00</span>
          </button>
        </div>
        <p className="muted">
          One place · No payment is collected in this example.
        </p>
      </section>
      <aside className="panel summary">
        <p className="eyebrow">YOUR SESSION</p>
        <>
          <h2>{selection.label} at the studio</h2>
          <p>{selection.time}</p>
          <div className="price">
            {money(selection.price)}
            <span>per person</span>
          </div>
        </>
        <ul className="included">
          <li>Clay, tools and glazing</li>
          <li>Small-group guidance</li>
          <li>Tea and a little time to yourself</li>
        </ul>
      </aside>
    </Shell>
  );
}
