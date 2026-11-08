import type { Employee } from "./types";

export class HttpError extends Error {
  readonly status: number;
  constructor(status: number) { super(`The server returned HTTP ${status}.`); this.status = status; }
}

export function isEmployee(value: unknown): value is Employee {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === "string" && typeof item.name === "string" &&
    typeof item.role === "string" && typeof item.team === "string" &&
    typeof item.email === "string" && typeof item.active === "boolean";
}

export async function listEmployees(): Promise<Employee[]> {
  const response = await fetch("/api/employees");
  if (!response.ok) throw new HttpError(response.status);
  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isEmployee)) throw new Error("The employee list has an unexpected shape.");
  return data;
}
