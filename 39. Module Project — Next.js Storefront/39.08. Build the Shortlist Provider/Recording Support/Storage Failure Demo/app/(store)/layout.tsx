import { StorageMessage } from "@/components/StorageMessage";
import { PublicShortlistProvider } from '@/components/PublicShortlistProvider';
import Link from 'next/link';
import { Suspense, type ReactNode } from 'react';
export default function StoreLayout({children,modal}:{children:ReactNode;modal:ReactNode}){return <PublicShortlistProvider><StorageMessage/><a className="skip" href="#content">Skip to content</a><header className="top wrap"><Link className="brand" href="/">ShopFront.</Link><nav aria-label="Main"><Link href="/catalog" prefetch={false}>Collection</Link><Link href="/about">Our story</Link><Link href="/delivery">Delivery</Link></nav></header><main id="content" tabIndex={-1} className="wrap"><Suspense fallback={<p role="status">Loading this page…</p>}>{children}</Suspense></main><Suspense fallback={null}>{modal}</Suspense><footer className="wrap footer">ShopFront course demo · USD prices · No orders or payments</footer></PublicShortlistProvider>;}
