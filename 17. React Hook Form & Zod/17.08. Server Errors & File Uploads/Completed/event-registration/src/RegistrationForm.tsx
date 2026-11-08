import { useState, useRef } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAttendee, saveAttendee, ApiError } from "./attendees.ts";
import { registrationSchema, emptyRegistration } from "./registration.ts";
import type { RegistrationInput, RegistrationValues } from "./registration.ts";
import { SessionPicker } from "./SessionPicker.tsx";
import { AvatarUpload } from "./AvatarUpload.tsx";

export function RegistrationForm({ attendeeId, onRetry }: { attendeeId: string; onRetry: () => void }) {
  const [loadError, setLoadError] = useState("");
  const defaultValuesRequest = useRef<Promise<RegistrationInput> | null>(null);
  const { register, handleSubmit, trigger, control, reset, setError, clearErrors, formState } = useForm<RegistrationInput, unknown, RegistrationValues>({
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
  const [saved, setSaved] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadReset, setUploadReset] = useState(0);
  const busy = isSubmitting || uploading;
  async function submit(values: RegistrationValues) {
    setSaved("");
    clearErrors("root.server");
    try {
      const savedValues = await saveAttendee(attendeeId, values);
      reset(savedValues);
      setUploadReset((value) => value + 1);
      setSaved("Attendee saved. These saved values are now the reset baseline.");
    } catch (error) {
      if (error instanceof ApiError && error.fieldErrors.email)
        setError("email", { type: "server", message: error.fieldErrors.email }, { shouldFocus: true });
      setError("root.server", { type: "server", message: error instanceof Error ? error.message : "Could not save. Your draft is still here." });
    }
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
      <p className="muted">Save your edits, or reset to the last loaded or successfully saved details.</p>
      <form noValidate onSubmit={handleSubmit(submit)} className="form-grid">
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input id="fullName" autoComplete="name" readOnly={busy} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-error" : undefined} {...register("fullName")} />
          {errors.fullName && (
            <p className="error" id="fullName-error" role="alert">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" autoComplete="email" readOnly={busy} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
          {errors.email && (
            <p className="error" id="email-error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="two-fields">
          <div className="field">
            <label htmlFor="ticketCount">Tickets (1–4)</label>
            <input id="ticketCount" type="number" min="1" max="4" step="1" readOnly={busy} aria-invalid={!!errors.ticketCount} aria-describedby={errors.ticketCount ? "ticketCount-error" : undefined} {...register("ticketCount")} />
            {errors.ticketCount && (
              <p id="ticketCount-error" className="error" role="alert">
                {errors.ticketCount.message}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="attendance">Attendance</label>
            <select id="attendance" disabled={busy} {...register("attendance", { onChange: () => { void trigger("contact.city"); } })}>
              <option value="in-person">In person</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="city">City</label>
          <input id="city" autoComplete="address-level2" readOnly={busy} aria-invalid={!!errors.contact?.city} aria-describedby={errors.contact?.city ? "city-help city-error" : "city-help"} {...register("contact.city")} />
          <small id="city-help">Required for in-person attendance. Optional for online attendance.</small>
          {errors.contact?.city && (
            <p id="city-error" className="error" role="alert">
              {errors.contact?.city.message}
            </p>
          )}
        </div>
        <div>
          <label className="check">
            <input type="checkbox" disabled={busy} aria-invalid={!!errors.acceptTerms} aria-describedby={errors.acceptTerms ? "terms-error" : undefined} {...register("acceptTerms")} />
            <span>I accept the registration terms.</span>
          </label>
          {errors.acceptTerms && (
            <p id="terms-error" className="error" role="alert">
              {errors.acceptTerms.message}
            </p>
          )}
        </div>

        <Controller name="session" control={control} render={({ field }) => (
          <SessionPicker value={field.value} onValueChange={field.onChange} onBlur={field.onBlur} name={field.name} inputRef={field.ref} disabled={busy} />
        )} />

        <fieldset>
          <legend>Additional guests</legend>
          <p className="muted">You are the lead attendee. Add up to three guests.</p>
          {fields.map((field, index) => (
            <div className="guest" key={field.id}>
              <div className="field">
                <label htmlFor={`guest-${field.id}`}>Guest {index + 1} name</label>
                <input id={`guest-${field.id}`} readOnly={busy} aria-invalid={!!errors.guests?.[index]?.name} aria-describedby={errors.guests?.[index]?.name ? `guest-${field.id}-error` : undefined} {...register(`guests.${index}.name`)} />
                {errors.guests?.[index]?.name && (
                  <p id={`guest-${field.id}-error`} className="error" role="alert">
                    {errors.guests[index]?.name?.message}
                  </p>
                )}
              </div>
              <button className="secondary" type="button" onClick={() => remove(index)} disabled={busy}>Remove guest {index + 1}</button>
            </div>
          ))}
          <button className="secondary" type="button" onClick={() => append({ name: "" })} disabled={fields.length >= 3 || busy}>Add guest</button>
        </fieldset>

        <Controller key={uploadReset} name="avatarUrl" control={control} render={({ field }) => (
          <AvatarUpload key={`${uploadReset}:${field.value}`} value={field.value} onChange={field.onChange} onBusyChange={setUploading} disabled={isSubmitting} />
        )} />

        {errors.root?.server && (
          <p className="error-banner" role="alert">
            {errors.root.server.message}
          </p>
        )}

        <div className="actions">
          <button className="primary" type="submit" disabled={busy}>
            {isSubmitting ? "Saving…" : "Save attendee"}
          </button>
          <button className="secondary" type="button" onClick={() => { reset(); setSaved(""); setUploadReset((value) => value + 1); }} disabled={busy}>Reset to saved details</button>
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

      {saved && (
        <div className="notice" role="status">
          {saved}
        </div>
      )}
    </>
  );
}
