import { useState } from "react";
import { Booking } from "./Booking";
import { Shell } from "./Shell";
import { Dialog } from "./Dialog";
import { WorkshopSearch } from "./WorkshopSearch";
import { MaterialsHelp } from "./MaterialsHelp";
import { BookingForm } from "./BookingForm";
import { ErrorBoundary } from "./ErrorBoundary";
import { ReviewsPanel } from "./ReviewsPanel";
import { money } from "./slots";
import type { Slot } from "./slots";

export default function App() {
  const [slot, setSlot] = useState<Slot>("morning");
  const [detailsOpen, setDetailsOpen] = useState(false);
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
          <MaterialsHelp />
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
          <button
            type="button"
            className="secondary"
            onClick={() => setDetailsOpen(true)}
          >
            View session details
          </button>
          <ul className="included">
            <li>Clay, tools and glazing</li>
            <li>Small-group guidance</li>
            <li>Tea and a little time to yourself</li>
          </ul>
        </aside>
        {detailsOpen && (
          <Dialog
            title="Your studio session"
            onClose={() => setDetailsOpen(false)}
          >
            <Booking.Summary>
              {(selection) => (
                <>
                  <p>
                    {selection.label} · {selection.time}
                  </p>
                  <p>
                    Your place costs {money(selection.price)}, including
                    materials and glazing.
                  </p>
                </>
              )}
            </Booking.Summary>
            <p>This panel reviews the session. It does not place a booking.</p>
          </Dialog>
        )}
        <ErrorBoundary
          fallback={
            <section className="panel wide" role="alert">
              <h2>The booking form could not continue.</h2>
              <p>
                Reload the page to start again. Unsaved entries will be lost.
              </p>
              <button type="button" onClick={() => window.location.reload()}>
                Reload page
              </button>
            </section>
          }
        >
          <BookingForm slot={slot} />
        </ErrorBoundary>
        <WorkshopSearch />
        <ReviewsPanel />
      </Booking.Root>
    </Shell>
  );
}
