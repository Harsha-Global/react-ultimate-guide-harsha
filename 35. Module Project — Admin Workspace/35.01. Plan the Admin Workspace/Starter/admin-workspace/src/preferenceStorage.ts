import type { StateStorage } from "zustand/middleware";
export type StorageProblem = "restore" | "save" | null;

export function createStorageHealth() {
  let problem: StorageProblem = null;
  const listeners = new Set<() => void>();
  return {
    getSnapshot: () => problem,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    report(next: StorageProblem) {
      if (next === problem) return;
      problem = next;
      for (const listener of listeners) listener();
    },
  };
}
export const storageHealth = createStorageHealth();
export function createSafePreferenceStorage(getStorage: () => Storage, health = storageHealth): StateStorage {
  return {
    getItem: (name) => getStorage().getItem(name),
    setItem(name, value) {
      try {
        getStorage().setItem(name, value);
        if (health.getSnapshot() === "save") health.report(null);
      } catch { health.report("save"); }
    },
    removeItem(name) {
      try { getStorage().removeItem(name); } catch { health.report("save"); }
    },
  };
}
export const browserPreferenceStorage = createSafePreferenceStorage(() => localStorage);
