import { create } from "zustand";
import type { StateStorage } from "zustand/middleware";
import { createJSONStorage, persist } from "zustand/middleware";
import { browserPreferenceStorage, storageHealth, createStorageHealth } from "./preferenceStorage.ts";
import { initialPreferences, readPreferences, migratePreferences } from "./preferenceSchema.ts";
import type { WorkspacePreferences } from "./preferenceSchema.ts";

export type Density = WorkspacePreferences["density"];
export type WorkspaceState = WorkspacePreferences & {
  setDensity: (density: Density) => void;
  setLocale: (locale: WorkspacePreferences["locale"]) => void;
  setZone: (zone: WorkspacePreferences["zone"]) => void;
  toggleSummary: () => void;
  resetPreferences: () => void;
};

export function createWorkspaceStore(storage: StateStorage, health = createStorageHealth()) {
  return create<WorkspaceState>()(persist((set) => ({
  ...initialPreferences,
  setDensity: (density) => set({ density }),
  setLocale: (locale) => set({ locale }),
  setZone: (zone) => set({ zone }),
  toggleSummary: () => set((state) => ({ summaryOpen: !state.summaryOpen })),
  resetPreferences: () => set({ ...initialPreferences }),
}), {
  name: "admin-workspace-preferences",
  version: 2,
  storage: createJSONStorage(() => storage),
  skipHydration: true,
  onRehydrateStorage: () => (_state, error) => { if (error) health.report("restore"); },
  partialize: (state) => ({ density: state.density, summaryOpen: state.summaryOpen, locale: state.locale, zone: state.zone }),
  migrate: migratePreferences,
  merge: (persisted, current) => ({ ...current, ...readPreferences(persisted) }),
}));

}

export const useWorkspaceStore = createWorkspaceStore(browserPreferenceStorage, storageHealth);
