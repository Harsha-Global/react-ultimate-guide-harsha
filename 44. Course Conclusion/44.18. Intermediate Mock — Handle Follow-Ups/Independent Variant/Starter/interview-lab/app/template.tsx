import type { ReactNode } from 'react';
// The existing template deliberately gives each route visit a fresh editor page.
// The shared layout provider remains above this remount boundary.
export default function Template({ children }: { children: ReactNode }) { return <>{children}</>; }
