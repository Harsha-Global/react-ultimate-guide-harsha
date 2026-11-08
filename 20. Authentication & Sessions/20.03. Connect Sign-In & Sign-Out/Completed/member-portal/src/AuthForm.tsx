import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../shared/authSchema";
import type { LoginValues, Session } from "../shared/authSchema";
import { ApiError, login } from "./api";
type Props = { onSession: (session: Session) => Promise<void> };
export function AuthForm({ onSession }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });
  useEffect(() => {
    if (!isSubmitting && errors.email?.type === "server") setFocus("email");
  }, [isSubmitting, errors.email, setFocus]);
  async function submit(values: LoginValues) {
    try {
      const result = await login(values);
      reset({ email: "", password: "" });
      await onSession(result);
    } catch (error) {
      if (error instanceof ApiError) {
        for (const name of ["email", "password"] as const)
          if (error.fields[name])
            setError(name, { type: "server", message: error.fields[name] });
      }
      setError("root.server", {
        message: error instanceof Error ? error.message : "Please try again.",
      });
    }
  }
  return (
    <form className="card auth-card" noValidate onSubmit={handleSubmit(submit)} aria-label="Sign in">
      <span className="status-pill">
        Welcome back
      </span>
      <h2>Your next good thing.</h2>
      <p className="muted">
        Use the sample member or staff account.
      </p>
      {errors.root?.server && (
        <p role="alert" className="notice">
          {errors.root.server.message}
        </p>
      )}
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
        {isSubmitting ? "Please wait…" : "Sign in"}
      </button>
    </form>
  );
}
