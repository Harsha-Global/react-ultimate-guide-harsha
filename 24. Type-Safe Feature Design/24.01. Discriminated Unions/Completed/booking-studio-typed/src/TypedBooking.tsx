import { useState } from "react";
import { BookingForm } from "./BookingForm";
import { newGroup, placesFor } from "./bookingTypes";
import type { BookingDraft } from "./bookingTypes";
import type { Slot } from "./slots";

export function TypedBooking({ slot }: { slot: Slot }) {
  const [draft, setDraft] = useState<BookingDraft>({ kind: "individual" });
  return <section className="panel wide">
    <h2>Who is coming?</h2>
    <div className="row" role="group" aria-label="Booking kind">
      <button type="button" aria-pressed={draft.kind === "individual"} onClick={() => setDraft({ kind: "individual" })}>Just me</button>
      <button type="button" aria-pressed={draft.kind === "group"} onClick={() => setDraft(newGroup())}>A group</button>
    </div>
    <p>Places in this booking: {placesFor(draft)}</p>
    {draft.kind === "individual" ? <BookingForm slot={slot} /> : <div>
      <label htmlFor="group-name">Group name</label>
      <input id="group-name" value={draft.groupName} onChange={event => setDraft({ ...draft, groupName: event.target.value })} />
      <p>{draft.attendees.length} attendee places are ready to edit.</p>
      <p className="muted">We are preparing group bookings. This draft is not submitted yet.</p>
    </div>}
  </section>;
}