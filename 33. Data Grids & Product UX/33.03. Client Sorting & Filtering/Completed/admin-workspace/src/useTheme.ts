import { useLayoutEffect, useState } from "react";
import { connectTheme, parseThemePreference, readThemePreference, saveThemePreference } from "./theme";

export function useTheme() {
  const [preference, setPreference] = useState(readThemePreference);

  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    return connectTheme(preference, media, document.documentElement);
  }, [preference]);

  function chooseTheme(value: string) {
    const next = parseThemePreference(value);
    setPreference(next);
    saveThemePreference(next);
  }

  return { preference, chooseTheme };
}
