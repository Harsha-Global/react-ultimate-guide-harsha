import { useState } from "react";
import { Booking } from "./Booking";
import { Shell } from "./Shell";
import { money } from "./slots";
import type { Slot } from "./slots";

export default function App() {
  const [slot, setSlot] = useState<Slot>("morning");
  return (
    <Shell>
      <Booking.Root value={slot} onChange={setSlot}>
        <section className="panel">
          <p className="eyebrow">YOUR NEXT SATURDAY</p>
          <h2>Clay & Colour</h2>
          <p>
            A relaxed two-hour hand-building workshop. Choose the session that
            suits your day.
          </p>
          <div className="slot-grid" role="group" aria-label="Workshop session">
            <Booking.Option value="morning" />
            <Booking.Option value="evening" />
          </div>
          <p className="muted">
            One place · No payment is collected in this example.
          </p>
        </section>
        <aside className="panel summary">
          <p className="eyebrow">YOUR SESSION</p>
          <Booking.Summary>
            {(selection) => (
              <>
                <h2>{selection.label} at the studio</h2>
                <p>{selection.time}</p>
                <div className="price">
                  {money(selection.price)}
                  <span>per person</span>
                </div>
              </>
            )}
          </Booking.Summary>
          <ul className="included">
            <li>Clay, tools and glazing</li>
            <li>Small-group guidance</li>
            <li>Tea and a little time to yourself</li>
          </ul>
        </aside>
      </Booking.Root>
    </Shell>
  );
}
