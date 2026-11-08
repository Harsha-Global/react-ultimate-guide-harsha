import { useState } from "react";
import type { FormEvent } from "react";
import { createEmployee } from "./employeeApi";
import type { Employee, EmployeeInput } from "./types";

const blank: EmployeeInput = { name: "", role: "", team: "", email: "", active: true };
type Props = Readonly<{ onCreated: (employee: Employee) => void }>;

export default function EmployeeForm({ onCreated }: Props) {
  const [values, setValues] = useState<EmployeeInput>(blank);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  function update(field: keyof EmployeeInput, value: string | boolean) {
    setValues(current => ({ ...current, [field]: value }));
    setMessage("");
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const input: EmployeeInput = { ...values, name: values.name.trim(), role: values.role.trim(),
      team: values.team.trim(), email: values.email.trim() };
    if (!input.name || !input.role || !input.team || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      setMessage("Complete each field with a valid email address."); return;
    }
    setSaving(true); setMessage("");
    try {
      const created = await createEmployee(input);
      onCreated(created);
      setValues(blank);
      setMessage(`${created.name} was added.`);
    } catch (error: unknown) {
      setMessage(error instanceof Error ? `Save failed: ${error.message}` : "Save failed. Try again.");
    } finally { setSaving(false); }
  }
  return <section className="panel" aria-labelledby="add-heading"><h2 id="add-heading">Add a teammate</h2>
    <form className="employee-form" onSubmit={submit} noValidate>
      <label htmlFor="new-name">Name</label><input id="new-name" value={values.name} onChange={event => update("name", event.target.value)} />
      <label htmlFor="new-role">Role</label><input id="new-role" value={values.role} onChange={event => update("role", event.target.value)} />
      <label htmlFor="new-team">Team</label><input id="new-team" value={values.team} onChange={event => update("team", event.target.value)} />
      <label htmlFor="new-email">Email</label><input id="new-email" type="email" value={values.email} onChange={event => update("email", event.target.value)} />
      <label className="check"><input type="checkbox" checked={values.active} onChange={event => update("active", event.target.checked)} /> Active</label>
      <button type="submit" disabled={saving}>{saving ? "Saving…" : "Add employee"}</button>
      <p role="status">{message}</p>
    </form>
  </section>;
}
