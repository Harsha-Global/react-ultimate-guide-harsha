import { apiClient } from "./apiClient";
import type { Employee, EmployeeInput } from "./types";
export { HttpError } from "./requestErrors";

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

export async function listEmployees(): Promise<Employee[]> {
  const response = await apiClient.get<unknown>("/employees");
  const data = response.data;
  if (!Array.isArray(data) || !data.every(isEmployee))
    throw new Error("The employee list has an unexpected shape.");
  return data;
}

export async function getEmployee(
  id: string,
  signal: AbortSignal,
): Promise<Employee> {
  const response = await apiClient.get<unknown>(
    `/employees/${encodeURIComponent(id)}`,
    { signal },
  );
  const data = response.data;
  if (!isEmployee(data))
    throw new Error("The employee details have an unexpected shape.");
  return data;
}

export async function createEmployee(input: EmployeeInput): Promise<Employee> {
  const response = await apiClient.post<unknown>("/employees", input);
  const data = response.data;
  if (!isEmployee(data))
    throw new Error("The created employee has an unexpected shape.");
  return data;
}

export async function replaceEmployee(
  id: string,
  input: EmployeeInput,
): Promise<Employee> {
  const response = await apiClient.put<unknown>(
    `/employees/${encodeURIComponent(id)}`,
    input,
  );
  const data = response.data;
  if (!isEmployee(data))
    throw new Error("The updated employee has an unexpected shape.");
  return data;
}

export async function setEmployeeActive(
  id: string,
  active: boolean,
): Promise<Employee> {
  const response = await apiClient.patch<unknown>(
    `/employees/${encodeURIComponent(id)}`,
    { active },
  );
  const data = response.data;
  if (!isEmployee(data))
    throw new Error("The updated employee has an unexpected shape.");
  return data;
}

export async function deleteEmployee(id: string): Promise<void> {
  await apiClient.delete<void>(`/employees/${encodeURIComponent(id)}`);
}
