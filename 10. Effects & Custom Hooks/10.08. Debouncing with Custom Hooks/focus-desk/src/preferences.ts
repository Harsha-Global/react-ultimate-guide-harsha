import type { FocusMode } from "./mode";

const key = "focus-desk-preferences-v1";

export type Preferences = Readonly<{
  mode: FocusMode;
  focusMinutes: 15 | 25 | 45;
}>;

export const defaultPreferences: Preferences = {
  mode: "focus",
  focusMinutes: 25,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultPreferences;

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return defaultPreferences;

    const mode = parsed.mode;
    const focusMinutes = parsed.focusMinutes;
    if (mode !== "focus" && mode !== "break") return defaultPreferences;
    if (focusMinutes !== 15 && focusMinutes !== 25 && focusMinutes !== 45) {
      return defaultPreferences;
    }
    return { mode, focusMinutes };
  } catch {
    return defaultPreferences;
  }
}

export function savePreferences(preferences: Preferences): void {
  try {
    localStorage.setItem(key, JSON.stringify(preferences));
  } catch {
    // The session still works when browser storage is unavailable.
  }
}
