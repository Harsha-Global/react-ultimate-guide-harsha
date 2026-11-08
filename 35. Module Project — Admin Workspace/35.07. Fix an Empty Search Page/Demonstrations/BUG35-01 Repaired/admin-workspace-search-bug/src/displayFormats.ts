export const locales = ["en-US", "en-IN", "de-DE"] as const;
export type DisplayLocale = typeof locales[number];
export const zones = ["UTC", "Asia/Kolkata", "America/New_York"] as const;
export type DisplayZone = typeof zones[number];
export type Currency = "USD" | "INR" | "JPY";
const minorDigits: Record<Currency, number> = { USD: 2, INR: 2, JPY: 0 };

export function formatMoney(minor: number, currency: Currency, locale: DisplayLocale): string {
  if (!Number.isSafeInteger(minor) || minor < 0) return "—";
  const amount = minor / 10 ** minorDigits[currency];
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}

export function formatInstant(instant: Date, locale: DisplayLocale, timeZone: DisplayZone): string {
  if (!Number.isFinite(instant.getTime())) return "—";
  return new Intl.DateTimeFormat(locale, {
    timeZone, year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZoneName: "short",
  }).format(instant);
}
