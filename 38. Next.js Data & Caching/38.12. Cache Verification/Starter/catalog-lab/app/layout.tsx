import { Suspense, type ReactNode } from 'react';
import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site';
import Link from 'next/link';
import localFont from 'next/font/local';
import './globals.css';
const headingFont=localFont({src:'../public/fonts/Manrope-variable.woff2',variable:'--font-heading',display:'swap'});
const bodyFont=localFont({src:'../public/fonts/DMSans-variable.woff2',variable:'--font-body',display:'swap'});
export const metadata:Metadata={metadataBase:siteUrl,title:{default:'Catalog Lab',template:'%s | Catalog Lab'},description:'A small teaching catalog for server data and metadata.'};
export default function RootLayout({ children }: { children: ReactNode }) {
 return <html lang="en"><body className={`${headingFont.variable} ${bodyFont.variable}`}><header><strong>Catalog Lab</strong><nav><Link href="/">Home</Link><Link href="/data-lab" prefetch={false}>Data lab</Link><Link href="/catalog" prefetch={false}>Catalog</Link></nav></header><main><Suspense fallback={<p>Loading page…</p>}>{children}</Suspense></main></body></html>;
}
