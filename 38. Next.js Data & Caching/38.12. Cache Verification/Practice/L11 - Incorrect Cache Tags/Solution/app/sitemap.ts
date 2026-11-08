import type { MetadataRoute } from 'next';
import { readCachedCatalog } from '@/lib/catalogCache';
import { siteUrl } from '@/lib/site';
export default async function sitemap():Promise<MetadataRoute.Sitemap> {
 const snapshot=await readCachedCatalog();
 return ['/', '/catalog', ...snapshot.products.map(product=>`/products/${product.slug}`)].map(path=>({url:new URL(path,siteUrl).href}));
}
