/**
 * Stars.tsx
 *
 * A static (non-scrolling — `PARALLAX_SPEED.stars` is 0) field of
 * points rendered with a single THREE.Points draw call, so however
 * many stars we have costs one draw regardless of count. Opacity is
 * driven by `dayNight.starOpacity`.
 */
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LAYERS, STAR_COUNT } from "./constants";
import type { DayNightState } from "./types";

interface StarsProps {
  dayNight: DayNightState;
}

export default function Stars({ dayNight }: StarsProps) {
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 70; // x — matches the enlarged Sky plane
      positions[i * 3 + 1] = Math.random() * 8 + 1.5; // y, upper sky only
      positions[i * 3 + 2] = 0; // z handled by group position
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.opacity = dayNight.starOpacity;
    }
  });

  return (
    <points geometry={geometry} position={[0, 0, LAYERS.stars]}>
      <pointsMaterial
        ref={materialRef}
        color="#ffffff"
        size={0.06}
        transparent
        opacity={dayNight.starOpacity}
        sizeAttenuation
      />
    </points>
  );
}
