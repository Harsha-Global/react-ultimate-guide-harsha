import { useEffect, useState } from "react";
import { listEmployees } from "./employeeApi";
import type { Employee } from "./types";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [message, setMessage] = useState("Loading employees…");
  useEffect(() => {
    let ignore = false;
    listEmployees().then(data => {
      if (!ignore) { setEmployees(data); setMessage(""); }
    }).catch(() => { if (!ignore) setMessage("Could not load employees."); });
    return () => { ignore = true; };
  }, []);
  return <main className="shell"><header><p className="eyebrow">People & teams</p><h1>Team Directory</h1><p>Find a teammate and keep their details current.</p></header>
    <section className="panel"><h2>Employees</h2>
      {message && <p role="status">{message}</p>}
      <ul className="employee-list">{employees.map(employee =>
        <li key={employee.id}><strong>{employee.name}</strong><span>{employee.role} · {employee.team}</span></li>
      )}</ul>
    </section></main>;
}
