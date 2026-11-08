import EmployeeActions from "./EmployeeActions";
import EmployeeForm from "./EmployeeForm";
import { useEmployeeDetail } from "./useEmployeeDetail";
import { useEmployees } from "./useEmployees";

export default function App() {
  const list = useEmployees();
  const selected = useEmployeeDetail();
  return <main className="shell"><header><p className="eyebrow">People & teams</p><h1>Team Directory</h1>
    <p>Find a teammate and keep their details current.</p></header>
    <section className="panel"><h2>Employees</h2>
      {list.status === "loading" && <p role="status">Loading employees…</p>}
      {list.status === "error" && <div role="alert"><p>{list.errorMessage}</p>
        <button type="button" onClick={list.retry}>Try again</button></div>}
      {list.status === "ready" && list.employees.length === 0 && <p>No employees yet.</p>}
      {list.status === "ready" && <ul className="employee-list">{list.employees.map(employee =>
        <li key={employee.id}><strong>{employee.name}</strong><span>{employee.role} · {employee.team}</span>
          <button type="button" aria-pressed={employee.id === selected.selectedId}
            onClick={() => selected.select(employee.id)}>View details</button></li>
      )}</ul>}
    </section>
    <section className="panel" aria-labelledby="detail-heading"><h2 id="detail-heading">Employee details</h2>
      {selected.status === "idle" && <p>Select a teammate.</p>}
      {selected.status === "loading" && <p role="status">Loading details…</p>}
      {selected.status === "error" && <div role="alert"><p>Could not load these details.</p>
        {selected.selectedId && <button type="button" onClick={() => selected.select(selected.selectedId!)}>Try details again</button>}</div>}
      {selected.status === "ready" && selected.detail && <div><h3>{selected.detail.name}</h3>
        <p>{selected.detail.role} · {selected.detail.team}</p><p>{selected.detail.email}</p>
        <p>{selected.detail.active ? "Active" : "Inactive"}</p>
        <EmployeeActions key={selected.detail.id} employee={selected.detail}
          onChanged={updated => { selected.setDetail(updated); list.replace(updated); }}
          onDeleted={id => { list.remove(id); selected.clear(); }} />
      </div>}
    </section>
    <EmployeeForm onCreated={employee => { list.insert(employee); selected.select(employee.id); }} />
  </main>;
}
