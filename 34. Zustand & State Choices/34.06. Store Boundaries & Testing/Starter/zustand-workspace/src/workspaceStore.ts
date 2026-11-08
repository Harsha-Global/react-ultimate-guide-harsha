import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { browserPreferenceStorage, storageHealth } from "./preferenceStorage.ts";
import { initialPreferences, readPreferences, migratePreferences } from "./preferenceSchema.ts";
import type { WorkspacePreferences } from "./preferenceSchema.ts";

export type Density = WorkspacePreferences["density"];
export type WorkspaceState = WorkspacePreferences & {
  setDensity: (density: Density) => void;
  toggleSummary: () => void;
  resetPreferences: () => void;
};

export const useWorkspaceStore = create<WorkspaceState>()(persist((set) => ({
  ...initialPreferences,
  setDensity: (density) => set({ density }),
  toggleSummary: () => set((state) => ({ summaryOpen: !state.summaryOpen })),
  resetPreferences: () => set({ ...initialPreferences }),
}), {
  name: "admin-workspace-preferences",
  version: 1,
  storage: createJSONStorage(() => browserPreferenceStorage),
  skipHydration: true,
  onRehydrateStorage: () => (_state, error) => { if (error) storageHealth.report("restore"); },
  partialize: (state) => ({ density: state.density, summaryOpen: state.summaryOpen }),
  migrate: migratePreferences,
  merge: (persisted, current) => ({ ...current, ...readPreferences(persisted) }),
}));
