'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
type Shortlist = { ids: string[]; toggle: (id: string) => void };
const ShortlistContext = createContext<Shortlist | null>(null);
export function ShortlistProvider({ children }: { children: ReactNode }) {
 const [ids, setIds] = useState<string[]>([]);
 function toggle(id: string) { setIds(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]); }
 return <ShortlistContext value={{ ids, toggle }}>{children}</ShortlistContext>;
}
export function useShortlist() {
 const value = useContext(ShortlistContext);
 if (!value) throw new Error('useShortlist requires ShortlistProvider');
 return value;
}
