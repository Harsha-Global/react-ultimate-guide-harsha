import { useLocation, useSearchParams } from "react-router";
import EmployeeRow from "./EmployeeRow";
import type { Employee } from "./types";
export default function EmployeeResults({
  employees,
}: {
  employees: readonly Employee[];
}) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const requestedTeam = searchParams.get("team") ?? "";
  const team =
    requestedTeam === "Product" || requestedTeam === "Platform"
      ? requestedTeam
      : "";
  function changeFilter(key: "q" | "team", value: string) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );
  }
  const visible = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (!team || employee.team === team),
  );
  return (
    <>
      <div className="filters">
        <label>
          Search names
          <input
            value={query}
            onChange={(event) => changeFilter("q", event.target.value)}
          />
        </label>
        <label>
          Team
          <select
            value={team}
            onChange={(event) => changeFilter("team", event.target.value)}
          >
            <option value="">All teams</option>
            <option>Product</option>
            <option>Platform</option>
          </select>
        </label>
        <button type="button" onClick={() => setSearchParams({})}>
          Clear filters
        </button>
      </div>
      <p role="status">
        {visible.length} matching{" "}
        {visible.length === 1 ? "employee" : "employees"}
      </p>
      <ul className="employee-list">
        {visible.map((employee) => (
          <EmployeeRow
            key={employee.id}
            employee={employee}
            from={location.pathname + location.search}
          />
        ))}
      </ul>
      {visible.length === 0 && <p>No employees match these filters.</p>}
    </>
  );
}
