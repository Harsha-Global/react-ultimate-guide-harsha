import { Link } from "react-router";
import type { Employee } from "./types";
export default function EmployeeRow({ employee, from }: { employee: Employee; from: string }) {
  // Complete this row with a fetcher form, pending feedback and an error message.
  // The status action and route are already supplied.
  return <li><div><strong>{employee.name}</strong><p>{employee.role} · {employee.team}</p>
    <span className={employee.active ? "badge active" : "badge"}>{employee.active ? "Active" : "Inactive"}</span>
  </div><div className="row-actions"><Link className="button-link button-outline" to={`/employees/${encodeURIComponent(employee.id)}`} state={{ from }}>View {employee.name}</Link></div></li>;
}
