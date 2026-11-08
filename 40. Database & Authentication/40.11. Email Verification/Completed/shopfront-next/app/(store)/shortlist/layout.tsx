import type { Metadata } from 'next';
import type { ReactNode } from 'react';
export const metadata: Metadata = { title: 'Your shortlist', robots: { index: false, follow: true } };
export default function ShortlistLayout({ children }: { children: ReactNode }) { return children; }
