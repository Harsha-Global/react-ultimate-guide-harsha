"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition, type FormEvent } from 'react';

export function CatalogFilters({ q, sort, inStock }: { q: string; sort: string; inStock: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [pending, startTransition] = useTransition();
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = new URLSearchParams(search.toString());
    const value = String(data.get('q') ?? '').trim().slice(0, 60);
    if (value) next.set('q', value); else next.delete('q');
    if (data.get('sort') === 'price') next.set('sort', 'price'); else next.delete('sort');
    if (data.get('stock') === '1') next.set('stock', '1'); else next.delete('stock');
    const suffix = next.toString();
    startTransition(() => router.push(`${pathname}${suffix ? `?${suffix}` : ''}`, { scroll: false }));
  }
  return <form onSubmit={submit} aria-busy={pending}>
    <label>Search <input name="q" defaultValue={q} maxLength={60} /></label>
    <label>Sort <select name="sort" defaultValue={sort}><option value="featured">Featured</option><option value="price">Lowest price</option></select></label>
    <label><input type="checkbox" name="stock" value="1" defaultChecked={inStock} />In stock only</label>
    <button disabled={pending}>Apply filters</button><span role="status">{pending ? 'Updating catalog' : ''}</span>
  </form>;
}
