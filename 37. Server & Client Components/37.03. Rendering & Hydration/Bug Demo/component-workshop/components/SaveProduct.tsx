'use client';
import { useState } from 'react';
const storageKey = 'component-workshop:lamp-saved';
export function SaveProduct({ name }: { name: string }) {
 const [saved, setSaved] = useState(() => typeof window !== 'undefined' && localStorage.getItem(storageKey) === 'yes');
 return <button type="button" aria-pressed={saved} onClick={() => { const next = !saved; setSaved(next); localStorage.setItem(storageKey, next ? 'yes' : 'no'); }}>{saved ? 'Saved' : 'Save'} {name}</button>;
}
