// Isolated browser fixture: simulates only this tab's JavaScript media-query signal.
// It does not change the OS setting or emulate CSS media queries.
const originalMatchMedia = window.matchMedia.bind(window);
let reduced = new URLSearchParams(location.search).get("reduce") === "1";
const target = new EventTarget();
const media = {
  media: "(prefers-reduced-motion: reduce)", get matches() { return reduced; }, onchange: null,
  addEventListener: target.addEventListener.bind(target), removeEventListener: target.removeEventListener.bind(target),
  dispatchEvent: target.dispatchEvent.bind(target), addListener: () => {}, removeListener: () => {},
} as MediaQueryList;
window.matchMedia = (query) => query === media.media ? media : originalMatchMedia(query);
const { boot } = await import("./motion-harness");
boot(reduced, (value: boolean) => { reduced = value; target.dispatchEvent(new Event("change")); });
