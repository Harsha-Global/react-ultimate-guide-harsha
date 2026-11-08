import { z } from "zod";
import { sessionSchema, accountSchema } from "../shared/authSchema";
import type { LoginValues, RegistrationValues } from "../shared/authSchema";
export const API_URL = `http://${location.hostname === "127.0.0.1" ? "127.0.0.1" : "localhost"}:4200/api`;
const errorSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
  fields: z.record(z.string(), z.string()).optional(),
});
export class ApiError extends Error {
  status: number;
  code: string;
  fields: Record<string, string>;
  constructor(
    status: number,
    message: string,
    code = "REQUEST_FAILED",
    fields: Record<string, string> = {},
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}
async function requestJson(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  if (init.body) headers.set("Content-Type", "application/json");
  const response = await fetch(API_URL + path, {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
  });
  const value: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const checked = errorSchema.safeParse(value);
    throw new ApiError(
      response.status,
      checked.success
        ? checked.data.message
        : "The service returned an unexpected error.",
      checked.success ? checked.data.code : undefined,
      checked.success ? checked.data.fields : undefined,
    );
  }
  return value;
}
export async function getHealth() {
  return z
    .object({ ok: z.literal(true), service: z.string() })
    .parse(await requestJson("/health"));
}
export async function getSession(signal?: AbortSignal) {
  return sessionSchema.parse(await requestJson("/session", { signal }));
}
async function sessionPost(path: string, body: unknown) {
  const session = await getSession();
  return requestJson(path, {
    method: "POST",
    headers: { "X-CSRF-Token": session.csrfToken },
    body: JSON.stringify(body),
  });
}
export async function login(values: LoginValues) {
  return sessionSchema.parse(await sessionPost("/login", values));
}
export async function register(values: RegistrationValues) {
  return sessionSchema.parse(await sessionPost("/register", values));
}
export async function logout() {
  return sessionSchema.parse(await sessionPost("/logout", {}));
}
export async function getAccount(userId: string, signal?: AbortSignal) {
  const result = accountSchema.parse(await requestJson("/account", { signal }));
  if (result.userId !== userId)
    throw new Error("The account changed. Check your session again.");
  return result;
}
