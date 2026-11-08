"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useTransition, type FormEvent } from 'react';
import { categories } from '@/lib/categories';
import { readStorefrontQuery, type StorefrontQuery } from '@/lib/storefrontQuery';
export function StorefrontFilters({ query, fixedCategory = false }: { query: StorefrontQuery; fixedCategory?: boolean }) {
 const router = useRouter();
 const pathname = usePathname();
 const [pending, startTransition] = useTransition();
 function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const values = readStorefrontQuery({ q: String(data.get('q') ?? ''), category: String(data.get('category') ?? ''), sort: String(data.get('sort') ?? '') });
  const search = new URLSearchParams();
  if (values.q) search.set('q', values.q);
  if (!fixedCategory && values.category !== 'All') search.set('category', values.category);
  if (values.sort === 'price') search.set('sort', 'price');
  const suffix = search.toString();
  startTransition(() => router.push(`${pathname}${suffix ? `?${suffix}` : ''}`, { scroll: false }));
 }
 return (
  <form key={JSON.stringify(query)} className="toolbar panel" onSubmit={submit} aria-busy={pending}>
   <label>Search products<input name="q" defaultValue={query.q} maxLength={60}/></label>
   {!fixedCategory && <label>Category<select name="category" defaultValue={query.category}><option value="All">All categories</option>{categories.map(category => <option key={category}>{category}</option>)}</select></label>}
   <label>Sort<select name="sort" defaultValue={query.sort}><option value="featured">Featured</option><option value="price">Price: low to high</option></select></label>
   <button disabled={pending}>{pending ? 'Applying…' : 'Apply filters'}</button>
   <span role="status">{pending ? 'Updating collection' : ''}</span>
  </form>
 );
}
