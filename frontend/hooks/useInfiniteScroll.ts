/**
 * hooks/useInfiniteScroll.ts
 *
 * Generic "conveyor belt" recycler. Given a count of instances and a
 * spacing, it lays them out along X and, every frame, shifts each one
 * left by `speed * parallaxFactor * delta`. Once an instance scrolls
 * past `resetX` it's teleported back out to `spawnX` (with a small
 * random jitter so recycled rows don't look perfectly periodic).
 *
 * This is the one mechanism reused by Trees, Buildings, Temples,
 * StreetLights and the road divider — it exists once here instead of
 * being duplicated per component, per the "no duplicated logic" rule.
 *
 * IMPORTANT: this hook never allocates new objects inside the frame
 * loop. It mutates a persistent ref array in place and returns that
 * same ref, so callers can drive <group position-x={...}> updates
 * imperatively without triggering React re-renders.
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { InfiniteScrollConfig, RecycledInstance } from "../types";

export function useInfiniteScroll(
  config: InfiniteScrollConfig,
  parallaxFactor: number,
  speed: number,
  paused = false
) {
  const { count, spacing, resetX, spawnX, z = 0, jitter = 0.3 } = config;

  // Lazily-initialized, mutated-in-place instance array. Using a ref
  // (not state) means updates never re-render React — only the
  // underlying three.js objects move, driven imperatively in useFrame.
  const instances = useRef<RecycledInstance[]>();
  if (!instances.current) {
    const arr: RecycledInstance[] = [];
    const startX = spawnX; // rightmost instance starts here
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        x: startX - i * spacing,
        variant: i % 5,
        scale: 0.85 + ((i * 37) % 30) / 100, // deterministic pseudo-variety
        z,
      });
    }
    instances.current = arr;
  }

  useFrame((_, delta) => {
    if (paused) return;
    const list = instances.current!;
    const dx = speed * parallaxFactor * delta;
    for (let i = 0; i < list.length; i++) {
      const inst = list[i];
      inst.x -= dx;
      if (inst.x < resetX) {
        // Recycle: send it back beyond the spawn edge, staggered so
        // it doesn't line up with whichever instance is currently there.
        inst.x = spawnX + ((inst.id * 13) % (spacing * jitter * 10)) / 10;
      }
    }
  });

  return instances;
}
