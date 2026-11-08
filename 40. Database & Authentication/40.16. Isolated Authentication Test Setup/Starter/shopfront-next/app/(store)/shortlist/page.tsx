import { readStorefront } from '@/lib/storefront';
import { ShortlistResults } from '@/components/ShortlistResults';
export default async function ShortlistPage() {
 const snapshot = await readStorefront();
 return <><p className="eyebrow">Your saved choices</p><h1>Made for your everyday.</h1><p>This shortlist is saved in this browser. It does not reserve stock or place an order.</p><ShortlistResults products={snapshot.products}/></>;
}
