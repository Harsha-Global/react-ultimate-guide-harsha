"use client";
import Link from 'next/link';
import { usePublicShortlist } from './PublicShortlistProvider';
export function ShortlistLink() {
 const { ids } = usePublicShortlist();
 return <Link className="shortlist-count" href="/shortlist">Shortlist ({ids.length})</Link>;
}
export function ShortlistNotice() {
 const { message } = usePublicShortlist();
 return message ? <p className="wrap shortlist-message" role="status">{message}</p> : null;
}
