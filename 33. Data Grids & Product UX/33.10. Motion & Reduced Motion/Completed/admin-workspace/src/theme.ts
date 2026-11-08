export type ThemePreference = "system" | "light" | "dark";
export const THEME_KEY = "admin-workspace.theme";

export function parseThemePreference(value: unknown): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}

export function resolveThemePreference(preference: ThemePreference, systemDark: boolean): "light" | "dark" {
  return preference === "system" ? (systemDark ? "dark" : "light") : preference;
}

export function readThemePreference(): ThemePreference {
  try {
    return parseThemePreference(localStorage.getItem(THEME_KEY));
  } catch {
    return "system";
  }
}

export function saveThemePreference(preference: ThemePreference) {
  try {
    localStorage.setItem(THEME_KEY, preference);
  } catch {
    // The selected theme still works in this tab when storage is unavailable.
  }
}

export function connectTheme(preference: ThemePreference, media: MediaQueryList, root: HTMLElement) {
  function apply() {
    const resolved = resolveThemePreference(preference, media.matches);
    root.dataset.theme = resolved;
    root.style.colorScheme = resolved;
  }
  apply();
  if (preference !== "system") return () => {};
  media.addEventListener("change", apply);
  return () => media.removeEventListener("change", apply);
}
