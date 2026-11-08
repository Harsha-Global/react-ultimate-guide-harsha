import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { densityChanged, defaultStatusChanged, preferencesReset, saveStatusChanged } from "./preferencesSlice";
import type { PreferencesState } from "./preferencesSlice";
import { PREFERENCES_KEY } from "./storage";
export function createPreferencesListener(storage: Storage | null) {
  const listener = createListenerMiddleware<{ preferences: PreferencesState }>();
  listener.startListening({
    matcher: isAnyOf(densityChanged, defaultStatusChanged, preferencesReset),
    effect: async (action, api) => {
      api.cancelActiveListeners();
      const { density, defaultStatus } = api.getState().preferences;
      if (!preferencesReset.match(action)) await api.delay(600);
      try {
        if (!storage) throw new Error("Storage unavailable");
        if (preferencesReset.match(action)) storage.removeItem(PREFERENCES_KEY);
        else storage.setItem(PREFERENCES_KEY, JSON.stringify({ version: 2, density, defaultStatus }));
        api.dispatch(saveStatusChanged(preferencesReset.match(action) ? "Preferences reset" : "Saved on this browser"));
      } catch { api.dispatch(saveStatusChanged("Could not save on this browser")); }
    },
  });
  return listener;
}
