const APP_ORIGIN = "https://cedar.example";

function safeReturnTo(value: string | null): string {
  if (!value || value.length > 2048 || !value.startsWith("/") || value.startsWith("//") || /[\\\x00-\x1f]/.test(value)) {
    return "/account";
  }
  try {
    const url = new URL(value, APP_ORIGIN);
    if (url.origin !== APP_ORIGIN || url.pathname !== "/account") return "/account";
    return url.pathname + url.search + url.hash;
  } catch {
    return "/account";
  }
}
