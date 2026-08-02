/**
 * Moon.tsx
 *
 * Mirrors Sun.tsx but arcs during the night portion of the cycle and
 * uses a cooler flat color plus a small crater dot for character,
 * keeping with the clean-vector illustration style (no textures).
 */
import { useMemo } from "react";
import * as THREE from "three";
import { LAYERS } from "./constants";
import type { DayNightState } from "./types";

interface MoonProps {
  dayNight: DayNightState;
}

export default function Moon({ dayNight }: MoonProps) {
  const visible = dayNight.moonHeight > 0.02;
  const arcX = -22;
  const arcWidth = 44; // matches Sun.tsx and the widened sky/star span
  // Offset phase so the moon arcs opposite the sun.
  const x = arcX + arcWidth * (1 - Math.min(Math.max((dayNight.t + 0.5) * 1.4, 0), 1) % 1);
  const y = 2 + dayNight.moonHeight * 6.5;

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#dfe7ff",
        transparent: true,
        opacity: 0.25,
      }),
    []
  );

  if (!visible) return null;

  return (
    <group position={[x, y, LAYERS.moon]}>
      <mesh material={glowMaterial}>
        <circleGeometry args={[1.3, 32]} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial color="#f4f6ff" />
      </mesh>
      <mesh position={[0.22, 0.15, 0.01]}>
        <circleGeometry args={[0.12, 16]} />
        <meshBasicMaterial color="#d7deee" />
      </mesh>
    </group>
  );
}
