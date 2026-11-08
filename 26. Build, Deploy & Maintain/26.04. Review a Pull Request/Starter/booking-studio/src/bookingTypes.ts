export type Attendee = {
  id: string;
  name: string;
};

export type IndividualBooking = {
  kind: "individual";
};

export type GroupBooking = {
  kind: "group";
  groupName: string;
  attendees: Attendee[];
};

export type BookingDraft = IndividualBooking | GroupBooking;

export function placesFor(draft: BookingDraft) {
  return draft.kind === "individual" ? 1 : draft.attendees.length;
}

export function newGroup(): GroupBooking {
  return {
    kind: "group",
    groupName: "",
    attendees: [
      { id: crypto.randomUUID(), name: "" },
      { id: crypto.randomUUID(), name: "" },
    ],
  };
}