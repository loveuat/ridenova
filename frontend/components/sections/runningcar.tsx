/**
 * RunningCar.tsx
 *
 * Public entry point. This is the only file consumers of this feature
 * should ever import (see index.ts). It applies sensible defaults,
 * resolves light/dark theming, sizes the container div, and mounts
 * <Scene>. Kept intentionally thin — all real logic lives in
 * Scene/World/the individual layers — so this file is a stable,
 * easy-to-read contract even as internals evolve.
 *
 * Light/dark support: `colorScheme` ("light" | "dark" | "auto",
 * default "auto") controls two independent things:
 *   1. The container chrome (background/border shown for an instant
 *      before the canvas paints) — see CONTAINER_SURFACE.
 *   2. The default `theme` palette, if you don't pass one explicitly —
 *      see DEFAULT_THEME_BY_SCHEME. Pass `theme` yourself to override
 *      this and keep, say, "classic" even on a dark page.
 * This is separate from the in-scene day/night cycle, which always
 * loops regardless of the page's color scheme.
 */
"use client";

import { CONTAINER_SURFACE, DEFAULT_THEME_BY_SCHEME, DEFAULTS } from "./running-car/constants";
import { useColorScheme } from "../../hooks/useColorScheme";
import Scene from "./running-car/scene";
import type { RunningCarProps } from "../../types";

export  function RunningCar({
  height = DEFAULTS.height,
  speed = DEFAULTS.speed,
  theme,
  carType = DEFAULTS.carType,
  showTrees = true,
  showBuildings = true,
  showTemples = true,
  showClouds = true,
  showStreetLights = true,
  showStars = true,
  freezeDayNight = false,
  colorScheme = "auto",
  className,
}: RunningCarProps) {
  const resolvedScheme = useColorScheme(colorScheme);
  const effectiveTheme = theme ?? DEFAULT_THEME_BY_SCHEME[resolvedScheme];
  const surface = CONTAINER_SURFACE[resolvedScheme];

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height,
        // A hard floor, not just a default: some flex/grid parents can
        // momentarily report 0px during layout. Scene's ResponsiveCamera
        // clamps its own zoom too (CAMERA.minZoom/maxZoom), but keeping
        // the container itself from collapsing avoids a degenerate frame.
        minHeight: "180px",
        overflow: "hidden",
        //borderRadius: "0.5rem",
        background: surface.background,
        border: `1px solid ${surface.border}`,
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
    >
      <Scene
        speed={speed}
        theme={effectiveTheme}
        carType={carType}
        showTrees={showTrees}
        showBuildings={showBuildings}
        showTemples={showTemples}
        showClouds={showClouds}
        showStreetLights={showStreetLights}
        showStars={showStars}
        freezeDayNight={freezeDayNight}
      />
    </div>
  );
}
