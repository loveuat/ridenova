/**
 * StreetLights.tsx
 *
 * Recycled lamp posts (pole + arm + lamp head). The lamp head's glow
 * material opacity is driven by `artificialLightIntensity` from the
 * day/night hook, so lights visibly switch on around sunset and off
 * around sunrise — no actual three.js Light objects needed (keeps us
 * off the "avoid shadows/heavy lighting" performance constraint).
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { LAYERS, PARALLAX_SPEED, RECYCLE_CONFIG } from "./constants";

interface StreetLightsProps {
  speed: number;
  artificialLightIntensity: number;
  paused?: boolean;
}

export default function StreetLights({
  speed,
  artificialLightIntensity,
  paused = false,
}: StreetLightsProps) {
  const config = RECYCLE_CONFIG.streetLights;
  const instances = useInfiniteScroll(config, PARALLAX_SPEED.streetLights, speed, paused);
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const glowRefs = useRef<(THREE.MeshBasicMaterial | null)[]>([]);

  useFrame(() => {
    const list = instances.current!;
    for (let i = 0; i < list.length; i++) {
      const g = groupRefs.current[i];
      if (g) g.position.x = list[i].x;
      const glow = glowRefs.current[i];
      if (glow) glow.opacity = 0.25 + artificialLightIntensity * 0.75;
    }
  });

  return (
    <>
      {Array.from({ length: config.count }).map((_, i) => (
        <group
          key={i}
          ref={(el) => (groupRefs.current[i] = el)}
          position={[0, -1.5, LAYERS.streetLights]}
        >
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[0.05, 1.2, 0.05]} />
            <meshBasicMaterial color="#3a3a3a" />
          </mesh>
          <mesh position={[0.18, 1.15, 0]}>
            <boxGeometry args={[0.35, 0.04, 0.04]} />
            <meshBasicMaterial color="#3a3a3a" />
          </mesh>
          <mesh position={[0.34, 1.05, 0]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshBasicMaterial color="#5a5a5a" />
          </mesh>
          {/* Glow halo — opacity animates on/off with the day/night cycle */}
          <mesh position={[0.34, 1.05, 0.01]}>
            <circleGeometry args={[0.22, 16]} />
            <meshBasicMaterial
              ref={(el) => (glowRefs.current[i] = el)}
              color="#ffe9a8"
              transparent
              opacity={0.25}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}
