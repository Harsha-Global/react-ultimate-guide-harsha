import { Link } from "react-router";
import { useEmployees } from "./useEmployees";
export default function EmployeeList() {
  const { employees, status, retry } = useEmployees();
  return (
    <section className="panel">
      <h1>Employees</h1>
      {status === "loading" && <p role="status">Loading employees…</p>}
      {status === "error" && (
        <div role="alert">
          <p>Could not load employees. Check the local API.</p>
          <button onClick={retry}>Try again</button>
        </div>
      )}
      {status === "ready" && employees.length === 0 && <p>No employees yet.</p>}
      <ul className="employee-list">
        {employees.map((employee) => (
          <li key={employee.id}>
            <div>
              <strong>{employee.name}</strong>
              <p>
                {employee.role} · {employee.team}
              </p>
            </div>
            <Link
              className="button-link button-outline"
              to={`/employees/${encodeURIComponent(employee.id)}`}
            >
              View {employee.name}
            </Link>

          </li>
        ))}
      </ul>
    </section>
  );
}
