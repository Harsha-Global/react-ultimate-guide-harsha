import type { Attendee, BookingDraft } from "./bookingTypes";

export type BookingAction = {
  type: "groupRenamed";
  name: string;
} | {
  type: "replaced";
  draft: BookingDraft;
} | {
  type: "attendeeAdded";
  attendee: Attendee;
} | {
  type: "attendeeRemoved";
  id: string;
};

export function assertNever(value: never): never {
  throw new Error("Unexpected booking action: " + JSON.stringify(value));
}

export function bookingReducer(state: BookingDraft, action: BookingAction): BookingDraft {
  switch (action.type) {
    case "replaced":
      return action.draft;
    case "attendeeAdded":
      if (state.kind !== "group" || state.attendees.length >= 8 || state.attendees.some(item => item.id === action.attendee.id))
        return state;
      return { ...state, attendees: [...state.attendees, action.attendee] };
    case "attendeeRemoved":
      if (state.kind !== "group" || state.attendees.length <= 2)
        return state;
      return { ...state, attendees: state.attendees.filter(item => item.id !== action.id) };
    default:
      return assertNever(action);
  }
}