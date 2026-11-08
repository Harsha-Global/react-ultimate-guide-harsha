import { Suspense } from 'react';
import { StorefrontHeading } from '@/components/StorefrontHeading';
import { CategoryLinks } from '@/components/CategoryLinks';
import { StorefrontResults } from '@/components/StorefrontResults';
import { readStorefrontQuery, type RawSearch } from '@/lib/storefrontQuery';
export default async function CatalogPage({ searchParams }: { searchParams: Promise<RawSearch> }) {
 const query = readStorefrontQuery(await searchParams);
 const key = JSON.stringify(query);
 return <><StorefrontHeading/><CategoryLinks/><Suspense key={key} fallback={<p role="status">Loading your collection…</p>}><StorefrontResults query={query}/></Suspense></>;
}
