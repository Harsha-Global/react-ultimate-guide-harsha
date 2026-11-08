import { create } from "zustand";
import type { StateStorage } from "zustand/middleware";
import { createJSONStorage, persist } from "zustand/middleware";
import { browserPreferenceStorage, storageHealth, createStorageHealth } from "./preferenceStorage.ts";
import { initialPreferences, readPreferences, migratePreferences } from "./preferenceSchema.ts";
import type { WorkspacePreferences } from "./preferenceSchema.ts";

export type Density = WorkspacePreferences["density"];
export type WorkspaceState = WorkspacePreferences & {
  setDensity: (density: Density) => void;
  toggleSummary: () => void;
  resetPreferences: () => void;
};

export function createWorkspaceStore(storage: StateStorage, health = createStorageHealth()) {
  return create<WorkspaceState>()(persist((set) => ({
  ...initialPreferences,
  setDensity: (density) => set({ density }),
  toggleSummary: () => set((state) => ({ summaryOpen: !state.summaryOpen })),
  resetPreferences: () => set({ ...initialPreferences }),
}), {
  name: "admin-workspace-preferences",
  version: 1,
  storage: createJSONStorage(() => storage),
  skipHydration: true,
  onRehydrateStorage: () => (_state, error) => { if (error) health.report("restore"); },
  partialize: (state) => ({ density: state.density, summaryOpen: state.summaryOpen }),
  migrate: migratePreferences,
  merge: (persisted, current) => ({ ...current, ...readPreferences(persisted) }),
}));
}

export const useWorkspaceStore = createWorkspaceStore(browserPreferenceStorage, storageHealth);
