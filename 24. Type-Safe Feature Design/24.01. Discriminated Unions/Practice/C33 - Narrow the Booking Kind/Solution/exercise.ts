type Attendee = { id: string; name: string };
type BookingDraft = { kind: "individual" } | { kind: "group"; groupName: string; attendees: readonly Attendee[] };
function requiredPlaces(booking: BookingDraft): number {
  if (booking.kind === "individual") return 1;
  return booking.attendees.length;
}
