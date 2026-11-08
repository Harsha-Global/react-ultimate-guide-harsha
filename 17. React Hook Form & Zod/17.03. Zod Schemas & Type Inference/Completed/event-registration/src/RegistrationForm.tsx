import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./registration.ts";
import type { RegistrationInput, RegistrationValues } from "./registration.ts";
import { preparePreview } from "./preview.ts";

export function RegistrationForm() {
  const { register, handleSubmit, formState } = useForm<RegistrationInput, unknown, RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { fullName: "", email: "" },
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
          <span>No reservation has been sent.</span>
        </div>
      )}
    </>
  );
}
