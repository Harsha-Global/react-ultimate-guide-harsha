import { useState } from "react";
import type { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectTasks, taskAdded, taskRemoved, taskToggled } from "./features/checklist/checklistSlice";
export function PackingChecklist() {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = text.trim();
    if (!value) {
      setError("Enter a task before adding it.");
      return;
    }
    dispatch(
      taskAdded({ id: crypto.randomUUID(), text: value, done: false }),
    );
    setText("");
    setError("");
  }
  return (
    <section className="checklist" aria-labelledby="checklist-title">
      <p className="eyebrow">Local preparation</p>
      <h2 id="checklist-title">Packing checklist</h2>
      <p className="muted">
        These are your workspace tasks. Checking a task does not fulfill an
        order.
      </p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label className={task.done ? "completed" : ""}>
              <input type="checkbox" checked={task.done} onChange={() => dispatch(taskToggled(task.id))} />
              {task.text}
            </label>
            <button className="text-button" aria-label={`Remove ${task.text}`} onClick={() => dispatch(taskRemoved(task.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && (
        <p className="empty">No preparation tasks yet.</p>
      )}
      <form onSubmit={addTask}>
        <label className="sr-only" htmlFor="new-task">
          New packing task
        </label>
        <input id="new-task" type="text" maxLength={120} value={text} onChange={(event) => setText(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? "task-error" : undefined} placeholder="Add a preparation task" />
        <button className="primary">Add task</button>
      </form>
      {error && (
        <p className="error" role="alert" id="task-error">
          {error}
        </p>
      )}
    </section>
  );
}
