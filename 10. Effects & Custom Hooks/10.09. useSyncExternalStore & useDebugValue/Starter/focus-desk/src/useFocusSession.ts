import { useEffect, useState } from "react";

export function useFocusSession(minutes: number) {
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

  function reset() {
    setRunning(false);
    setRemainingSeconds(minutes * 60);
  }

  return {
    remainingSeconds,
    running,
    setRunning,
    reset,
  };
}
