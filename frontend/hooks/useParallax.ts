/**
 * hooks/useParallax.ts
 *
 * For layers that are a single continuous mesh (like the road) rather
 * than discrete recycled instances, we don't need the full recycler —
 * we just need an ever-increasing texture/UV offset. This hook returns
 * a ref-backed offset value updated in useFrame, again avoiding any
 * per-frame allocation or React re-render.
 *
 * Usage:
 *   const offset = useParallax(speed, parallaxFactor);
 *   useFrame(() => { mesh.material.map.offset.x = offset.current; });
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function useParallax(speed: number, parallaxFactor: number, paused = false) {
  const offset = useRef(0);

  useFrame((_, delta) => {
    if (paused) return;
    offset.current += speed * parallaxFactor * delta * 0.1;
    if (offset.current > 1000) offset.current %= 1; // avoid float drift over long sessions
  });

  return offset;
}
