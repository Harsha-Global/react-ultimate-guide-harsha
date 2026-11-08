import { useSyncExternalStore } from "react";
import { createMotionPreference } from "./motionPreference";
const preference = createMotionPreference(typeof window === "undefined" || typeof window.matchMedia !== "function" ? undefined : window.matchMedia.bind(window));

export function useMotionPreference() {
  return useSyncExternalStore(preference.subscribe, preference.getSnapshot, preference.getServerSnapshot);
}
