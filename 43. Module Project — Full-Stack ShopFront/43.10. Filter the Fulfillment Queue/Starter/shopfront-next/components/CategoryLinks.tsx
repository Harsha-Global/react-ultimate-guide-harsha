import Link from 'next/link';
import { categories, type Category } from '@/lib/categories';
export function CategoryLinks({ current }: { current?: Category }) {
 return <nav className="category-links" aria-label="Product categories"><Link href="/catalog" aria-current={!current ? 'page' : undefined}>All products</Link>{categories.map(category => <Link key={category} href={`/categories/${category.toLowerCase()}`} aria-current={current === category ? 'page' : undefined}>{category}</Link>)}</nav>;
}
