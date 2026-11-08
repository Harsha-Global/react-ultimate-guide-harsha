export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
type MatchMedia = (query: string) => Pick<MediaQueryList, "matches" | "addEventListener" | "removeEventListener">;

export function createMotionPreference(matchMedia?: MatchMedia) {
  const media = matchMedia?.(reducedMotionQuery);
  return {
    getSnapshot: () => media?.matches ?? true,
    getServerSnapshot: () => true,
    subscribe: (notify: () => void) => {
      media?.addEventListener("change", notify);
      return () => media?.removeEventListener("change", notify);
    },
  };
}
