import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    window.setTimeout(() => setDebouncedValue(value), delayMs);
    // BUG: the old callback is never canceled.
  }, [value, delayMs]);

  return debouncedValue;
}
