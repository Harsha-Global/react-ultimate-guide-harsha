import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';
export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><header><Link href="/">Interview lab</Link></header><main>{children}</main></body></html>;
}
