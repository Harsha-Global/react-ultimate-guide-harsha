import { useEffect, useEffectEvent, useState } from "react";

export function useFocusSession(minutes: number, displayName: string) {
  const [remainingSeconds, setRemainingSeconds] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const [notice, setNotice] = useState("");

  const onComplete = useEffectEvent(() => {
    const name = displayName.trim() || "there";
    setNotice(`Nice work, ${name}. Your session is complete.`);
  });

  useEffect(() => {
    if (!running || remainingSeconds === 0) return;

    const timeoutId = window.setTimeout(() => {
      const next = remainingSeconds - 1;
      setRemainingSeconds(next);
      if (next === 0) {
        setRunning(false);
        onComplete();
      }
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [running, remainingSeconds]);

  function reset() {
    setRunning(false);
    setRemainingSeconds(minutes * 60);
    setNotice("");
  }

  return {
    remainingSeconds,
    running,
    setRunning,
    reset,
    notice,
  };
}
