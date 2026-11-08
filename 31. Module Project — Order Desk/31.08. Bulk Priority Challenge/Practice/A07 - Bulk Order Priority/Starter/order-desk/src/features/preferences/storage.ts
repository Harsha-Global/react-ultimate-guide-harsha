import type { Density } from "./preferencesSlice";
import type { StatusFilter } from "../../services/contracts";
export const PREFERENCES_KEY = "order-desk:preferences";
export function browserStorage(): Storage | null {
  try { return window.localStorage; } catch { return null; }
}
export function isStatusFilter(value: unknown): value is StatusFilter {
  return (
    value === "all" ||
    value === "ready" ||
    value === "payment-pending" ||
    value === "shipped"
  );
}

export function loadPreferences(storage: Storage | null): { density: Density; defaultStatus: StatusFilter } {
  const defaults = { density: "comfortable" as const, defaultStatus: "all" as const };
  try {
    const raw = storage?.getItem(PREFERENCES_KEY);
    if (!raw) return defaults;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || !("version" in value) || !("density" in value) ||
      (value.density !== "compact" && value.density !== "comfortable")) return defaults;
    if (value.version === 1) return { density: value.density, defaultStatus: "all" };
    if (value.version === 2 && "defaultStatus" in value && isStatusFilter(value.defaultStatus))
      return { density: value.density, defaultStatus: value.defaultStatus };
  } catch { /* Missing, blocked or malformed storage uses safe defaults. */ }
  return defaults;
}
