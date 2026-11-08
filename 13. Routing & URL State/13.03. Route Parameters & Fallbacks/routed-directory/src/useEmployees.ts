import { useEffect, useState } from "react";
import { listEmployees } from "./employeeApi";
import type { Employee } from "./types";
export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let ignore = false;
    setStatus("loading");
    listEmployees(controller.signal)
      .then((result) => {
        if (!ignore) {
          setEmployees(result);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!ignore) setStatus("error");
      });
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [attempt]);
  return { employees, status, retry: () => setAttempt((value) => value + 1) };
}
