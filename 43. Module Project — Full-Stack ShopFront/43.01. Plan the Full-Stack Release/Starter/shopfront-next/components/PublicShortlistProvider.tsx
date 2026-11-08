"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { parseShortlist, publicShortlistKey } from '@/lib/publicShortlist';
type PublicShortlist = { ids: string[]; ready: boolean; message: string; toggle: (id: string) => void };
const PublicShortlistContext = createContext<PublicShortlist | null>(null);
export function PublicShortlistProvider({ children }: { children: ReactNode }) {
 const [ids, setIds] = useState<string[]>([]);
 const [ready, setReady] = useState(false);
 const [message, setMessage] = useState('');
 useEffect(() => {
  try { setIds(parseShortlist(localStorage.getItem(publicShortlistKey))); }
  catch { setMessage('Saved choices could not be restored. You can still shortlist items in this tab.'); }
  setReady(true);
 }, []);
 useEffect(() => {
  if (!ready) return;
  try { localStorage.setItem(publicShortlistKey, JSON.stringify(ids)); }
  catch { setMessage('Your choices work in this tab, but could not be saved for your next visit.'); }
 }, [ids, ready]);
 function toggle(id: string) {
  if (!ready) return;
  setIds(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
 }
 return <PublicShortlistContext value={{ ids, ready, message, toggle }}>{children}</PublicShortlistContext>;
}
export function usePublicShortlist() {
 const value = useContext(PublicShortlistContext);
 if (!value) throw new Error('usePublicShortlist requires PublicShortlistProvider');
 return value;
}
