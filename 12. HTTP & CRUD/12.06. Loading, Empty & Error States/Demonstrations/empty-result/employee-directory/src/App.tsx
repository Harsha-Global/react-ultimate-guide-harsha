import { useEffect, useState } from "react";
import { HttpError, listEmployees } from "./employeeApi";
import type { Employee } from "./types";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let ignore = false;
    listEmployees().then(data => {
      if (!ignore) { setEmployees(data); setStatus("ready"); }
    }).catch((error: unknown) => {
      if (ignore) return;
      setErrorMessage(error instanceof HttpError && error.status === 502 ? "The local API is unavailable. Start it, then try again." :
        error instanceof HttpError ? `Server error ${error.status}.` :
        error instanceof TypeError ? "Cannot reach the local API." : "The response could not be read.");
      setStatus("error");
    });
    return () => { ignore = true; };
  }, [retry]);
  return <main className="shell"><header><p className="eyebrow">People & teams</p><h1>Team Directory</h1><p>Find a teammate and keep their details current.</p></header>
    <section className="panel"><h2>Employees</h2>
      {status === "loading" && <p role="status">Loading employees…</p>}
      {status === "error" && <div role="alert"><p>{errorMessage}</p><button type="button" onClick={() => {
        setStatus("loading"); setRetry(count => count + 1);
      }}>Try again</button></div>}
      {status === "ready" && employees.length === 0 && <p>No employees yet.</p>}
      {status === "ready" && <ul className="employee-list">{employees.map(employee =>
        <li key={employee.id}><strong>{employee.name}</strong><span>{employee.role} · {employee.team}</span></li>
      )}</ul>}
    </section></main>;
}
