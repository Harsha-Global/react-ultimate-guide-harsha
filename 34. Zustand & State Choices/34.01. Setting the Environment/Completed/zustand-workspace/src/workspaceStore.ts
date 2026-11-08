import { create } from "zustand";

export type Density = "comfortable" | "compact";
type WorkspaceState = {
  density: Density;
  setDensity: (density: Density) => void;
};

export const useWorkspaceStore = create<WorkspaceState>()((set) => ({
  density: "comfortable",
  setDensity: (density) => set({ density }),
}));
