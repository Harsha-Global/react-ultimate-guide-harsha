import { useEmployees } from "./useEmployees";
import EmployeeResults from "./EmployeeResults";
import QuickFind from "./QuickFind";

export default function EmployeeList() {
  const { employees, status, retry } = useEmployees();
  return (
    <section className="panel">
      <h1>Employees</h1>
      <QuickFind />
      {status === "loading" && <p role="status">Loading employees…</p>}
      {status === "error" && (
        <div role="alert">
          <p>Could not load employees. Check the local API.</p>
          <button onClick={retry}>Try again</button>
        </div>
      )}
      {status === "ready" && <EmployeeResults employees={employees} />}
    </section>
  );
}
