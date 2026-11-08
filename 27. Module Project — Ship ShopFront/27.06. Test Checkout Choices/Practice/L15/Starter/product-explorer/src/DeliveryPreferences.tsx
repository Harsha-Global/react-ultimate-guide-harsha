import { useRef, useState } from "react";
import type { FormEvent } from "react";
export type DeliveryValues = Readonly<{
    name: string;
    email: string;
    note: string;
}>;
type Field = keyof DeliveryValues;
type Props = Readonly<{
    initialValues?: DeliveryValues;
    onSave: (values: DeliveryValues) => void;
}>;
const emptyValues: DeliveryValues = { name: "", email: "", note: "" };
export function deliveryErrors(values: DeliveryValues): Partial<Record<Field, string>> {
    const errors: Partial<Record<Field, string>> = {};
    if (!values.name.trim())
        errors.name = "Enter a delivery name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
        errors.email = "Enter a valid email address.";
    if (values.note.length > 120)
        errors.note = "Keep the note within 120 characters.";
    return errors;
}
export default function DeliveryPreferences({ initialValues = emptyValues, onSave, }: Props) {
    const [values, setValues] = useState<DeliveryValues>(initialValues);
    const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
    const [attempted, setAttempted] = useState(false);
    const [saved, setSaved] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLTextAreaElement>(null);
    const errors = deliveryErrors(values);
    function update(field: Field, value: string) {
        setValues((current) => ({ ...current, [field]: value }));
        setSaved(false);
    }
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setAttempted(true);
        const firstInvalid = (Object.keys(errors) as Field[])[0];
        if (firstInvalid) {
            ({ name: nameRef, email: emailRef, note: noteRef })[firstInvalid].current?.focus();
            return;
        }
        onSave({
            name: values.name.trim(),
            email: values.email.trim(),
            note: values.note.trim(),
        });
        setSaved(true);
    }
    return (<section className="delivery-panel" aria-labelledby="delivery-heading">
      <h2 id="delivery-heading">Delivery preferences</h2>
      <p>
        This local demo saves preferences in this browser. Use sample contact
        details; no order is placed.
      </p>
      <form onSubmit={submit} noValidate>
        <label htmlFor="delivery-name">Name</label>
        <input ref={nameRef} id="delivery-name" value={values.name} aria-invalid={Boolean(errors.name && (attempted || touched.name))} aria-describedby={errors.name && (attempted || touched.name) ? "delivery-name-error" : undefined} onChange={(event) => update("name", event.target.value)} onBlur={() => setTouched((current) => ({ ...current, name: true }))} />
        {errors.name && (attempted || touched.name) && (<p id="delivery-name-error" className="field-error">
            {errors.name}
          </p>)}
        <label htmlFor="delivery-email">Email</label>
        <input ref={emailRef} id="delivery-email" type="email" value={values.email} aria-invalid={Boolean(errors.email && (attempted || touched.email))} aria-describedby={errors.email && (attempted || touched.email) ? "delivery-email-error" : undefined} onChange={(event) => update("email", event.target.value)} onBlur={() => setTouched((current) => ({ ...current, email: true }))} />
        {errors.email && (attempted || touched.email) && (<p id="delivery-email-error" className="field-error">
            {errors.email}
          </p>)}
        <label htmlFor="delivery-note">Delivery note, optional</label>
        <textarea ref={noteRef} id="delivery-note" value={values.note} aria-invalid={Boolean(errors.note && (attempted || touched.note))} aria-describedby={errors.note && (attempted || touched.note) ? "delivery-note-error" : undefined} onChange={(event) => update("note", event.target.value)} onBlur={() => setTouched((current) => ({ ...current, note: true }))} />
        {errors.note && (attempted || touched.note) && (<p id="delivery-note-error" className="field-error">
            {errors.note}
          </p>)}
        <button type="submit">Save preferences</button>
        <p role="status">
          {saved ? "Preferences saved for this session." : ""}
        </p>
      </form>
    </section>);
}
