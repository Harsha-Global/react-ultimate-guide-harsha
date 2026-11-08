import { Link, useLoaderData } from "react-router";
import type { employeeLoader } from "./routeData";
import ReturnLink from "./ReturnLink";
export default function EmployeeDetail() {
  const employee = useLoaderData<typeof employeeLoader>();
  return (
    <section className="panel">
      <title>{`${employee.name} | Team Directory`}</title>
      <meta
        name="description"
        content={`Contact and team details for ${employee.name}.`}
      />
      <h1 tabIndex={-1}>{employee.name}</h1>
      <dl>
        <dt>Role</dt>
        <dd>{employee.role}</dd>
        <dt>Team</dt>
        <dd>{employee.team}</dd>
        <dt>Email</dt>
        <dd>{employee.email}</dd>
        <dt>Status</dt>
        <dd>{employee.active ? "Active" : "Inactive"}</dd>
      </dl>
      <p>
        <Link className="button-link button-primary" to="edit">
          Edit employee
        </Link>
      </p>
      <ReturnLink />
    </section>
  );
}
