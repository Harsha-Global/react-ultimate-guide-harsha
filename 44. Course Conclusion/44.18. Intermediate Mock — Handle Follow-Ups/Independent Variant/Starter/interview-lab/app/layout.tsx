import type { ReactNode } from 'react';
import Link from 'next/link';
import { EditorProvider } from './EditorState';
import './globals.css';
export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><header><Link href="/">Interview lab</Link></header><EditorProvider><main>{children}</main></EditorProvider></body></html>;
}
