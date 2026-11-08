export function safeReturnTo(value: string | null) {
    // eslint-disable-next-line no-control-regex -- reject hidden control characters in return destinations
    if (!value || value.length > 2048 || !value.startsWith("/") || value.startsWith("//") || /[\\\x00-\x1f]/.test(value))
        return "/checkout";
    try {
        const url = new URL(value, location.origin);
        const allowed = ["/checkout", "/orders", "/inventory"].includes(url.pathname)
            || /^\/inventory\/p\d+\/edit$/.test(url.pathname);
        return url.origin === location.origin && allowed ? url.pathname + url.search + url.hash : "/checkout";
    }
    catch {
        return "/checkout";
    }
}
