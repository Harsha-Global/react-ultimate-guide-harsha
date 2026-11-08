'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useStore } from 'zustand';
import { makeShortlistStore, type ShortlistStore } from '@/lib/shortlistStore';
type StoreContextValue = { store: ShortlistStore; onStorageError: () => void };
const StoreContext = createContext<StoreContextValue | null>(null);
export function ShortlistProvider({ children, initialIds = [], storageKey = 'component-workshop:zustand-shortlist' }: { children: ReactNode; initialIds?: string[]; storageKey?: string }) {
 const [store] = useState(() => makeShortlistStore(initialIds, storageKey));
 const [ready, setReady] = useState(false);
 const [message, setMessage] = useState('Restoring your shortlist…');
 useEffect(() => {
  let active = true;
  Promise.resolve(store.persist.rehydrate()).then(() => {
   if (active) { setReady(true); setMessage(store.persist.hasHydrated() ? 'Your shortlist stays in this browser.' : 'Storage could not be restored. Use this shortlist for this visit.'); }
  }).catch(() => { if (active) { setReady(true); setMessage('Storage could not be restored. Use this shortlist for this visit.'); } });
  return () => { active = false; };
 }, [store]);
 return <StoreContext value={{ store, onStorageError: () => setMessage('Your latest choice could not be saved. It lasts for this visit.') }}><fieldset disabled={!ready}><legend>Product shortlist</legend>{children}</fieldset><p role="status">{message}</p></StoreContext>;
}
export function useShortlist() {
 const context = useContext(StoreContext);
 if (!context) throw new Error('useShortlist requires ShortlistProvider');
 const { store, onStorageError } = context;
 const ids = useStore(store, state => state.ids);
 const toggle = useStore(store, state => state.toggle);
 return { ids, toggle: (id: string) => { try { toggle(id); } catch { onStorageError(); } } };
}
