import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CategoryLinks } from '@/components/CategoryLinks';
import { StorefrontFilters } from '@/components/StorefrontFilters';
import { StorefrontResults } from '@/components/StorefrontResults';
import { categoryFromSlug } from '@/lib/categories';
import { readStorefrontQuery, type RawSearch } from '@/lib/storefrontQuery';
export default async function CategoryPage({ params, searchParams }: { params: Promise<{ category: string }>; searchParams: Promise<RawSearch> }) {
 const category = categoryFromSlug((await params).category);
 if (!category) notFound();
 const query = { ...readStorefrontQuery(await searchParams), category };
 const key = JSON.stringify(query);
 return <><header className="catalog-heading"><p className="eyebrow">Shop the collection</p><h1>{category} essentials</h1></header><CategoryLinks current={category}/><StorefrontFilters query={query} fixedCategory/><Suspense key={key} fallback={<p role="status">Loading this category…</p>}><StorefrontResults query={query}/></Suspense></>;
}
