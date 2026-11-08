export const PREFERENCES_KEY = "order-desk:preferences";
export function browserStorage(): Storage | null {
  try { return window.localStorage; } catch { return null; }
}
