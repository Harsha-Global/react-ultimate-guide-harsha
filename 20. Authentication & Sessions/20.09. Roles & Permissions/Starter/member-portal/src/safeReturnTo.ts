export function safeReturnTo(value: string | null) {
  if (
    !value ||
    value.length > 2048 ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\x00-\x1f]/.test(value)
  )
    return "/account";
  try {
    const url = new URL(value, location.origin);
    if (url.origin !== location.origin || !["/account"].includes(url.pathname))
      return "/account";
    return url.pathname + url.search + url.hash;
  } catch {
    return "/account";
  }
}
