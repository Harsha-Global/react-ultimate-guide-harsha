import { readCachedCatalog } from '@/lib/catalogCache';
export async function CachedCategory({ category }: { category:string }) {
 const snapshot = await readCachedCatalog(category);
 return <aside className="panel"><h2>{category} selection</h2><p>{snapshot.products.map(product=>product.name).join(', ') || 'No matching products'}</p><p>Category revision: {snapshot.revision}</p></aside>;
}
