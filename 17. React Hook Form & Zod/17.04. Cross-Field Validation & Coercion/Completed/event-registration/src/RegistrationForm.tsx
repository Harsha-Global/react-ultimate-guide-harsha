import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./registration.ts";
import type { RegistrationInput, RegistrationValues } from "./registration.ts";
import { preparePreview } from "./preview.ts";

export function RegistrationForm() {
  const { register, handleSubmit, trigger, formState } = useForm<RegistrationInput, unknown, RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { fullName: "", email: "", ticketCount: "1", attendance: "in-person", city: "", acceptTerms: false },
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const { errors, touchedFields, dirtyFields, isDirty, isValid, isSubmitting } = formState;
  const [submitted, setSubmitted] = useState<RegistrationValues | null>(null);
  async function submit(values: RegistrationValues) {
    setSubmitted(null);
    const preview = await preparePreview(values);
    setSubmitted(preview);
  }
  return (
    <>
      <h2 id="form-title">Your registration</h2>
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
            <select id="attendance" disabled={isSubmitting} {...register("attendance", { onChange: () => { void trigger("city"); } })}>
              <option value="in-person">In person</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="city">City</label>
          <input id="city" autoComplete="address-level2" readOnly={isSubmitting} aria-invalid={!!errors.city} aria-describedby={errors.city ? "city-help city-error" : "city-help"} {...register("city")} />
          <small id="city-help">Required for in-person attendance. Optional for online attendance.</small>
          {errors.city && (
            <p id="city-error" className="error" role="alert">
              {errors.city.message}
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

        <div className="actions">
          <button className="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Preparing preview…" : "Review registration"}
          </button>
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
          <span>No reservation has been sent.</span>
        </div>
      )}
    </>
  );
}
