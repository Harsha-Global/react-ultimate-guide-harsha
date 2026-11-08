import { TemplatePicker } from "./TemplatePicker";
import { groupTemplates } from "./bookingChoices";
import { GroupDetails } from "./GroupDetails";
import { useState } from "react";
import { BookingForm } from "./BookingForm";
import { newGroup, placesFor } from "./bookingTypes";
import type { BookingDraft } from "./bookingTypes";
import type { Slot } from "./slots";
export function TypedBooking({ slot }: {
    slot: Slot;
}) {
    const [draft, setDraft] = useState<BookingDraft>({ kind: "individual" });
    return <section className="panel wide"><h2>Who is coming?</h2><div className="row" role="group" aria-label="Booking kind">
    <button type="button" aria-pressed={draft.kind === "individual"} onClick={() => setDraft({ kind: "individual" })}>Just me</button>
    <button type="button" aria-pressed={draft.kind === "group"} onClick={() => setDraft(newGroup())}>A group</button></div>
    <p>Places in this booking: {placesFor(draft)}</p>
    {draft.kind === "individual" ? <BookingForm slot={slot}/> : <div><p>Choose a starting size before entering names. Choosing again replaces those names.</p><TemplatePicker options={groupTemplates} selectedId={groupTemplates.find(item => item.places === draft.attendees.length)?.id ?? ""} onSelect={option => setDraft({ ...draft, attendees: Array.from({ length: option.places }, () => ({ id: crypto.randomUUID(), name: "" })) })}/><GroupDetails mode="edit" booking={draft} onChange={setDraft}/><GroupDetails mode="review" booking={draft}/><p className="muted">This group draft is not submitted yet.</p></div>}
  </section>;
}
