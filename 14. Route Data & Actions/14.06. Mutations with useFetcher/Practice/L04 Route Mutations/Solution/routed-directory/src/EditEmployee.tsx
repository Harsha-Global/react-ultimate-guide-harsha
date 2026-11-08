import { useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router";
import type { employeeLoader } from "./routeData";
import type { saveEmployeeAction } from "./routeActions";
import type { Employee, EmployeeInput } from "./types";
export default function EditEmployee() {
  const employee = useLoaderData<typeof employeeLoader>();
  return <EmployeeEditor key={employee.id} employee={employee} />;
}
function EmployeeEditor({ employee }: { employee: Employee }) {
  const [values, setValues] = useState<EmployeeInput>({
    name: employee.name,
    role: employee.role,
    team: employee.team,
    email: employee.email,
    active: employee.active,
  });
  const actionData = useActionData<typeof saveEmployeeAction>();
  const navigation = useNavigation();
  const busy = navigation.state !== "idle";
  function change(field: "name" | "role" | "team" | "email", value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }
  return (
    <section className="panel">
      <title>{`Edit ${employee.name} | Team Directory`}</title>
      <meta name="description" content="Edit a sample employee." />
      <h1 tabIndex={-1}>Edit {employee.name}</h1>
      <Form method="post" className="edit-form" noValidate>
        <fieldset disabled={busy}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(event) => change("name", event.target.value)}
          />
          <label htmlFor="role">Role</label>
          <input
            id="role"
            name="role"
            value={values.role}
            onChange={(event) => change("role", event.target.value)}
          />
          <label htmlFor="team">Team</label>
          <input
            id="team"
            name="team"
            value={values.team}
            onChange={(event) => change("team", event.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => change("email", event.target.value)}
          />
          <label className="check">
            <input
              name="active"
              type="checkbox"
              checked={values.active}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  active: event.target.checked,
                }))
              }
            />
            Active employee
          </label>
          <button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save employee"}
          </button>
          {actionData?.error && <p role="alert">{actionData.error}</p>}
        </fieldset>
      </Form>
      <p>
        <Link
          className="button-link button-secondary"
          to={`/employees/${encodeURIComponent(employee.id)}`}
        >
          Cancel editing
        </Link>
      </p>
    </section>
  );
}
