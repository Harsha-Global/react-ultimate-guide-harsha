import { markCatalogStale, refreshWorkshopPath } from '@/app/actions/catalogRefresh';
export function FreshnessControls() {
 return <section className="panel"><h2>Freshness comparison</h2><p>These local demo controls do not change inventory.</p><form action={markCatalogStale}><button>Mark public catalog stale</button></form><form action={refreshWorkshopPath}><button>Refresh workshop path</button></form></section>;
}
