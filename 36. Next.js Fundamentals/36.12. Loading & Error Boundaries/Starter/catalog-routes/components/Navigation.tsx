"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const links = [['/', 'Home'], ['/catalog', 'Catalog'], ['/story', 'Story']] as const;
export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  return <><nav aria-label="Main navigation">{links.map(([href, label]) =>
    <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>
  )}</nav><button onClick={() => router.push('/catalog')}>Browse the catalog</button></>;
}
