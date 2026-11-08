import { isCity } from "./customer";
import type { CustomerDraft, Seating } from "./customer";

type Props = { draft: CustomerDraft; onChange: (draft: CustomerDraft) => void };

export default function CustomerForm({ draft, onChange }: Props) {
  function changeText(field: "fullName" | "email" | "arrivalMinutes" | "note", value: string) {
    onChange({ ...draft, [field]: value });
  }
  function changeSeating(seating: Seating) {
    onChange({ ...draft, seating });
  }
  return (
    <section className="customer-form" aria-label="Customer draft">
      <div className="fields">
        <div className="field">
          <label htmlFor="customer-fullName">Full name</label>
          <input id="customer-fullName" name="fullName" type="text" autoComplete="name" value={draft.fullName} onChange={event => changeText("fullName", event.currentTarget.value)} />
        </div>
        <div className="field">
          <label htmlFor="customer-email">Email</label>
          <input id="customer-email" name="email" type="email" autoComplete="email" value={draft.email} onChange={event => changeText("email", event.currentTarget.value)} />
        </div>
        <div className="field">
          <label htmlFor="customer-arrivalMinutes">Minutes before show</label>
          <input id="customer-arrivalMinutes" name="arrivalMinutes" type="number" value={draft.arrivalMinutes} onChange={event => changeText("arrivalMinutes", event.currentTarget.value)} />
          <p className="hint">A whole number from 0 to 60; zero means arriving at showtime.</p>
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
        </div>
      </div>
      <fieldset><legend>Preferred seating</legend>
        <label className="choice"><input type="radio" name="seating" value="aisle" checked={draft.seating === "aisle"} onChange={() => changeSeating("aisle")} />Aisle</label>
        <label className="choice"><input type="radio" name="seating" value="center" checked={draft.seating === "center"} onChange={() => changeSeating("center")} />Center</label>
      </fieldset>
      <label className="choice"><input type="checkbox" name="updates" value="yes" checked={draft.updates} onChange={event => onChange({ ...draft, updates: event.currentTarget.checked })} />Email booking updates</label>
      <div className="draft-summary">Draft: {draft.fullName || "No name yet"} · {draft.city} · {draft.seating} · Arrival: {draft.arrivalMinutes === "" ? "not entered" : `${draft.arrivalMinutes} minutes`}</div>
    </section>
  );
}
