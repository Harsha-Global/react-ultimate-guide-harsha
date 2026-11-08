import type { Density } from "./preferencesSlice";
export const PREFERENCES_KEY = "order-desk:preferences";
export function browserStorage(): Storage | null {
  try { return window.localStorage; } catch { return null; }
}

export function loadDensity(storage: Storage | null): Density {
  try {
    const raw = storage?.getItem(PREFERENCES_KEY);
    if (!raw) return "comfortable";
    const value: unknown = JSON.parse(raw);
    if (typeof value === "object" && value !== null && "version" in value && value.version === 1 && "density" in value && (value.density === "compact" || value.density === "comfortable")) return value.density;
  } catch { /* Missing, blocked or malformed storage falls back to the default. */ }
  return "comfortable";
}

export function loadShowTotals(storage: Storage | null): boolean {
  try {
    const raw = storage?.getItem(PREFERENCES_KEY);
    if (!raw) return true;
    const value: unknown = JSON.parse(raw);
    if (typeof value === "object" && value !== null && "version" in value && value.version === 1 && "showTotals" in value && typeof value.showTotals === "boolean") return value.showTotals;
  } catch { /* Invalid storage keeps the visible-total default. */ }
  return true;
}
