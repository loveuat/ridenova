/**
 * constants.ts
 *
 * Single source of truth for every magic number and color in the scene.
 * Tuning the world (speeds, counts, palettes) should only ever require
 * editing this file — components read from here, never hardcode values.
 */

import type { RunningCarTheme, CarType } from "./types";

/**
 * Orthographic camera framing. Ortho avoids perspective distortion,
 * which keeps the flat-illustration look consistent (Alto's Adventure style).
 *
 * Responsiveness model: rather than a fixed `zoom`, we keep the number
 * of WORLD UNITS visible vertically constant (`WORLD_VIEW_HEIGHT`) at
 * any container size, and let the camera's `zoom` be derived at runtime
 * as `containerHeightPx / WORLD_VIEW_HEIGHT` (see ResponsiveCamera in
 * Scene.tsx). That keeps the road, car and trees the same visual scale
 * on a phone and a 4K monitor alike — only how much WIDTH is visible
 * changes with aspect ratio, which recycled layers already tolerate
 * (they just keep generating instances across whatever width shows).
 */
export const CAMERA = {
  /** Fallback zoom used only for the very first frame, before the
   *  ResponsiveCamera effect measures the real container and corrects it.
   *  Prevents a flash of an unzoomed scene on mount. */
  initialZoom: 60,
  /** World units visible vertically, held constant across all screen sizes. */
  worldViewHeight: 8,
  /** Safety clamp so pathologically small/large containers don't produce
   *  an unusable zoom (e.g. a 2px-tall iframe during layout thrash). */
  minZoom: 24,
  maxZoom: 160,
  position: [0, 2, 10] as [number, number, number],
  near: 0.1,
  far: 100,
};

/** Base Z-depth layering, back to front. Kept generous so instancing /
 *  recycling never causes z-fighting between layers. */
export const LAYERS = {
  stars: -18,
  moon: -17,
  sun: -17,
  sky: -16,
  mountainsFar: -12,
  mountainsNear: -9,
  buildings: -6,
  temples: -5,
  clouds: -8,
  streetLights: -1.5,
  trees: -2,
  road: 0,
  roadDivider: 0.05,
  car: 1,
};

/** World scroll speed multipliers relative to the base `speed` prop.
 *  Values < 1 move slower than the road (distant parallax),
 *  values > 1 move faster (foreground parallax, e.g. the divider). */
export const PARALLAX_SPEED = {
  stars: 0,
  mountainsFar: 0.08,
  mountainsNear: 0.18,
  clouds: 0.25,
  buildings: 0.5,
  temples: 0.5,
  trees: 1,
  streetLights: 1,
  road: 1,
  roadDivider: 1.6,
};

/** Day/night cycle timing. One full loop = DAY_NIGHT_DURATION seconds. */
export const DAY_NIGHT_DURATION = 90; // seconds for a full day/night loop

/** Named cycle boundaries in [0,1) progress space. */
export const DAY_NIGHT_KEYFRAMES = {
  night1End: 0.08,
  sunriseEnd: 0.25,
  dayEnd: 0.55,
  sunsetEnd: 0.75,
  // night2 runs from sunsetEnd -> 1.0 (wraps to night1)
};

/**
 * Recycler counts & spacing per layer. Because the camera now keeps a
 * constant WORLD_VIEW_HEIGHT rather than a constant width (see CAMERA
 * above), the visible WIDTH in world units grows with the container's
 * aspect ratio — a 21:9 monitor shows noticeably more world width than
 * a tall phone. Counts/spawn ranges below are sized generously (total
 * span comfortably covers a ~44-unit-wide viewport, i.e. an ultra-wide
 * monitor at typical heights) so recycled instances never visibly run
 * out and leave a gap. If you deliberately zoom the world in further
 * (raise `CAMERA.worldViewHeight`), increase these counts to match.
 */
export const RECYCLE_CONFIG = {
  trees: { count: 12, spacing: 4.5, spawnX: 16, resetX: -16 },
  buildings: { count: 9, spacing: 6.5, spawnX: 20, resetX: -20 },
  temples: { count: 6, spacing: 9, spawnX: 22, resetX: -22 },
  streetLights: { count: 9, spacing: 5.5, spawnX: 18, resetX: -18 },
  clouds: { count: 7, spacing: 7, spawnX: 22, resetX: -22 },
  mountainsFar: { count: 6, spacing: 10, spawnX: 26, resetX: -26 },
  mountainsNear: { count: 6, spacing: 8, spawnX: 22, resetX: -22 },
  roadDivider: { count: 20, spacing: 1.6, spawnX: 16, resetX: -16 },
};

