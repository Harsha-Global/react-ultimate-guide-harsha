type Attendee = { id: string; name: string };
type BookingDraft = { kind: "individual" } | { kind: "group"; groupName: string; attendees: readonly Attendee[] };
function requiredPlaces(booking: BookingDraft): number {
  // TODO: narrow the booking kind before reading group fields.
  return 1;
}
