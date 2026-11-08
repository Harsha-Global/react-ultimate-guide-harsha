import { createStore } from 'zustand/vanilla';
import { persist, createJSONStorage } from 'zustand/middleware';
import { shortlistStorage, restoreIds } from './shortlistPersistence.ts';
export type ShortlistState = { ids: string[]; toggle: (id: string) => void };
export function makeShortlistStore(initialIds: string[] = [], storageKey = 'component-workshop:zustand-shortlist') {
 return createStore<ShortlistState>()(persist((set) => ({
  ids: [...initialIds],
  toggle: id => set(state => ({ ids: state.ids.includes(id) ? state.ids.filter(value => value !== id) : [...state.ids, id] })),
 }), {
  name: storageKey,
  storage: createJSONStorage(() => shortlistStorage),
  skipHydration: true,
  partialize: state => ({ ids: state.ids }),
  merge: (saved, current) => ({ ...current, ids: restoreIds(saved, current.ids) }),
 }));
}
export type ShortlistStore = ReturnType<typeof makeShortlistStore>;
