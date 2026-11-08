import { useState } from "react";
import { useForm } from "react-hook-form";
type RegistrationValues = { fullName: string; email: string };
export function RegistrationForm() {
  const { register, handleSubmit } = useForm<RegistrationValues>({
    defaultValues: { fullName: "", email: "" },
  });
  const [submitted, setSubmitted] = useState<RegistrationValues | null>(null);
  function submit(values: RegistrationValues) {
    setSubmitted(values);
  }
  return (
    <>
      <h2 id="form-title">Your registration</h2>
      <form onSubmit={handleSubmit(submit)} className="form-grid">
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            autoComplete="name"
            {...register("fullName")}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
        </div>
        <div className="actions">
          <button className="primary" type="submit">
            Review registration
          </button>
        </div>
      </form>
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
