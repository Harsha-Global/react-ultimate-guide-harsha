import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

export default function QuickFind() {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [message, setMessage] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = employeeId.trim();
    if (!/^e\d+$/.test(id)) {
      setMessage("Use an employee id such as e1.");
      return;
    }
    setMessage("");
    void navigate(`/employees/${encodeURIComponent(id)}`);
  }
  return (
    <form className="lookup" onSubmit={submit}>
      <label>
        Open employee id
        <input
          value={employeeId}
          onChange={(event) => setEmployeeId(event.target.value)}
          placeholder="e1"
        />
      </label>
      <button>Open employee</button>
      {message && <p role="alert">{message}</p>}
    </form>
  );
}
