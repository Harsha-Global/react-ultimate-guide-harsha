function formatMinorPrice(minor: unknown, currency: unknown, locale: unknown): string {
  if (currency !== "USD" && currency !== "INR" && currency !== "JPY") return "Unavailable";
  const displayLocale = locale === "en-IN" || locale === "de-DE" || locale === "ja-JP" ? locale : "en-US";
  if (typeof minor !== "number" || !Number.isSafeInteger(minor) || minor < 0) return "Unavailable";
  const digits = currency === "JPY" ? 0 : 2;
  return new Intl.NumberFormat(displayLocale, { style: "currency", currency }).format(minor / 10 ** digits);
}
