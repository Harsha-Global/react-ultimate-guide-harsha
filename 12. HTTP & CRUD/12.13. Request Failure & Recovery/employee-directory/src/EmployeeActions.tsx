import { useState } from "react";
import type { FormEvent } from "react";
import {
  deleteEmployee,
  replaceEmployee,
  setEmployeeActive,
} from "./employeeApi";
import type { Employee, EmployeeInput } from "./types";

type Props = Readonly<{
  employee: Employee;
  onChanged: (employee: Employee) => void;
  onDeleted: (id: string) => void;
}>;

export default function EmployeeActions({
  employee,
  onChanged,
  onDeleted,
}: Props) {
  const [draft, setDraft] = useState<EmployeeInput>({
    name: employee.name,
    role: employee.role,
    team: employee.team,
    email: employee.email,
    active: employee.active,
  });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  function update(field: keyof EmployeeInput, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setMessage("");
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const input = {
      ...draft,
      name: draft.name.trim(),
      role: draft.role.trim(),
      team: draft.team.trim(),
      email: draft.email.trim(),
    };
    if (
      !input.name ||
      !input.role ||
      !input.team ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)
    ) {
      setMessage("Complete each field with a valid email address.");
      return;
    }
    setBusy(true);
    try {
      const updated = await replaceEmployee(employee.id, input);
      onChanged(updated);
      setMessage("Changes saved.");
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "Update failed.");
    } finally {
      setBusy(false);
    }
  }
  async function toggleActive() {
    if (busy) return;
    setBusy(true);
    try {
      const updated = await setEmployeeActive(employee.id, !employee.active);
      onChanged(updated);
      setDraft((current) => ({ ...current, active: updated.active }));
      setMessage(updated.active ? "Marked active." : "Marked inactive.");
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "Update failed.");
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (busy) return;
    setBusy(true);
    try {
      await deleteEmployee(employee.id);
      onDeleted(employee.id);
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "Delete failed.");
      setBusy(false);
    }
  }
  return (
    <div className="actions">
      <form className="employee-form" onSubmit={save} noValidate>
        <h3>Edit details</h3>
        <label htmlFor="edit-name">Name</label>
        <input
          id="edit-name"
          value={draft.name}
          onChange={(event) => update("name", event.target.value)}
        />
        <label htmlFor="edit-role">Role</label>
        <input
          id="edit-role"
          value={draft.role}
          onChange={(event) => update("role", event.target.value)}
        />
        <label htmlFor="edit-team">Team</label>
        <input
          id="edit-team"
          value={draft.team}
          onChange={(event) => update("team", event.target.value)}
        />
        <label htmlFor="edit-email">Email</label>
        <input
          id="edit-email"
          type="email"
          value={draft.email}
          onChange={(event) => update("email", event.target.value)}
        />
        <button type="submit" disabled={busy}>
          Save full record
        </button>
      </form>
      <button type="button" disabled={busy} onClick={toggleActive}>
        Mark {employee.active ? "inactive" : "active"}
      </button>
      {!confirmDelete ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => setConfirmDelete(true)}
        >
          Delete record…
        </button>
      ) : (
        <div>
          <p>Delete {employee.name}?</p>
          <button type="button" disabled={busy} onClick={remove}>
            Confirm delete
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </button>
        </div>
      )}
      <p role="status">{message}</p>
    </div>
  );
}
