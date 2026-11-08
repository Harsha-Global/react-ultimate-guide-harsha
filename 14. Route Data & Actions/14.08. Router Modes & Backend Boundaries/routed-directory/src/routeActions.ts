import type { ActionFunctionArgs } from "react-router";
import { data, redirect } from "react-router";
import { replaceEmployee, setEmployeeActive } from "./employeeApi";
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

export async function toggleEmployeeAction({
  params,
  request,
}: ActionFunctionArgs) {
  const id = requireEmployeeId(params.employeeId);
  const form = await request.formData();
  const active = form.get("active");
  if (active !== "true" && active !== "false")
    return data({ error: "Choose a valid active value." }, { status: 400 });
  try {
    await setEmployeeActive(id, active === "true");
    return data({ error: "" });
  } catch {
    return data(
      { error: "Status change failed. Check the API and try again." },
      { status: 502 },
    );
  }
}
