import { useState, useRef } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAttendee } from "./attendees.ts";
import { registrationSchema, emptyRegistration } from "./registration.ts";
import type { RegistrationInput, RegistrationValues } from "./registration.ts";
import { SessionPicker } from "./SessionPicker.tsx";
import { preparePreview } from "./preview.ts";

export function RegistrationForm({ attendeeId, onRetry }: { attendeeId: string; onRetry: () => void }) {
  const [loadError, setLoadError] = useState("");
  const defaultValuesRequest = useRef<Promise<RegistrationInput> | null>(null);
  const { register, handleSubmit, trigger, control, reset, formState } = useForm<RegistrationInput, unknown, RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: async () => {
      try {
        defaultValuesRequest.current ??= getAttendee(attendeeId);
        return await defaultValuesRequest.current;
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "Could not load the attendee.");
        return structuredClone(emptyRegistration);
      }
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({ control, name: "guests" });
  const { errors, touchedFields, dirtyFields, isDirty, isValid, isSubmitting, isLoading } = formState;
  const [submitted, setSubmitted] = useState<RegistrationValues | null>(null);
  async function submit(values: RegistrationValues) {
    setSubmitted(null);
    const preview = await preparePreview(values);
    setSubmitted(preview);
  }
  if (isLoading) return (
    <>
      <h2 id="form-title">Attendee details</h2>
      <p role="status">Loading attendee…</p>
    </>
  );
  if (loadError) return (
    <div className="error-banner" role="alert">
      <h2 id="form-title">Could not load attendee</h2>
      <p>{loadError}</p>
      <button className="secondary" onClick={onRetry}>Try loading again</button>
    </div>
  );
  return (
    <>
      <h2 id="form-title">Edit attendee</h2>
      <p className="muted">Reset restores the loaded details. Reviewing a preview does not save changes.</p>
      <form noValidate onSubmit={handleSubmit(submit)} className="form-grid">
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input id="fullName" autoComplete="name" readOnly={isSubmitting} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-error" : undefined} {...register("fullName")} />
          {errors.fullName && (
            <p className="error" id="fullName-error" role="alert">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" autoComplete="email" readOnly={isSubmitting} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
          {errors.email && (
            <p className="error" id="email-error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="two-fields">
          <div className="field">
            <label htmlFor="ticketCount">Tickets (1–4)</label>
            <input id="ticketCount" type="number" min="1" max="4" step="1" readOnly={isSubmitting} aria-invalid={!!errors.ticketCount} aria-describedby={errors.ticketCount ? "ticketCount-error" : undefined} {...register("ticketCount")} />
            {errors.ticketCount && (
              <p id="ticketCount-error" className="error" role="alert">
                {errors.ticketCount.message}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="attendance">Attendance</label>
            <select id="attendance" disabled={isSubmitting} {...register("attendance", { onChange: () => { void trigger("contact.city"); } })}>
              <option value="in-person">In person</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="city">City</label>
          <input id="city" autoComplete="address-level2" readOnly={isSubmitting} aria-invalid={!!errors.contact?.city} aria-describedby={errors.contact?.city ? "city-help city-error" : "city-help"} {...register("contact.city")} />
          <small id="city-help">Required for in-person attendance. Optional for online attendance.</small>
          {errors.contact?.city && (
            <p id="city-error" className="error" role="alert">
              {errors.contact?.city.message}
            </p>
          )}
        </div>
        <div>
          <label className="check">
            <input type="checkbox" disabled={isSubmitting} aria-invalid={!!errors.acceptTerms} aria-describedby={errors.acceptTerms ? "terms-error" : undefined} {...register("acceptTerms")} />
            <span>I accept the registration terms.</span>
          </label>
          {errors.acceptTerms && (
            <p id="terms-error" className="error" role="alert">
              {errors.acceptTerms.message}
            </p>
          )}
        </div>

        <Controller name="session" control={control} render={({ field }) => (
          <SessionPicker value={field.value} onValueChange={field.onChange} onBlur={field.onBlur} name={field.name} inputRef={field.ref} disabled={isSubmitting} />
        )} />

        <fieldset>
          <legend>Additional guests</legend>
          <p className="muted">You are the lead attendee. Add up to three guests.</p>
          {fields.map((field, index) => (
            <div className="guest" key={field.id}>
              <div className="field">
                <label htmlFor={`guest-${field.id}`}>Guest {index + 1} name</label>
                <input id={`guest-${field.id}`} readOnly={isSubmitting} aria-invalid={!!errors.guests?.[index]?.name} aria-describedby={errors.guests?.[index]?.name ? `guest-${field.id}-error` : undefined} {...register(`guests.${index}.name`)} />
                {errors.guests?.[index]?.name && (
                  <p id={`guest-${field.id}-error`} className="error" role="alert">
                    {errors.guests[index]?.name?.message}
                  </p>
                )}
              </div>
              <button className="secondary" type="button" onClick={() => remove(index)} disabled={isSubmitting}>Remove guest {index + 1}</button>
            </div>
          ))}
          <button className="secondary" type="button" onClick={() => append({ name: "" })} disabled={fields.length >= 3 || isSubmitting}>Add guest</button>
        </fieldset>

        <div className="actions">
          <button className="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Preparing preview…" : "Review registration"}
          </button>
          <button className="secondary" type="button" onClick={() => { reset(); setSubmitted(null); }} disabled={isSubmitting}>Reset to loaded details</button>
        </div>
      </form>

      <dl className="status-grid" aria-label="Form state">
        <div>
          <dt>Name touched</dt>
          <dd>{String(!!touchedFields.fullName)}</dd>
        </div>
        <div>
          <dt>Name dirty</dt>
          <dd>{String(!!dirtyFields.fullName)}</dd>
        </div>
        <div>
          <dt>Form dirty</dt>
          <dd>{String(isDirty)}</dd>
        </div>
        <div>
          <dt>Form valid</dt>
          <dd>{String(isValid)}</dd>
        </div>
      </dl>

      {submitted && (
        <div className="notice" role="status">
          <strong>Local preview for {submitted.fullName}</strong>
          <p>{submitted.email}</p>
          <p>{submitted.ticketCount} ticket(s) · {submitted.attendance}</p>
          <p>Session: {submitted.session}</p>
          <p>Guests: {submitted.guests.map((guest) => guest.name).join(", ") || "None"}</p>
          <span>No reservation has been sent.</span>
        </div>
      )}
    </>
  );
}
