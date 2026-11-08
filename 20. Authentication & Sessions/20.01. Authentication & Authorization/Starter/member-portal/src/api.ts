import { z } from "zod";
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
