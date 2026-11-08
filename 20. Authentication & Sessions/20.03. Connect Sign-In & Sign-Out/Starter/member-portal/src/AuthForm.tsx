import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../shared/authSchema";
import type { LoginValues } from "../shared/authSchema";
export function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });
  const [checked, setChecked] = useState(false);
  function submit() {
    setChecked(true);
  }
  return (
    <form className="card auth-card" noValidate onSubmit={handleSubmit(submit)} onChange={() => setChecked(false)} aria-label="Sign in">
      <span className="status-pill">
        Welcome back
      </span>
      <h2>Your next good thing.</h2>
      <p className="muted">
        Use the sample member or staff account.
      </p>
      {checked && <p role="status">Sign-in details passed validation. No request has been sent.</p>}
      <fieldset disabled={isSubmitting}>
        <label htmlFor="member-email">Email address</label>
        <input id="member-email" type="email" autoComplete="username" {...register("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
        {errors.email && (
          <p id="email-error" className="error">
            {errors.email.message}
          </p>
        )}
        <label htmlFor="member-password">Password</label>
        <input id="member-password" type="password" autoComplete="current-password" {...register("password")} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "password-error" : "password-help"} />
        <p id="password-help" className="muted">
          12 to 128 characters. Use a practice password.
        </p>
        {errors.password && (
          <p id="password-error" className="error">
            {errors.password.message}
          </p>
        )}
      </fieldset>
      <button disabled={isSubmitting} type="submit">
        Check sign-in details
      </button>
    </form>
  );
}
