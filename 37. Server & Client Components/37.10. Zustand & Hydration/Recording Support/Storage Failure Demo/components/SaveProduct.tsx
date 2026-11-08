'use client';
import { useEffect, useState } from 'react';
const storageKey = 'component-workshop:lamp-saved';
export function SaveProduct({ name }: { name: string }) {
 const [saved, setSaved] = useState(false);
 const [ready, setReady] = useState(false);
 const [message, setMessage] = useState('Restoring your choice…');
 useEffect(() => {
  try {
   setSaved(localStorage.getItem(storageKey) === 'yes');
   setMessage('Your choice stays in this browser.');
  } catch { setMessage('Storage is unavailable. Your choice lasts for this visit.'); }
  setReady(true);
 }, []);
 function toggle() {
  const next = !saved;
  setSaved(next);
  try { localStorage.setItem(storageKey, next ? 'yes' : 'no'); }
  catch { setMessage('Storage is unavailable. Your choice lasts for this visit.'); }
 }
 return <div className="panel"><button type="button" disabled={!ready} aria-pressed={saved} onClick={toggle}>{saved ? 'Saved' : 'Save'} {name}</button><p role="status">{message}</p></div>;
}
