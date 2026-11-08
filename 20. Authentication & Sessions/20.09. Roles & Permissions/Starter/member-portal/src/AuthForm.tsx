import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "../shared/authSchema";
import type { Session } from "../shared/authSchema";
import { ApiError, login, register as registerAccount } from "./api";
const authFormSchema = loginSchema
  .extend({
    name: z.string().trim().max(60, "Use at most 60 characters."),
    mode: z.enum(["login", "register"]),
  })
  .superRefine((value, context) => {
    if (value.mode === "register" && value.name.length < 2)
      context.addIssue({
        code: "custom",
        path: ["name"],
        message: "Enter your name.",
      });
  });
type Values = z.infer<typeof authFormSchema>;
type Props = {
  mode: "login" | "register";
  onSession: (session: Session) => Promise<void>;
};
export function AuthForm({ mode, onSession }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(authFormSchema),
    mode: "onTouched",
    defaultValues: { mode, name: "", email: "", password: "" },
  });
  useEffect(() => {
    if (!isSubmitting && errors.email?.type === "server") setFocus("email");
  }, [isSubmitting, errors.email, setFocus]);
  async function submit(values: Values) {
    try {
      const result =
        mode === "login"
          ? await login({ email: values.email, password: values.password })
          : await registerAccount({
              name: values.name,
              email: values.email,
              password: values.password,
          });
      reset({ mode, name: "", email: "", password: "" });
      await onSession(result);
    } catch (error) {
      if (error instanceof ApiError) {
        for (const name of ["name", "email", "password"] as const)
          if (error.fields[name])
            setError(name, { type: "server", message: error.fields[name] });
      }
      setError("root.server", {
        message: error instanceof Error ? error.message : "Please try again.",
      });
    }
  }
  return (
    <form className="card auth-card" noValidate onSubmit={handleSubmit(submit)} aria-label={mode === "login" ? "Sign in" : "Create account"}>
      <span className="status-pill">
        {mode === "login" ? "Welcome back" : "Make yourself at home"}
      </span>
      <h2>{mode === "login" ? "Your next good thing." : "Join the club."}</h2>
      <p className="muted">
        Use the sample accounts, or create a practice account.
      </p>
      {errors.root?.server && (
        <p role="alert" className="notice">
          {errors.root.server.message}
        </p>
      )}
      <fieldset disabled={isSubmitting}>
        <input type="hidden" {...register("mode")} />
        {mode === "register" && (
          <>
            <label htmlFor="member-name">Your name</label>
            <input id="member-name" autoComplete="name" {...register("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
            {errors.name && (
              <p id="name-error" className="error">
                {errors.name.message}
              </p>
            )}
          </>
        )}
        <label htmlFor="member-email">Email address</label>
        <input id="member-email" type="email" autoComplete="username" {...register("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
        {errors.email && (
          <p id="email-error" className="error">
            {errors.email.message}
          </p>
        )}
        <label htmlFor="member-password">Password</label>
        <input id="member-password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} {...register("password")} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "password-error" : "password-help"} />
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
        {isSubmitting
          ? "Please wait…"
          : mode === "login"
            ? "Sign in"
            : "Create account"}
      </button>
    </form>
  );
}
