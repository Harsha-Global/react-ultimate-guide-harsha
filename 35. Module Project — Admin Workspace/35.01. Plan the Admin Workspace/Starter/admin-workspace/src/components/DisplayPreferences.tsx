import { formatInstant, locales, zones } from "../displayFormats";
import type { DisplayLocale, DisplayZone } from "../displayFormats";
const reviewAt = "2027-01-15T00:30:00Z";
const reviewInstant = new Date(reviewAt);
const selectClass = "min-h-11 w-full rounded-lg border border-input bg-card px-3 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function DisplayPreferences({ locale, zone, onLocale, onZone }: {
  locale: DisplayLocale; zone: DisplayZone;
  onLocale: (value: DisplayLocale) => void; onZone: (value: DisplayZone) => void;
}) {
  return <section aria-labelledby="display-heading" className="mt-6 border-t border-border pt-5">
    <h3 id="display-heading" className="font-semibold">Display preferences</h3>
    <label className="mt-4 block text-sm">Number and date locale
      <select className={`${selectClass} mt-2`} value={locale} onChange={(event) => {
        const value = locales.find((item) => item === event.target.value); if (value) onLocale(value);
      }}><option value="en-US">English (US)</option><option value="en-IN">English (India)</option><option value="de-DE">German (Germany)</option></select>
    </label>
    <label className="mt-4 block text-sm">Review time zone
      <select className={`${selectClass} mt-2`} value={zone} onChange={(event) => {
        const value = zones.find((item) => item === event.target.value); if (value) onZone(value);
      }}>{zones.map((item) => <option key={item} value={item}>{item}</option>)}</select>
    </label>
    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Catalog prices remain USD. These preferences format numbers and dates; interface text remains English.</p>
    <div className="mt-5 rounded-xl bg-muted p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Planned catalog review</p>
      <time dateTime={reviewAt} className="mt-2 block text-sm font-semibold leading-relaxed">{formatInstant(reviewInstant, locale, zone)}</time>
      <p className="mt-2 text-xs text-muted-foreground">Same scheduled instant, shown in {zone}.</p>
    </div>
  </section>;
}
