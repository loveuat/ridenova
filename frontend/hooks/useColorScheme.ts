/**
 * hooks/useColorScheme.ts
 *
 * Resolves the UI-shell color scheme (container background/border, and
 * the default in-scene palette) from either an explicit prop or the
 * browser's `prefers-color-scheme`. This is deliberately separate from
 * the in-scene day/night cycle (`useDayNight`) — that one always loops
 * regardless of the page's light/dark mode; this one is about the
 * component fitting into whatever theme the host app is using.
 *
 * Safe for SSR: defaults to "light" on the server / before mount, then
 * corrects itself in an effect once `window` exists, avoiding a
 * hydration-mismatch warning.
 */
import { useEffect, useState } from "react";
import type { ColorScheme } from "../types";

export function useColorScheme(preference: ColorScheme = "auto"): "light" | "dark" {
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (preference !== "auto") {
      setResolved(preference);
      return;
    }
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    setResolved(mql.matches ? "dark" : "light");

    const handler = (e: MediaQueryListEvent) => setResolved(e.matches ? "dark" : "light");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [preference]);

  return resolved;
}
