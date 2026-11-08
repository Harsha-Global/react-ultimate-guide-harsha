import { useEffect } from "react";
import { useFocusSession } from "./useFocusSession";

type TimerPanelProps = Readonly<{ minutes: number; shortcutEnabled?: boolean }>;

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function TimerPanel({ minutes, shortcutEnabled = true }: TimerPanelProps) {
  const { remainingSeconds, running, setRunning, reset } = useFocusSession(minutes);

  useEffect(() => {
    if (!shortcutEnabled || remainingSeconds === 0) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey && event.shiftKey && event.code === "KeyP") {
        event.preventDefault();
        setRunning((current) => !current);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [remainingSeconds, shortcutEnabled]);

  return (
    <div className="timer">
      <output className="time-display" aria-label={`${remainingSeconds} seconds remaining`}>
        {formatTime(remainingSeconds)}
      </output>
      <div className="timer-actions">
        <button type="button" onClick={() => setRunning((current) => !current)} disabled={remainingSeconds === 0}>
          {running ? "Pause" : "Start"}
        </button>
        <button type="button" className="secondary" onClick={reset}>Reset</button>
      </div>
      {shortcutEnabled && <p className="small-note">Shortcut: Alt + Shift + P to start or pause.</p>}
      {remainingSeconds === 0 && <p role="status">Session complete.</p>}
    </div>
  );
}
