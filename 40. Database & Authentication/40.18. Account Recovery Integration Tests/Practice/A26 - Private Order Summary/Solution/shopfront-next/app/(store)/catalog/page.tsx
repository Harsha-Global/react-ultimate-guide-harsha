import type { Metadata } from 'next';
import { Suspense } from 'react';
import { InventoryDemo } from '@/components/InventoryDemo';
import { StorefrontHeading } from '@/components/StorefrontHeading';
import { CategoryLinks } from '@/components/CategoryLinks';
import { StorefrontFilters } from '@/components/StorefrontFilters';
import { StorefrontResults } from '@/components/StorefrontResults';
import { readStorefrontQuery, type RawSearch } from '@/lib/storefrontQuery';
export async function generateMetadata({ searchParams }: { searchParams: Promise<RawSearch> }): Promise<Metadata> {
 const query = readStorefrontQuery(await searchParams);
 const filtered = query.q !== '' || query.category !== 'All' || query.sort !== 'featured';
 return { title: 'The collection', alternates: { canonical: '/catalog' }, robots: filtered ? { index: false, follow: true } : { index: true, follow: true } };
}
export default async function CatalogPage({ searchParams }: { searchParams: Promise<RawSearch> }) {
 const query = readStorefrontQuery(await searchParams);
 const key = JSON.stringify(query);
 return (
  <>
   <StorefrontHeading/>
   <CategoryLinks/>
   <StorefrontFilters query={query}/>
   <Suspense key={key} fallback={<p role="status">Loading your collection…</p>}>
    <StorefrontResults query={query}/>
   </Suspense>
   <Suspense fallback={<p role="status">Loading the local inventory editor…</p>}>
    <InventoryDemo/>
   </Suspense>
  </>
 );
}
