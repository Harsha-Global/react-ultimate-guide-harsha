import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import FocusTitle from "./FocusTitle";
import { initialTasks } from "./tasks";
import type { FocusTask } from "./tasks";
import type { FocusMode } from "./mode";
import TimerPanel from "./TimerPanel";
import { readPreferences, savePreferences } from "./preferences";
import type { Preferences } from "./preferences";
import { useDebouncedValue } from "./useDebouncedValue";
import { useOnlineStatus } from "./useOnlineStatus";

export default function App() {
  const [tasks, setTasks] = useState<FocusTask[]>(initialTasks);
  const [selectedId, setSelectedId] = useState(initialTasks[0].id);
  const [newTitle, setNewTitle] = useState("");
  const [query, setQuery] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [preferences, setPreferences] = useState<Preferences>(readPreferences);
  const mode = preferences.mode;

  const selectedTask = tasks.find((task) => task.id === selectedId);
  const openCount = tasks.filter((task) => !task.done).length;
  const debouncedQuery = useDebouncedValue(query, 350);
  const isOnline = useOnlineStatus();
  const visibleTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(debouncedQuery.trim().toLowerCase()),
  );

  useEffect(() => {
    savePreferences(preferences);
  }, [preferences]);

  function chooseMode(nextMode: FocusMode) {
    setPreferences((current) => ({ ...current, mode: nextMode }));
  }

  function chooseDuration(value: string) {
    const minutes = Number(value);
    if (minutes !== 15 && minutes !== 25 && minutes !== 45) return;
    setPreferences((current) => ({ ...current, focusMinutes: minutes }));
  }

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
      <FocusTitle taskTitle={selectedTask?.title ?? "Choose a task"} mode={mode} />
      <main className="desk" id="main-content" tabIndex={-1}>
        <header className="hero">
          <div>
            <p className="eyebrow">Your workspace</p>
            <h1>Focus Desk</h1>
            <p>Choose one task, then give it your attention.</p>
            <p className="connection-status" role="status">Browser reports {isOnline ? "online" : "offline"}.</p>
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
            <label className="search-label" htmlFor="task-search">Find a task</label>
            <input
              className="search-input"
              id="task-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your tasks"
            />
            {visibleTasks.length === 0 && <p role="status">No tasks match that search.</p>}
            <ul className="task-list">
              {visibleTasks.map((task) => (
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
            <div className="mode-switch" aria-label="Session mode">
              <button type="button" aria-pressed={mode === "focus"} onClick={() => chooseMode("focus")}>Focus</button>
              <button type="button" aria-pressed={mode === "break"} onClick={() => chooseMode("break")}>Break</button>
            </div>
            <label className="duration-choice" htmlFor="focus-duration">Focus length
              <select
                id="focus-duration"
                value={preferences.focusMinutes}
                onChange={(event) => chooseDuration(event.target.value)}
              >
                <option value="15">15 minutes</option>
                <option value="25">25 minutes</option>
                <option value="45">45 minutes</option>
              </select>
            </label>
            <label className="name-choice" htmlFor="display-name">Name for session feedback
              <input
                id="display-name"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Your name"
              />
            </label>
            <p>Use the timer to give this task a bounded work period. Switching modes starts a fresh session.</p>
            <TimerPanel
              key={`${mode}-${preferences.focusMinutes}`}
              minutes={0.05}
              displayName={displayName}
            />
          </section>
        </div>
      </main>
    </>
  );
}
