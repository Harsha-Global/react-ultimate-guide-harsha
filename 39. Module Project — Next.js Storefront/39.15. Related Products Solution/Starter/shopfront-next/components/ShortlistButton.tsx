"use client";
import { usePublicShortlist } from './PublicShortlistProvider';
export function ShortlistButton({ id, name }: { id: string; name: string }) {
 const { ids, ready, toggle } = usePublicShortlist();
 const selected = ids.includes(id);
 return <button className="shortlist-button" disabled={!ready} aria-pressed={selected} aria-label={`${selected ? 'Remove' : 'Shortlist'} ${name}`} onClick={() => toggle(id)}>{selected ? 'Remove from shortlist' : 'Shortlist item'}</button>;
}
