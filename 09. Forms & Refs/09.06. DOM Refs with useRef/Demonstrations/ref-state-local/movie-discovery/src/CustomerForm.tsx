import { useState, useId, useRef } from "react";
import type { SubmitEvent } from "react";
import { isCity } from "./customer";
import type { CustomerDraft, Seating } from "./customer";
import { readCustomerForm } from "./readCustomerForm";
import { validateCustomer, hasErrors } from "./validateCustomer";

type Props = { draft: CustomerDraft; onChange: (draft: CustomerDraft) => void };

export default function CustomerForm({ draft, onChange }: Props) {
  const formId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const [submitted, setSubmitted] = useState<CustomerDraft | null>(null);
  const [formMessage, setFormMessage] = useState("");
  const [touched, setTouched] = useState<Partial<Record<keyof CustomerDraft, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const errors = validateCustomer(draft);
  const initialDraft: CustomerDraft = { fullName: "", email: "", city: "Seattle", arrivalMinutes: "15", note: "", updates: false, seating: "aisle" };
  const dirty = (Object.keys(draft) as (keyof CustomerDraft)[]).some(key => draft[key] !== initialDraft[key]);
  function markTouched(field: keyof CustomerDraft) {
    setTouched(current => ({ ...current, [field]: true }));
  }
  function changeText(field: "fullName" | "email" | "arrivalMinutes" | "note", value: string) {
    onChange({ ...draft, [field]: value });
  }
  function changeSeating(seating: Seating) {
    onChange({ ...draft, seating });
  }
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const candidate = readCustomerForm(new FormData(event.currentTarget));
    if (candidate === null) {
      setFormMessage("The form could not be read. Check its named controls.");
      return;
    }
    setAttempted(true);
    const nextErrors = validateCustomer(candidate);
    if (hasErrors(nextErrors)) {
      setFormMessage("Check the highlighted customer details.");
      if (nextErrors.fullName) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.arrivalMinutes) minutesRef.current?.focus();
      else if (nextErrors.note) noteRef.current?.focus();
      return;
    }
    setSubmitted(candidate);
    setFormMessage("Customer details submitted locally. No reservation was sent.");
  }
  const fullNameError = (touched.fullName || attempted) ? errors.fullName : undefined;
  const emailError = (touched.email || attempted) ? errors.email : undefined;
  const arrivalMinutesError = (touched.arrivalMinutes || attempted) ? errors.arrivalMinutes : undefined;
  const noteError = (touched.note || attempted) ? errors.note : undefined;
  return (
    <form className="customer-form" onSubmit={handleSubmit} noValidate>
      {attempted && hasErrors(errors) && <div className="error-summary" role="alert">Please correct the fields marked below. Your input is preserved.</div>}
      <div className="fields">
        <div className="field">
          <label htmlFor={`${formId}-fullName`}>Full name</label>
          <input id={`${formId}-fullName`} name="fullName" ref={nameRef} type="text" required autoComplete="name" value={draft.fullName} onChange={event => changeText("fullName", event.currentTarget.value)} onBlur={() => markTouched("fullName")} aria-invalid={fullNameError ? true : undefined} aria-describedby={fullNameError ? `${formId}-fullName-error` : undefined} />
          {fullNameError && <p id={`${formId}-fullName-error`} className="error">{fullNameError}</p>}
        </div>
        <div className="field">
          <label htmlFor={`${formId}-email`}>Email</label>
          <input id={`${formId}-email`} name="email" ref={emailRef} type="email" required autoComplete="email" value={draft.email} onChange={event => changeText("email", event.currentTarget.value)} onBlur={() => markTouched("email")} aria-invalid={emailError ? true : undefined} aria-describedby={emailError ? `${formId}-email-error` : undefined} />
          {emailError && <p id={`${formId}-email-error`} className="error">{emailError}</p>}
        </div>
        <div className="field">
          <label htmlFor={`${formId}-arrivalMinutes`}>Minutes before show</label>
          <input id={`${formId}-arrivalMinutes`} name="arrivalMinutes" ref={minutesRef} type="number" required min="0" max="60" step="1" value={draft.arrivalMinutes} onChange={event => changeText("arrivalMinutes", event.currentTarget.value)} onBlur={() => markTouched("arrivalMinutes")} aria-invalid={arrivalMinutesError ? true : undefined} aria-describedby={`${formId}-arrivalMinutes-hint${arrivalMinutesError ? ` ${formId}-arrivalMinutes-error` : ""}`} />
          <p id={`${formId}-arrivalMinutes-hint`} className="hint">A whole number from 0 to 60; zero means arriving at showtime.</p>
          {arrivalMinutesError && <p id={`${formId}-arrivalMinutes-error`} className="error">{arrivalMinutesError}</p>}
        </div>
        <div className="field">
          <label htmlFor={`${formId}-city`}>City</label>
          <select id={`${formId}-city`} name="city" value={draft.city} onChange={event => {
            const city = event.currentTarget.value;
            if (isCity(city)) onChange({ ...draft, city });
          }}><option value="Seattle">Seattle</option><option value="Boston">Boston</option></select>
        </div>
        <div className="field">
          <label htmlFor={`${formId}-note`}>Seating note</label>
          <textarea id={`${formId}-note`} name="note" ref={noteRef} value={draft.note} onChange={event => changeText("note", event.currentTarget.value)} onBlur={() => markTouched("note")} aria-invalid={noteError ? true : undefined} aria-describedby={`${formId}-note-hint${noteError ? ` ${formId}-note-error` : ""}`} />
          <p id={`${formId}-note-hint`} className="hint">Optional; up to 200 characters. Do not enter sensitive information.</p>
          {noteError && <p id={`${formId}-note-error`} className="error">{noteError}</p>}
        </div>
      </div>
      <fieldset><legend>Preferred seating</legend>
        <label className="choice"><input type="radio" name="seating" value="aisle" checked={draft.seating === "aisle"} onChange={() => changeSeating("aisle")} />Aisle</label>
        <label className="choice"><input type="radio" name="seating" value="center" checked={draft.seating === "center"} onChange={() => changeSeating("center")} />Center</label>
      </fieldset>
      <label className="choice"><input type="checkbox" name="updates" value="yes" checked={draft.updates} onChange={event => onChange({ ...draft, updates: event.currentTarget.checked })} />Email booking updates</label>
      <div className="draft-summary">Draft: {draft.fullName || "No name yet"} · {draft.city} · {draft.seating} · Arrival: {draft.arrivalMinutes === "" ? "not entered" : `${draft.arrivalMinutes} minutes`}</div>
      <p>{dirty ? "Draft has changes." : "Draft matches its defaults."}</p>
      <div className="actions"><button type="submit">Submit customer details</button>
        <button type="button" onClick={() => changeText("note", "")}>Clear seating note</button>
      </div>
      <p role="status">{formMessage}</p>
      {submitted && <div className="receipt"><strong>Last submitted details</strong><p>{submitted.fullName} · {submitted.email} · {submitted.city} · {submitted.arrivalMinutes} minutes · {submitted.seating}</p><p>Updates: {submitted.updates ? "yes" : "no"}; Note: {submitted.note || "none"}</p></div>}
    </form>
  );
}
