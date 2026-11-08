import type { MetadataRoute } from 'next';
import { categories } from '@/lib/categories';
import { readStorefront } from '@/lib/storefront';
import { siteUrl } from '@/lib/site';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 const snapshot = await readStorefront();
 const paths = ['/', '/catalog', '/about', '/delivery', ...categories.map(category => `/categories/${category.toLowerCase()}`), ...snapshot.products.map(product => `/products/${product.slug}`)];
 return paths.map(path => ({ url: new URL(path, siteUrl).href }));
}
