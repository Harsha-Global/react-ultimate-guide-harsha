import { Link, useFetcher } from "react-router";
import type { toggleEmployeeAction } from "./routeActions";
import type { Employee } from "./types";
export default function EmployeeRow({
  employee,
  from,
}: {
  employee: Employee;
  from: string;
}) {
  const fetcher = useFetcher<typeof toggleEmployeeAction>();
  const busy = fetcher.state !== "idle";
  return (
    <li>
      <div>
        <strong>{employee.name}</strong>
        <p>
          {employee.role} · {employee.team}
        </p>
        <span className={employee.active ? "badge active" : "badge"}>
          {employee.active ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="row-actions">
        <Link
          className="button-link button-outline"
          to={`/employees/${encodeURIComponent(employee.id)}`}
          state={{ from }}
        >
          View {employee.name}
        </Link>
        <fetcher.Form
          method="post"
          action={`/employees/${encodeURIComponent(employee.id)}/status`}
        >
          <input type="hidden" name="active" value={String(!employee.active)} />
          <button
            className={employee.active ? "button-warning" : "button-success"}
            type="submit"
            disabled={busy}
          >
            {busy
              ? "Updating…"
              : `Mark ${employee.active ? "inactive" : "active"}`}
          </button>
        </fetcher.Form>
      </div>
      {fetcher.data?.error && <p role="alert">{fetcher.data.error}</p>}
    </li>
  );
}
