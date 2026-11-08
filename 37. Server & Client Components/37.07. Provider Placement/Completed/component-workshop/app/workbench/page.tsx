import { ShortlistProvider } from '@/components/ShortlistProvider';
import { ShortlistButton, ShortlistCount } from '@/components/ShortlistControls';
import { ProductDisclosure } from '@/components/ProductDisclosure';
import { products } from '@/lib/catalog';
import { toProductPreview } from '@/lib/productPreview';
import { Suspense } from 'react';
import { DispatchEstimate } from '@/components/DispatchEstimate';
import { SpotlightStory } from '@/components/SpotlightStory';
export default function WorkbenchPage() {
 return <><p className="eyebrow">Server content and browser interaction</p><h1>Product workbench</h1><ShortlistProvider><ShortlistCount/><ProductDisclosure product={toProductPreview(products[0])}><SpotlightStory/></ProductDisclosure><ShortlistButton id="P-101" name="Studio Desk Lamp"/></ShortlistProvider><Suspense fallback={<p className="panel" role="status">Checking dispatch…</p>}><DispatchEstimate/></Suspense></>;
}
