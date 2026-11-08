function formatMinorPrice(minor: unknown, currency: unknown, locale: unknown): string {
  if (currency !== "USD" && currency !== "INR" && currency !== "JPY") return "Unavailable";
  const displayLocale = locale === "en-IN" || locale === "de-DE" || locale === "ja-JP" ? locale : "en-US";
  // BUG: zero disappears, invalid numbers pass, and every currency uses hundredths.
  if (typeof minor !== "number" || !minor) return "Unavailable";
  return new Intl.NumberFormat(displayLocale, { style: "currency", currency }).format(minor / 100);
}
