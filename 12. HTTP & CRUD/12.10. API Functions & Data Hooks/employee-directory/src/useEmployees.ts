import { useEffect, useState } from "react";
import { HttpError, listEmployees } from "./employeeApi";
import type { Employee } from "./types";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [attempt, setAttempt] = useState(0);
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
  }, [attempt]);
  function retry() { setStatus("loading"); setAttempt(count => count + 1); }
  function insert(employee: Employee) { setEmployees(current => [...current, employee]); }
  function replace(employee: Employee) {
    setEmployees(current => current.map(item => item.id === employee.id ? employee : item));
  }
  function remove(id: string) { setEmployees(current => current.filter(item => item.id !== id)); }
  return { employees, status, errorMessage, retry, insert, replace, remove };
}
