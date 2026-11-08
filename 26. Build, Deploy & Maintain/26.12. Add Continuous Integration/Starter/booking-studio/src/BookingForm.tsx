import { BookingSubmit } from "./BookingSubmit";
import { Fragment, useActionState, useId, useRef, useState } from "react";
import { NameField } from "./NameField";
import type { FragmentInstance } from "react";
import { createBooking, BookingRequestError } from "./bookingApi";
import type { Confirmation } from "./bookingApi";
import { slots } from "./slots";
import type { Slot } from "./slots";
type BookingState = {
  status: "idle" | "error" | "success";
  message: string;
  confirmation: Confirmation | null;
};
const initialState: BookingState = {
  status: "idle",
  message: "",
  confirmation: null,
};
export function BookingForm({ slot }: { slot: Slot }) {
  const id = useId();
  const detailsRef = useRef<FragmentInstance>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requestId] = useState(() => crypto.randomUUID());
  async function submitBooking(
    _previousState: BookingState,
    formData: FormData,
  ): Promise<BookingState> {
    const submittedSlot = formData.get("slot");
    if (submittedSlot !== "morning" && submittedSlot !== "evening")
      return {
        status: "error",
        message: "Choose a session before submitting.",
        confirmation: null,
      };
    try {
      const confirmation = await createBooking({
        requestId,
        name: String(formData.get("guestName") ?? ""),
        email: String(formData.get("email") ?? ""),
        slot: submittedSlot,
      });
      return {
        status: "success",
        message: `Your ${slots[confirmation.slot].label.toLowerCase()} place is booked, ${confirmation.name}. Reference: ${confirmation.reference}.`,
        confirmation,
      };
    } catch (error) {
      if (error instanceof BookingRequestError)
        return { status: "error", message: error.message, confirmation: null };
      throw error;
    }
  }
  const [state, formAction, isPending] = useActionState(
    submitBooking,
    initialState,
  );
  const completed = state.status === "success";
  return (
    <section className="panel wide">
      <p className="eyebrow">YOUR VISIT</p>
      <h2>Save your place.</h2>
      <p>
        Book one place for the {slots[slot].label.toLowerCase()} session. No
        payment is collected.
      </p>
      <form action={formAction} aria-busy={isPending}>
        <input type="hidden" name="slot" value={slot} />
        <div className="row">
          <button type="button" className="secondary" disabled={isPending || completed} onClick={() => detailsRef.current?.focus()}>
            Edit guest details
          </button>
          <button type="button" className="secondary" disabled={isPending || completed} onClick={() => detailsRef.current?.focusLast()}>
            Edit email address
          </button>
        </div>
        <Fragment ref={detailsRef}>
          <NameField value={name} onValueChange={setName} required disabled={isPending || completed} />
          <div className="field">
            <label htmlFor={id}>Email address</label>
            <input id={id} type="email" name="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required disabled={isPending || completed} />
          </div>
        </Fragment>
        <BookingSubmit completed={completed} />
        {!isPending && state.message && (
          <p role={state.status === "error" ? "alert" : "status"} className={state.status === "error" ? "error" : "notice"}>
            {state.message}
          </p>
        )}
      </form>
    </section>
  );
}
