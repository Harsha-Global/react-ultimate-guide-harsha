import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';
export default function RootLayout({ children }: { children: ReactNode }) {
 return <html lang="en"><body><header><strong>Catalog Lab</strong><nav><Link href="/">Home</Link><Link href="/data-lab" prefetch={false}>Data lab</Link></nav></header><main>{children}</main></body></html>;
}
