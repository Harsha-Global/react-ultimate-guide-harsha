import { useState } from "react";
import type { SubmitEvent } from "react";
import { isCity } from "./customer";
import type { CustomerDraft, Seating } from "./customer";
import { readCustomerForm } from "./readCustomerForm";
import { validateCustomer, hasErrors } from "./validateCustomer";
import type { FieldErrors } from "./validateCustomer";

type Props = { draft: CustomerDraft; onChange: (draft: CustomerDraft) => void };

export default function CustomerForm({ draft, onChange }: Props) {
  const [submitted, setSubmitted] = useState<CustomerDraft | null>(null);
  const [formMessage, setFormMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
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
    const nextErrors = validateCustomer(candidate);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      setFormMessage("Check the highlighted customer details.");
      return;
    }
    setSubmitted(candidate);
    setFormMessage("Customer details submitted locally. No reservation was sent.");
  }
  const fullNameError = errors.fullName;
  const emailError = errors.email;
  const arrivalMinutesError = errors.arrivalMinutes;
  const noteError = errors.note;
  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <div className="fields">
        <div className="field">
          <label htmlFor="customer-fullName">Full name</label>
          <input id="customer-fullName" name="fullName" type="text" required autoComplete="name" value={draft.fullName} onChange={event => changeText("fullName", event.currentTarget.value)} />
          {fullNameError && <p className="error">{fullNameError}</p>}
        </div>
        <div className="field">
          <label htmlFor="customer-email">Email</label>
          <input id="customer-email" name="email" type="email" required autoComplete="email" value={draft.email} onChange={event => changeText("email", event.currentTarget.value)} />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="field">
          <label htmlFor="customer-arrivalMinutes">Minutes before show</label>
          <input id="customer-arrivalMinutes" name="arrivalMinutes" type="number" required min="0" max="60" step="1" value={draft.arrivalMinutes} onChange={event => changeText("arrivalMinutes", event.currentTarget.value)} />
          <p className="hint">A whole number from 0 to 60; zero means arriving at showtime.</p>
          {arrivalMinutesError && <p className="error">{arrivalMinutesError}</p>}
        </div>
        <div className="field">
          <label htmlFor="customer-city">City</label>
          <select id="customer-city" name="city" value={draft.city} onChange={event => {
            const city = event.currentTarget.value;
            if (isCity(city)) onChange({ ...draft, city });
          }}><option value="Seattle">Seattle</option><option value="Boston">Boston</option></select>
        </div>
        <div className="field">
          <label htmlFor="customer-note">Seating note</label>
          <textarea id="customer-note" name="note" value={draft.note} onChange={event => changeText("note", event.currentTarget.value)} />
          <p className="hint">Optional; up to 200 characters. Do not enter sensitive information.</p>
          {noteError && <p className="error">{noteError}</p>}
        </div>
      </div>
      <fieldset><legend>Preferred seating</legend>
        <label className="choice"><input type="radio" name="seating" value="aisle" checked={draft.seating === "aisle"} onChange={() => changeSeating("aisle")} />Aisle</label>
        <label className="choice"><input type="radio" name="seating" value="center" checked={draft.seating === "center"} onChange={() => changeSeating("center")} />Center</label>
      </fieldset>
      <label className="choice"><input type="checkbox" name="updates" value="yes" checked={draft.updates} onChange={event => onChange({ ...draft, updates: event.currentTarget.checked })} />Email booking updates</label>
      <div className="draft-summary">Draft: {draft.fullName || "No name yet"} · {draft.city} · {draft.seating} · Arrival: {draft.arrivalMinutes === "" ? "not entered" : `${draft.arrivalMinutes} minutes`}</div>
      <div className="actions"><button type="submit">Submit customer details</button>
        <button type="button" onClick={() => changeText("note", "")}>Clear seating note</button>
      </div>
      <p role="status">{formMessage}</p>
      {submitted && <div className="receipt"><strong>Last submitted details</strong><p>{submitted.fullName} · {submitted.email} · {submitted.city} · {submitted.arrivalMinutes} minutes · {submitted.seating}</p><p>Updates: {submitted.updates ? "yes" : "no"}; Note: {submitted.note || "none"}</p></div>}
    </form>
  );
}
