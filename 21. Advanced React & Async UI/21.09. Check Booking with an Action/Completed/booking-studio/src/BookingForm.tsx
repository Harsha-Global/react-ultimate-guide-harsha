import { useActionState, useId, useRef, useState } from "react";
import { NameField } from "./NameField";
import type { NameFieldHandle } from "./NameField";
import { slots } from "./slots";
import type { Slot } from "./slots";
type BookingState = {
  status: "idle" | "error" | "checked";
  message: string;
};
const initialState: BookingState = {
  status: "idle",
  message: "",
};
export function BookingForm({ slot }: { slot: Slot }) {
  const id = useId();
  const nameRef = useRef<NameFieldHandle>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  function checkBooking(
    _previousState: BookingState,
    formData: FormData,
  ): BookingState {
    const submittedSlot = formData.get("slot");
    if (submittedSlot !== "morning" && submittedSlot !== "evening")
      return { status: "error", message: "Choose a session before checking." };
    const submittedName = String(formData.get("guestName") ?? "").trim();
    if (submittedName.length < 2)
      return { status: "error", message: "Enter at least two characters for your name." };
    return {
      status: "checked",
      message: `Details checked for ${submittedName}, for the ${slots[submittedSlot].label.toLowerCase()} session. No booking request has been sent.`,
    };
  }
  const [state, formAction, isPending] = useActionState(
    checkBooking,
    initialState,
  );
  return (
    <section className="panel wide">
      <p className="eyebrow">YOUR VISIT</p>
      <h2>Check your details.</h2>
      <p>
        Check your details for the {slots[slot].label.toLowerCase()} session. No
        request will be sent.
      </p>
      <form action={formAction} aria-busy={isPending}>
        <input type="hidden" name="slot" value={slot} />
        <button type="button" className="secondary" disabled={isPending} onClick={() => nameRef.current?.focus()}>
          Edit guest name
        </button>
        <NameField ref={nameRef} value={name} onValueChange={setName} required disabled={isPending} />
        <div className="field">
          <label htmlFor={id}>Email address</label>
          <input id={id} type="email" name="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required disabled={isPending} />
        </div>
        <button type="submit" disabled={isPending}>
          Check booking details
        </button>
        {!isPending && state.message && (
          <p role={state.status === "error" ? "alert" : "status"} className={state.status === "error" ? "error" : "notice"}>
            {state.message}
          </p>
        )}
      </form>
    </section>
  );
}
