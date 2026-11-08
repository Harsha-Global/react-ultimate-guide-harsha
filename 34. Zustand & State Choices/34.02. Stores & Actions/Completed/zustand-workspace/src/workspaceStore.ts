import { create } from "zustand";

export type Density = "comfortable" | "compact";
export type WorkspacePreferences = { density: Density; summaryOpen: boolean };
export type WorkspaceState = WorkspacePreferences & {
  setDensity: (density: Density) => void;
  toggleSummary: () => void;
  resetPreferences: () => void;
};
export const initialPreferences: WorkspacePreferences = { density: "comfortable", summaryOpen: true };

export const useWorkspaceStore = create<WorkspaceState>()((set) => ({
  ...initialPreferences,
  setDensity: (density) => set({ density }),
  toggleSummary: () => set((state) => ({ summaryOpen: !state.summaryOpen })),
  resetPreferences: () => set({ ...initialPreferences }),
}));