/** Theme palettes — flat, saturated, Material-illustration inspired. */
export const THEME_PALETTES: Record<
  RunningCarTheme,
  {
    road: string;
    roadDivider: string;
    groundAccent: string;
    treeFoliage: string[];
    treeTrunk: string;
    buildingColors: string[];
    templeColor: string;
    templeAccent: string;
    mountainFar: string;
    mountainNear: string;
    cloud: string;
  }
> = {
  classic: {
    road: "#4a4a58",
    roadDivider: "#f4d35e",
    groundAccent: "#7fb069",
    treeFoliage: ["#3fa34d", "#57b660", "#2f8f45"],
    treeTrunk: "#7a5230",
    buildingColors: ["#e8998d", "#c1666b", "#f4a259", "#5b8e7d"],
    templeColor: "#e07a5f",
    templeAccent: "#f2cc8f",
    mountainFar: "#a9c9d6",
    mountainNear: "#7ba7b8",
    cloud: "#ffffff",
  },
  desert: {
    road: "#5c5346",
    roadDivider: "#ffd166",
    groundAccent: "#d9a566",
    treeFoliage: ["#8a9b5e", "#7d8f4f"],
    treeTrunk: "#6e4a2e",
    buildingColors: ["#e0a458", "#c98474", "#d1b26f"],
    templeColor: "#c1666b",
    templeAccent: "#ffd166",
    mountainFar: "#e0c097",
    mountainNear: "#c9986a",
    cloud: "#fff6e8",
  },
  hills: {
    road: "#454a54",
    roadDivider: "#f2f2f2",
    groundAccent: "#588157",
    treeFoliage: ["#2d6a4f", "#40916c", "#52b788"],
    treeTrunk: "#5e4632",
    buildingColors: ["#a3b18a", "#dda15e", "#bc6c25"],
    templeColor: "#bc6c25",
    templeAccent: "#dda15e",
    mountainFar: "#94b0b2",
    mountainNear: "#6a8e91",
    cloud: "#ffffff",
  },
  "night-city": {
    road: "#2b2d42",
    roadDivider: "#f9c74f",
    groundAccent: "#3a3f5c",
    treeFoliage: ["#264653", "#2a6f77"],
    treeTrunk: "#4a3f35",
    buildingColors: ["#4361ee", "#7209b7", "#f72585", "#3a0ca3"],
    templeColor: "#7209b7",
    templeAccent: "#f9c74f",
    mountainFar: "#1b1f3b",
    mountainNear: "#141830",
    cloud: "#8d99ae",
  },
};

/** Sky gradient stops per phase (top color, horizon color). */
export const SKY_PALETTE = {
  night: { top: "#0b1030", bottom: "#1c2452" },
  sunrise: { top: "#3a5a8c", bottom: "#f4a261" },
  day: { top: "#4da3d9", bottom: "#bfe9f0" },
  sunset: { top: "#3d3466", bottom: "#f26d5b" },
};

/** Car silhouette base colors keyed by CarType. */
export const CAR_COLORS: Record<CarType, string> = {
  sedan: "#e63946",
  "auto-rickshaw": "#ffb703",
  truck: "#2a9d8f",
  bike: "#264653",
  mpv: "#8a6d3b", // a warm bronze/gold, common on real-world MPVs in this class
};

/** Secondary trim colors for the mpv silhouette — dual-tone roof and
 *  the dark lower-body cladding characteristic of crossover-styled MPVs. */
export const MPV_TRIM = {
  roof: "#f2f1ec",
  cladding: "#2c2a26",
  skidPlate: "#c9cdd1",
  glass: "#3a4048",
};

export const STAR_COUNT = 110;

export const DEFAULTS = {
  // Fluid by default: scales with viewport width, clamped so it's never
  // too cramped on mobile or absurdly tall on a huge desktop window.
  // Consumers can always override with a fixed px/%/vh value via the
  // `height` prop — this is just a sensible out-of-the-box default.
  height: "clamp(240px, 42vw, 520px)",
  speed: 4,
  carType: "mpv" as CarType,
};

/** When `theme` isn't explicitly passed, pick a sensible default based
 *  on the resolved light/dark color scheme, so the scene's mood matches
 *  the host page without any extra configuration. */
export const DEFAULT_THEME_BY_SCHEME: Record<"light" | "dark", RunningCarTheme> = {
  light: "classic",
  dark: "night-city",
};

/** Container chrome (the div wrapping the <canvas>, visible only for a
 *  moment before the first frame paints, or as a border/background
 *  around the canvas). Kept minimal and separate from in-scene colors. */
export const CONTAINER_SURFACE: Record<"light" | "dark", { background: string; border: string }> = {
  light: { background: "#f4f4f2", border: "rgba(0,0,0,0.08)" },
  dark: { background: "#111113", border: "rgba(255,255,255,0.08)" },
};
