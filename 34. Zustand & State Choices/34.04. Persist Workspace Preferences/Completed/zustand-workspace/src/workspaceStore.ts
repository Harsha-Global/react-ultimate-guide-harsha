import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
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
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({ density: state.density, summaryOpen: state.summaryOpen }),
  migrate: migratePreferences,
  merge: (persisted, current) => ({ ...current, ...readPreferences(persisted) }),
}));
