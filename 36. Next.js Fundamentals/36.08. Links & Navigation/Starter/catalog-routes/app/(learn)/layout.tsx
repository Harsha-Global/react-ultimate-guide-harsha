import type { ReactNode } from 'react';
import Link from 'next/link';
import { VisitCounter } from '@/components/VisitCounter';

export default function LearningLayout({ children }: { children: ReactNode }) {
  return <><header><strong>Catalog Routes</strong><nav>
    <Link href="/">Home</Link><Link href="/catalog">Catalog</Link><Link href="/story">Story</Link>
  </nav><VisitCounter label="Layout counter" /></header>{children}</>;
}
