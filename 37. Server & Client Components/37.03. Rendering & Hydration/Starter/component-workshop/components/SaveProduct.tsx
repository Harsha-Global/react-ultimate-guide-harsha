'use client';
import { useState } from 'react';
export function SaveProduct({ name }: { name: string }) {
 const [saved, setSaved] = useState(false);
 return <button type="button" aria-pressed={saved} onClick={() => setSaved(value => !value)}>{saved ? 'Saved' : 'Save'} {name}</button>;
}
