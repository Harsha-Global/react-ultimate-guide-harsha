import { ShortlistProvider } from '@/components/ShortlistProvider';
import { ShortlistButton, ShortlistCount } from '@/components/ShortlistControls';
export default function ComparisonsPage() {
 return <><h1>Independent comparison lists</h1><p>Keep workspace choices separate from travel choices, including after a reload.</p>
 <section aria-labelledby="workspace-list"><h2 id="workspace-list">Workspace picks</h2><ShortlistProvider storageKey="component-workshop:compare:workspace"><ShortlistCount/><ShortlistButton id="P-101" name="Studio Desk Lamp"/><ShortlistButton id="P-104" name="Studio Headphones"/></ShortlistProvider></section>
 <section aria-labelledby="travel-list"><h2 id="travel-list">Travel picks</h2><ShortlistProvider storageKey="component-workshop:compare:travel"><ShortlistCount/><ShortlistButton id="P-102" name="Everyday Backpack"/><ShortlistButton id="P-103" name="Terracotta Travel Mug"/></ShortlistProvider></section>
 </>;
}
