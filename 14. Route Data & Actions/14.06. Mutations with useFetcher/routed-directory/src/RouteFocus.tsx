import { useEffect } from "react";
import { useLocation } from "react-router";
export default function RouteFocus() {
  const { pathname } = useLocation();
  useEffect(() => {
    document
      .querySelector<HTMLElement>("main h1")
      ?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}
