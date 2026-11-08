import type { Employee, EmployeeInput } from "./types";

export class HttpError extends Error {
  readonly status: number;
  constructor(status: number) {
    super(`The server returned HTTP ${status}.`);
    this.status = status;
  }
}

export function isEmployee(value: unknown): value is Employee {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.role === "string" &&
    typeof item.team === "string" &&
    typeof item.email === "string" &&
    typeof item.active === "boolean"
  );
}

export async function listEmployees(signal?: AbortSignal): Promise<Employee[]> {
  const response = await fetch("/api/employees", { signal });
  if (!response.ok) throw new HttpError(response.status);
  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isEmployee))
    throw new Error("The employee list has an unexpected shape.");
  return data;
}

export async function getEmployee(
  id: string,
  signal?: AbortSignal,
): Promise<Employee> {
  const response = await fetch(`/api/employees/${encodeURIComponent(id)}`, {
    signal,
  });
  if (!response.ok) throw new HttpError(response.status);
  const data: unknown = await response.json();
  if (!isEmployee(data))
    throw new Error("The employee details have an unexpected shape.");
  return data;
}

export async function createEmployee(input: EmployeeInput): Promise<Employee> {
  const response = await fetch("/api/employees", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new HttpError(response.status);
  const data: unknown = await response.json();
  if (!isEmployee(data))
    throw new Error("The created employee has an unexpected shape.");
  return data;
}

export async function replaceEmployee(
  id: string,
  input: EmployeeInput,
): Promise<Employee> {
  const response = await fetch(`/api/employees/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new HttpError(response.status);
  const data: unknown = await response.json();
  if (!isEmployee(data))
    throw new Error("The updated employee has an unexpected shape.");
  return data;
}

export async function setEmployeeActive(
  id: string,
  active: boolean,
): Promise<Employee> {
  const response = await fetch(`/api/employees/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ active }),
  });
  if (!response.ok) throw new HttpError(response.status);
  const data: unknown = await response.json();
  if (!isEmployee(data))
    throw new Error("The updated employee has an unexpected shape.");
  return data;
}

export async function deleteEmployee(id: string): Promise<void> {
  const response = await fetch(`/api/employees/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new HttpError(response.status);
}
