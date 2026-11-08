import type { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';
import { VisitCounter } from '@/components/VisitCounter';

export default function LearningLayout({ children }: { children: ReactNode }) {
  return <><header><strong>Catalog Routes</strong><Navigation /><VisitCounter label="Layout counter" /></header>{children}</>;
}
