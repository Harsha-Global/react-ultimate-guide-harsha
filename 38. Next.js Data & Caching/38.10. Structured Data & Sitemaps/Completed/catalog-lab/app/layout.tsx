import { Suspense, type ReactNode } from 'react';
import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site';
import Link from 'next/link';
import './globals.css';
export const metadata:Metadata={metadataBase:siteUrl,title:{default:'Catalog Lab',template:'%s | Catalog Lab'},description:'A small teaching catalog for server data and metadata.'};
export default function RootLayout({ children }: { children: ReactNode }) {
 return <html lang="en"><body><header><strong>Catalog Lab</strong><nav><Link href="/">Home</Link><Link href="/data-lab" prefetch={false}>Data lab</Link><Link href="/catalog" prefetch={false}>Catalog</Link></nav></header><main><Suspense fallback={<p>Loading page…</p>}>{children}</Suspense></main></body></html>;
}
