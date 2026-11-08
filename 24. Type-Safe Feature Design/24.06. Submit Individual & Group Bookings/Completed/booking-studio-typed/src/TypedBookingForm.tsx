import { useActionState, useEffect, useId, useState } from "react";
import { bookingRequestSchema } from "../shared/bookingSchema";
import type { BookingConfirmation } from "../shared/bookingSchema";
import type { BookingDraft } from "./bookingTypes";
import type { Slot } from "./slots";
import { submitTypedBooking } from "./typedBookingApi";

type FormState = {
  message: string;
  confirmation: BookingConfirmation | null;
};

const initialState: FormState = { message: "", confirmation: null };

export function TypedBookingForm({ draft, slot, onLockedChange }: {
  draft: BookingDraft;
  slot: Slot;
  onLockedChange: (locked: boolean) => void;
}) {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requestId] = useState(() => crypto.randomUUID());

  async function submit(_previous: FormState, data: FormData): Promise<FormState> {
    const checked = bookingRequestSchema.safeParse({ ...draft, slot, requestId, name: data.get("name"), email: data.get("email") });
    if (!checked.success)
      return { message: "Check the contact details and every name in this booking.", confirmation: null };
    try {
      return { message: "Your booking is confirmed.", confirmation: await submitTypedBooking(checked.data) };
    } catch (error) {
      return { message: error instanceof Error ? error.message : "We could not confirm the result. Keep the same details when you retry.", confirmation: null };
    }
  }

  const [state, formAction, pending] = useActionState(submit, initialState);
  useEffect(() => {
    onLockedChange(pending || state.confirmation !== null);
  }, [pending, state.confirmation, onLockedChange]);
  if (state.confirmation)
    return <div role="status">
      <h3>Your booking is confirmed.</h3>
      <p>{state.confirmation.places} {state.confirmation.places === 1 ? "place" : "places"} · {state.confirmation.slot} session · {state.confirmation.reference}</p>
      <p><a href="/">Start another booking</a></p>
    </div>;

  return <form className="typed-form" action={formAction} aria-busy={pending}>
    <fieldset disabled={pending}>
      <legend>{draft.kind === "group" ? "Group contact" : "Guest details"}</legend>
      <label htmlFor={id + "-name"}>Contact name</label>
      <input id={id + "-name"} name="name" value={name} onChange={event => setName(event.target.value)} required />
      <label htmlFor={id + "-email"}>Email address</label>
      <input id={id + "-email"} name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} required />
      <button type="submit" disabled={pending}>{pending ? "Saving booking…" : "Book this visit"}</button>
    </fieldset>
    {!pending && state.message && <p role="alert">{state.message}</p>}
  </form>;
}