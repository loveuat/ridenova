/**
 * Sun.tsx
 *
 * Simple flat vector-style sun disc (a circle + soft glow ring, both
 * plain geometry — no textures). Arcs across the sky using
 * `dayNight.sunHeight` and fades out at night via opacity, matching
 * the Material-illustration aesthetic (see Alto's Adventure sun/moon
 * treatment for reference).
 */
import { useMemo } from "react";
import * as THREE from "three";
import { LAYERS } from "./constants";
import type { DayNightState } from "./types";

interface SunProps {
  dayNight: DayNightState;
}

export default function Sun({ dayNight }: SunProps) {
  const visible = dayNight.sunHeight > -0.05;
  const arcX = -22; // rises stage-left, sets stage-right in world space (sky doesn't scroll)
  const arcWidth = 44; // matches the widened sky/star span so the arc reaches the edges at any aspect ratio
  const x = arcX + arcWidth * (1 - Math.min(Math.max(dayNight.t * 1.4, 0), 1) % 1);
  const y = 2 + dayNight.sunHeight * 6.5;

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffe29a",
        transparent: true,
        opacity: 0.35,
      }),
    []
  );

  if (!visible) return null;

  return (
    <group position={[x, y, LAYERS.sun]}>
      <mesh material={glowMaterial}>
        <circleGeometry args={[1.6, 32]} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.9, 32]} />
        <meshBasicMaterial
          color="#ffd23f"
          transparent
          opacity={Math.min(1, dayNight.lightIntensity + 0.15)}
        />
      </mesh>
    </group>
  );
}
