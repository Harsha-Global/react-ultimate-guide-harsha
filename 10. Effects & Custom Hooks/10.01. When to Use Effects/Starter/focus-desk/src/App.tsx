import { useState } from "react";
import type { FormEvent } from "react";
import { initialTasks } from "./tasks";
import type { FocusTask } from "./tasks";

export default function App() {
  const [tasks, setTasks] = useState<FocusTask[]>(initialTasks);
  const [selectedId, setSelectedId] = useState(initialTasks[0].id);
  const [newTitle, setNewTitle] = useState("");

  const selectedTask = tasks.find((task) => task.id === selectedId);
  const openCount = tasks.filter((task) => !task.done).length;

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    const task: FocusTask = { id: crypto.randomUUID(), title, done: false };
    setTasks((current) => [...current, task]);
    setSelectedId(task.id);
    setNewTitle("");
  }

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to Focus Desk</a>
      <main className="desk" id="main-content" tabIndex={-1}>
        <header className="hero">
          <div>
            <p className="eyebrow">Your workspace</p>
            <h1>Focus Desk</h1>
            <p>Choose one task, then give it your attention.</p>
          </div>
          <div className="hero-stat">
            <strong>{openCount}</strong>
            <span>open {openCount === 1 ? "task" : "tasks"}</span>
          </div>
        </header>

        <div className="desk-grid">
          <section className="panel" aria-labelledby="task-heading">
            <div className="panel-heading">
              <p className="eyebrow">Make it manageable</p>
              <h2 id="task-heading">Tasks</h2>
            </div>
            <form className="task-form" onSubmit={addTask}>
              <label htmlFor="new-task">Add a task</label>
              <div className="input-row">
                <input
                  id="new-task"
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  placeholder="What will you work on?"
                />
                <button type="submit">Add</button>
              </div>
            </form>
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.id} className={task.id === selectedId ? "selected" : ""}>
                  <input
                    type="checkbox"
                    aria-label={`Mark ${task.title} ${task.done ? "open" : "done"}`}
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  <button type="button" onClick={() => setSelectedId(task.id)} aria-pressed={task.id === selectedId}>
                    {task.title}
                  </button>
                  {task.done && <span className="done-label">Done</span>}
                </li>
              ))}
            </ul>
          </section>

          <section className="panel focus-panel" aria-labelledby="focus-heading">
            <p className="eyebrow">Current focus</p>
            <h2 id="focus-heading">{selectedTask?.title ?? "Choose a task"}</h2>
            <p>We’ll add a session timer, keyboard controls and saved preferences as we learn how Effects work.</p>
            <div className="focus-placeholder" aria-hidden="true"><span>25:00</span></div>
            <p className="small-note">For now, this time is only a visual starting point.</p>
          </section>
        </div>
      </main>
    </>
  );
}
