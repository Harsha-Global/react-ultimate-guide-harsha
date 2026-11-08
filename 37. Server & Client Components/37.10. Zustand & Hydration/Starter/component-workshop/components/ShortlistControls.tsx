'use client';
import { useShortlist } from './ShortlistProvider';
export function ShortlistButton({ id, name }: { id: string; name: string }) {
 const { ids, toggle } = useShortlist();
 return <button type="button" aria-pressed={ids.includes(id)} onClick={() => toggle(id)}>{ids.includes(id) ? 'Remove' : 'Shortlist'} {name}</button>;
}
export function ShortlistCount() {
 const { ids } = useShortlist();
 return <p role="status">Shortlisted products: {ids.length}</p>;
}
