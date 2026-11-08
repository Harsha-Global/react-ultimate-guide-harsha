import { useState } from "react";
import type { FormEvent } from "react";
type RegistrationValues = { fullName: string; email: string };
export function RegistrationForm() {
  const [values, setValues] = useState<RegistrationValues>({
    fullName: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState<RegistrationValues | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(values);
  }
  return (
    <>
      <h2 id="form-title">Your registration</h2>
      <form onSubmit={submit} className="form-grid">
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            value={values.fullName}
            onChange={(event) =>
              setValues({ ...values, fullName: event.target.value })
            }
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) =>
              setValues({ ...values, email: event.target.value })
            }
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
