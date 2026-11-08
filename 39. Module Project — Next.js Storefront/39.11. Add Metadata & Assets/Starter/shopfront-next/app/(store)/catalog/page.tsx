import { Suspense } from 'react';
import { InventoryDemo } from '@/components/InventoryDemo';
import { StorefrontHeading } from '@/components/StorefrontHeading';
import { CategoryLinks } from '@/components/CategoryLinks';
import { StorefrontFilters } from '@/components/StorefrontFilters';
import { StorefrontResults } from '@/components/StorefrontResults';
import { readStorefrontQuery, type RawSearch } from '@/lib/storefrontQuery';
export default async function CatalogPage({ searchParams }: { searchParams: Promise<RawSearch> }) {
 const query = readStorefrontQuery(await searchParams);
 const key = JSON.stringify(query);
 return <><StorefrontHeading/><CategoryLinks/><StorefrontFilters query={query}/><Suspense key={key} fallback={<p role="status">Loading your collection…</p>}><StorefrontResults query={query}/></Suspense><Suspense fallback={<p role="status">Loading the local inventory editor…</p>}><InventoryDemo/></Suspense></>;
}
