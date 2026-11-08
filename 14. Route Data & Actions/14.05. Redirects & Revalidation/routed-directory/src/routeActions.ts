import type { ActionFunctionArgs } from "react-router";
import { data, redirect } from "react-router";
import { replaceEmployee } from "./employeeApi";
import { requireEmployeeId } from "./routeData";
import type { EmployeeInput } from "./types";
function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}
export async function saveEmployeeAction({
  params,
  request,
}: ActionFunctionArgs) {
  const id = requireEmployeeId(params.employeeId);
  const form = await request.formData();
  const values: EmployeeInput = {
    name: text(form, "name"),
    role: text(form, "role"),
    team: text(form, "team"),
    email: text(form, "email"),
    active: form.get("active") === "on",
  };
  if (
    !values.name ||
    !values.role ||
    !values.team ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  )
    return data(
      {
        error: "Complete every field with a valid email address.",
        values,
      },
      { status: 400 },
    );
  try {
    const employee = await replaceEmployee(id, values);
    return redirect(`/employees/${encodeURIComponent(employee.id)}`);
  } catch {
    return data(
      {
        error: "Could not save. Check the local API and try again.",
        values,
      },
      { status: 502 },
    );
  }
}
