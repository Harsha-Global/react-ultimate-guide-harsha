import { Suspense } from 'react';
import { CachedCategory } from '@/components/CachedCategory';
import { CatalogSummary } from '@/components/CatalogSummary';
import { DataCatalog } from '@/components/DataCatalog';
export default function DataLabPage() {
 return <><p className="eyebrow">Server data workshop</p><h1>One catalog, clear freshness.</h1><p>This page reads the supplied API from the Next.js server.</p><Suspense fallback={<p role="status">Loading the public catalog…</p>}><DataCatalog/></Suspense><Suspense fallback={<p role="status">Loading the summary…</p>}><CatalogSummary/></Suspense><CachedCategory category="Workspace"/></>;
}
