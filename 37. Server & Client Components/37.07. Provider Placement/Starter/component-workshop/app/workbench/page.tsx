import { ProductDisclosure } from '@/components/ProductDisclosure';
import { products } from '@/lib/catalog';
import { toProductPreview } from '@/lib/productPreview';
import { Suspense } from 'react';
import { DispatchEstimate } from '@/components/DispatchEstimate';
import { SaveProduct } from '@/components/SaveProduct';
import { SpotlightStory } from '@/components/SpotlightStory';
export default function WorkbenchPage() {
 return <><p className="eyebrow">Server content and browser interaction</p><h1>Product workbench</h1><ProductDisclosure product={toProductPreview(products[0])}><SpotlightStory/></ProductDisclosure><SaveProduct name="Studio Desk Lamp"/><Suspense fallback={<p className="panel" role="status">Checking dispatch…</p>}><DispatchEstimate/></Suspense></>;
}
