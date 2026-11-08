import { useEffect, useState } from "react";
import { getEmployee } from "./employeeApi";
import type { Employee } from "./types";

export function useEmployeeDetail() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<Employee | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!selectedId) return;
    const controller = new AbortController();
    let ignore = false;
    getEmployee(selectedId, controller.signal)
      .then((employee) => {
        if (!ignore) {
          setDetail(employee);
          setStatus("ready");
        }
      })
      .catch((error: unknown) => {
        if (
          !ignore &&
          !(error instanceof DOMException && error.name === "AbortError")
        )
          setStatus("error");
      });
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [selectedId, attempt]);
  function select(id: string) {
    setSelectedId(id);
    setDetail(null);
    setStatus("loading");
    setAttempt((count) => count + 1);
  }
  function clear() {
    setSelectedId(null);
    setDetail(null);
    setStatus("idle");
  }
  return { selectedId, detail, status, select, clear, setDetail };
}
