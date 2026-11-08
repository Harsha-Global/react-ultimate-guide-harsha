import { useEffect, useState } from "react";
import { getEmployee, HttpError, listEmployees } from "./employeeApi";
import type { Employee } from "./types";
import EmployeeForm from "./EmployeeForm";
import EmployeeActions from "./EmployeeActions";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [retry, setRetry] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<Employee | null>(null);
  const [detailAttempt, setDetailAttempt] = useState(0);
  const [detailStatus, setDetailStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
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
  useEffect(() => {
    if (!selectedId) return;
    const controller = new AbortController();
    let ignore = false;
    getEmployee(selectedId, controller.signal).then(employee => {
      if (!ignore) { setDetail(employee); setDetailStatus("ready"); }
    }).catch((error: unknown) => {
      if (!ignore && !(error instanceof DOMException && error.name === "AbortError")) setDetailStatus("error");
    });
    return () => { ignore = true; controller.abort(); };
  }, [selectedId, detailAttempt]);
  function selectEmployee(id: string) {
    setSelectedId(id); setDetail(null); setDetailStatus("loading"); setDetailAttempt(count => count + 1);
  }
  return <main className="shell"><header><p className="eyebrow">People & teams</p><h1>Team Directory</h1><p>Find a teammate and keep their details current.</p></header>
    <section className="panel"><h2>Employees</h2>
      {status === "loading" && <p role="status">Loading employees…</p>}
      {status === "error" && <div role="alert"><p>{errorMessage}</p><button type="button" onClick={() => {
        setStatus("loading"); setRetry(count => count + 1);
      }}>Try again</button></div>}
      {status === "ready" && employees.length === 0 && <p>No employees yet.</p>}
      {status === "ready" && <ul className="employee-list">{employees.map(employee =>
        <li key={employee.id}><strong>{employee.name}</strong><span>{employee.role} · {employee.team}</span>
          <button type="button" aria-pressed={employee.id === selectedId} onClick={() => selectEmployee(employee.id)}>View details</button></li>
      )}</ul>}
    </section>
    <section className="panel" aria-labelledby="detail-heading"><h2 id="detail-heading">Employee details</h2>
      {detailStatus === "idle" && <p>Select a teammate.</p>}
      {detailStatus === "loading" && <p role="status">Loading details…</p>}
      {detailStatus === "error" && <p role="alert">Could not load these details. Select the employee again to retry.</p>}
      {detailStatus === "ready" && detail && <div><h3>{detail.name}</h3><p>{detail.role} · {detail.team}</p><p>{detail.email}</p><p>{detail.active ? "Active" : "Inactive"}</p>
        <EmployeeActions key={detail.id} employee={detail}
          onChanged={updated => { setDetail(updated); setEmployees(current => current.map(item => item.id === updated.id ? updated : item)); }}
          onDeleted={id => { setEmployees(current => current.filter(item => item.id !== id)); setSelectedId(null); setDetail(null); setDetailStatus("idle"); }} />
      </div>}
    </section>
    <EmployeeForm onCreated={employee => { setEmployees(current => [...current, employee]); selectEmployee(employee.id); }} />
    </main>;
}
