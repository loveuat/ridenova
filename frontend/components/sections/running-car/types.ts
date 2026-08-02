/**
 * types.ts
 *
 * Central type definitions shared across every RunningCar sub-component.
 * Keeping these in one file means Scene.tsx, World.tsx and every recycled
 * layer (Trees, Buildings, Temples...) agree on the same shapes, and any
 * future backend payload (FastAPI) only needs to satisfy these interfaces.
 */

/** Visual theme presets. Extend this union as new art styles are added. */
export type RunningCarTheme = "classic" | "desert" | "hills" | "night-city";

/** Selectable car silhouettes. Swap in real SVG/PNG assets per type.
 *  "mpv" is a generic 3-row MPV/crossover silhouette (roof rails, lower
 *  body cladding, split headlamps) — styled after that body-style class
 *  in general, not a reproduction of any specific manufacturer's design,
 *  since real trademarked car designs/logos aren't something to render. */
export type CarType = "sedan" | "auto-rickshaw" | "truck" | "bike" | "mpv";

/** 0 = midnight, 0.25 = sunrise, 0.5 = noon, 0.75 = sunset, 1 = midnight again. */
export type DayNightPhase = "night" | "sunrise" | "day" | "sunset";

export interface DayNightState {
  /** Continuous cycle progress in the range [0, 1). */
  t: number;
  /** Discrete label derived from `t`, handy for conditional rendering. */
  phase: DayNightPhase;
  /** 0 (fully dark) -> 1 (fully bright) ambient/sun strength. */
  lightIntensity: number;
  /** Sky gradient stops, top -> horizon. */
  skyTop: string;
  skyBottom: string;
  /** Opacity for star field, inverse of daylight. */
  starOpacity: number;
  /** Street light + headlight emissive strength, on at dusk/night. */
  artificialLightIntensity: number;
  /** Sun/Moon vertical arc position in [-1, 1], -1 below horizon. */
  sunHeight: number;
  moonHeight: number;
}

/** Generic recyclable item used by trees/buildings/temples/streetlights. */
export interface RecycledInstance {
  id: number;
  /** World-space X position; wraps back to the right edge once off-screen. */
  x: number;
  /** Per-instance variation so recycled rows don't look identical. */
  variant: number;
  scale: number;
  z: number;
}

/** Config driving the infinite-scroll recycler hook. */
export interface InfiniteScrollConfig {
  count: number;
  spacing: number;
  /** World X at which an instance recycles back to the far right. */
  resetX: number;
  /** World X an instance starts beyond, on the right. */
  spawnX: number;
  z?: number;
  jitter?: number;
}

/** UI-shell color scheme (the page around the canvas, not the in-scene
 *  day/night cycle, which is independent and always animating). "auto"
 *  follows the OS/browser `prefers-color-scheme`. */
export type ColorScheme = "light" | "dark" | "auto";

/** Public prop contract for the top-level <RunningCar /> component. */
export interface RunningCarProps {
  /** CSS height of the canvas container. Width is always 100%. */
  height?: string | number;
  /** Base world scroll speed, world-units/second. */
  speed?: number;
  /** If omitted, resolves automatically from `colorScheme` (light -> a
   *  daytime-friendly palette, dark -> the night-city palette). */
  theme?: RunningCarTheme;
  carType?: CarType;
  showTrees?: boolean;
  showBuildings?: boolean;
  showTemples?: boolean;
  showClouds?: boolean;
  showStreetLights?: boolean;
  showStars?: boolean;
  /** Pause the automatic day/night cycle (useful for storybook/testing). */
  freezeDayNight?: boolean;
  /** Controls the container chrome (background/border while nothing has
   *  painted yet) and, if `theme` isn't set, the default palette. */
  colorScheme?: ColorScheme;
  className?: string;
}

/** Future backend (FastAPI) asset payload shape — kept ready for real data. */
export interface RunningCarAssetPack {
  trees?: string[];
  temples?: string[];
  buildings?: string[];
  roadThemes?: string[];
  cars?: Record<CarType, string>;
  weather?: string;
}
