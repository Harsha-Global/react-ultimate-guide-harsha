import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { StateStorage } from "zustand/middleware";
import { browserPreferenceStorage } from "./preferenceStorage.ts";
import { readSavedView, migrateSavedView } from "./savedView.ts";
import type { SavedView } from "./savedView.ts";

type SavedViewState = { saved: SavedView | null; save: (view: SavedView) => void; clear: () => void };
export function createSavedViewStore(storage: StateStorage) {
  return create<SavedViewState>()(persist((set) => ({
    saved: null,
    save: (view) => set({ saved: readSavedView(view) }),
    clear: () => set({ saved: null }),
  }), {
    name: "admin-saved-view", version: 2, migrate: migrateSavedView, storage: createJSONStorage(() => storage),
    partialize: (state) => ({ saved: state.saved }),
    merge: (persisted, current) => {
      const payload = persisted && typeof persisted === "object" && "saved" in persisted ? persisted.saved : null;
      return { ...current, saved: readSavedView(payload) };
    },
  }));
}
export const useSavedViewStore = createSavedViewStore(browserPreferenceStorage);
