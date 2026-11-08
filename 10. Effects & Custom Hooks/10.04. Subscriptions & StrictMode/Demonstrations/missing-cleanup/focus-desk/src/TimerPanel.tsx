import { useEffect, useState } from "react";

type TimerPanelProps = Readonly<{ minutes: number }>;

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function TimerPanel({ minutes }: TimerPanelProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(minutes * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || remainingSeconds === 0) return;

    const timeoutId = window.setTimeout(() => {
      const next = remainingSeconds - 1;
      setRemainingSeconds(next);
      if (next === 0) setRunning(false);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [running, remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds === 0) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey && event.shiftKey && event.code === "KeyP") {
        event.preventDefault();
        setRunning((current) => !current);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
  }, [remainingSeconds]);

  function reset() {
    setRunning(false);
    setRemainingSeconds(minutes * 60);
  }

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
      <p className="small-note">Shortcut: Alt + Shift + P to start or pause.</p>
      {remainingSeconds === 0 && <p role="status">Session complete.</p>}
    </div>
  );
}
