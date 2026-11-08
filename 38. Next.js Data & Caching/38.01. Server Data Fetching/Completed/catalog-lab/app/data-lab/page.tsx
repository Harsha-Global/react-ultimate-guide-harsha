import { Suspense } from 'react';
import { DataCatalog } from '@/components/DataCatalog';
export default function DataLabPage() {
 return <><p className="eyebrow">Server data workshop</p><h1>One catalog, clear freshness.</h1><p>This page reads the supplied API from the Next.js server.</p><Suspense fallback={<p role="status">Loading the public catalog…</p>}><DataCatalog/></Suspense></>;
}
