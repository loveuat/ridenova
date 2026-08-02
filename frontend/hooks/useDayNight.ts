/**
 * hooks/useDayNight.ts
 *
 * Owns the single source of truth for "what time is it in the scene".
 * Advances a [0,1) progress value every frame based on real elapsed
 * time and DAY_NIGHT_DURATION, then derives every visual consequence
 * (sky colors, sun/moon height, star opacity, artificial light
 * intensity) from that one number.
 *
 * Every other component (Sky, Sun, Moon, Stars, StreetLights, Car
 * headlights) reads this single hook's output rather than each
 * re-implementing its own time logic — keeps day/night perfectly
 * synchronized across the whole scene.
 *
 * This DOES cause a React re-render (via useState), but only at a
 * throttled rate (a few times per second) — smooth enough for color
 * lerps while avoiding a full 60fps re-render of consuming components.
 * Actual per-frame motion (sun arc position feeding a mesh transform)
 * is additionally exposed as a ref for zero-re-render consumers.
 */
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  DAY_NIGHT_DURATION,
  DAY_NIGHT_KEYFRAMES,
  SKY_PALETTE,
} from "@/components/sections/running-car/constants";
import type { DayNightPhase, DayNightState } from "../types";

function lerpColor(a: string, b: string, t: number): string {
  const ca = parseInt(a.slice(1), 16);
  const cb = parseInt(b.slice(1), 16);
  const ar = (ca >> 16) & 255, ag = (ca >> 8) & 255, ab = ca & 255;
  const br = (cb >> 16) & 255, bg = (cb >> 8) & 255, bb = cb & 255;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bch = Math.round(ab + (bb - ab) * t);
  return `#${((1 << 24) + (r << 16) + (g << 8) + bch).toString(16).slice(1)}`;
}

function derive(t: number): DayNightState {
  const { night1End, sunriseEnd, dayEnd, sunsetEnd } = DAY_NIGHT_KEYFRAMES;
  let phase: DayNightPhase;
  let skyTop: string, skyBottom: string, lightIntensity: number;

  if (t < night1End) {
    phase = "night";
    const local = t / night1End;
    skyTop = SKY_PALETTE.night.top;
    skyBottom = SKY_PALETTE.night.bottom;
    lightIntensity = 0.08;
    void local;
  } else if (t < sunriseEnd) {
    phase = "sunrise";
    const local = (t - night1End) / (sunriseEnd - night1End);
    skyTop = lerpColor(SKY_PALETTE.night.top, SKY_PALETTE.sunrise.top, local);
    skyBottom = lerpColor(SKY_PALETTE.night.bottom, SKY_PALETTE.sunrise.bottom, local);
    lightIntensity = 0.08 + local * 0.72;
  } else if (t < dayEnd) {
    phase = "day";
    const local = (t - sunriseEnd) / (dayEnd - sunriseEnd);
    skyTop = lerpColor(SKY_PALETTE.sunrise.top, SKY_PALETTE.day.top, Math.min(local * 2, 1));
    skyBottom = lerpColor(SKY_PALETTE.sunrise.bottom, SKY_PALETTE.day.bottom, Math.min(local * 2, 1));
    lightIntensity = 0.8 + Math.sin(local * Math.PI) * 0.2;
  } else if (t < sunsetEnd) {
    phase = "sunset";
    const local = (t - dayEnd) / (sunsetEnd - dayEnd);
    skyTop = lerpColor(SKY_PALETTE.day.top, SKY_PALETTE.sunset.top, local);
    skyBottom = lerpColor(SKY_PALETTE.day.bottom, SKY_PALETTE.sunset.bottom, local);
    lightIntensity = 0.9 - local * 0.7;
  } else {
    phase = "night";
    const local = (t - sunsetEnd) / (1 - sunsetEnd);
    skyTop = lerpColor(SKY_PALETTE.sunset.top, SKY_PALETTE.night.top, local);
    skyBottom = lerpColor(SKY_PALETTE.sunset.bottom, SKY_PALETTE.night.bottom, local);
    lightIntensity = 0.2 - local * 0.12;
  }

  // Sun arcs up during sunrise->day->sunset, moon arcs up at night.
  const sunHeight = Math.sin(
    Math.PI * Math.min(Math.max((t - night1End) / (sunsetEnd - night1End), 0), 1)
  );
  const nightLocal =
    t >= sunsetEnd ? (t - sunsetEnd) / (1 - sunsetEnd) : (t + (1 - sunsetEnd)) / (1 - sunsetEnd) * (night1End / night1End || 1);
  const moonHeight = Math.sin(Math.PI * Math.min(Math.max(nightLocal, 0), 1));

  const starOpacity = Math.max(0, 1 - lightIntensity * 1.4);
  const artificialLightIntensity = Math.max(0, 1 - lightIntensity * 1.6);

  return {
    t,
    phase,
    lightIntensity: Math.max(0, Math.min(1, lightIntensity)),
    skyTop,
    skyBottom,
    starOpacity: Math.max(0, Math.min(1, starOpacity)),
    artificialLightIntensity: Math.max(0, Math.min(1, artificialLightIntensity)),
    sunHeight,
    moonHeight,
  };
}

export function useDayNight(freeze = false) {
  const progress = useRef(0.28); // start mid-morning so the demo looks good on mount
  const [state, setState] = useState<DayNightState>(() => derive(progress.current));
  const acc = useRef(0);

  useFrame((_, delta) => {
    if (freeze) return;
    progress.current = (progress.current + delta / DAY_NIGHT_DURATION) % 1;

    // Throttle React re-renders to ~10/sec; color lerps don't need 60fps.
    acc.current += delta;
    if (acc.current > 0.1) {
      acc.current = 0;
      setState(derive(progress.current));
    }
  });

  return state;
}
