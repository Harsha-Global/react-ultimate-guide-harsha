import { OptionPicker } from "./OptionPicker";
import { groupTemplates } from "./bookingChoices";
import { GroupDetails } from "./GroupDetails";
import { bookingReducer } from "./bookingReducer";
import { useReducer } from "react";
import { TypedBookingForm } from "./TypedBookingForm";
import { newGroup, placesFor } from "./bookingTypes";
import type { BookingDraft } from "./bookingTypes";
import type { Slot } from "./slots";

export function TypedBooking({ slot, locked, onLockedChange }: {
  slot: Slot;
  locked: boolean;
  onLockedChange: (locked: boolean) => void;
}) {
  const [draft, dispatch] = useReducer(bookingReducer, { kind: "individual" });
  function setDraft(draft: BookingDraft) {
    dispatch({ type: "replaced", draft });
  }
  return <section className="panel wide">
    <h2>Who is coming?</h2>
    <fieldset disabled={locked} className="booking-choices">
      <legend>Booking details</legend>
      <div className="row" role="group" aria-label="Booking kind">
        <button type="button" aria-pressed={draft.kind === "individual"} onClick={() => setDraft({ kind: "individual" })}>Just me</button>
        <button type="button" aria-pressed={draft.kind === "group"} onClick={() => setDraft(newGroup())}>A group</button>
      </div>
      <p>Places in this booking: {placesFor(draft)}</p>
      {draft.kind === "individual" ? <p>One place, for the guest named below.</p> : <div>
        <p>Choose a starting size before entering names. Choosing again replaces those names.</p>
        <OptionPicker label="Starting group size" options={groupTemplates} selectedId={groupTemplates.find(item => item.places === draft.attendees.length)?.id ?? ""} getLabel={option => option.title} onSelect={option => setDraft({
          ...draft,
          attendees: Array.from({ length: option.places }, () => ({ id: crypto.randomUUID(), name: "" })),
        })} />
        <GroupDetails mode="edit" booking={draft} onChange={setDraft} />
        <div className="row">
          <button type="button" disabled={draft.attendees.length >= 8} onClick={() => dispatch({ type: "attendeeAdded", attendee: { id: crypto.randomUUID(), name: "" } })}>Add attendee</button>
          {draft.attendees.map((attendee, index) => <button type="button" key={attendee.id} disabled={draft.attendees.length <= 2} onClick={() => dispatch({ type: "attendeeRemoved", id: attendee.id })}>Remove attendee {index + 1}</button>)}
        </div>
        <GroupDetails mode="review" booking={draft} />
      </div>}
    </fieldset>
    <TypedBookingForm draft={draft} slot={slot} onLockedChange={onLockedChange} />
  </section>;
}