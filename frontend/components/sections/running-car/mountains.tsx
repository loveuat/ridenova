/**
 * Mountains.tsx
 *
 * Two independent recycled layers — far (slower, smaller, lighter) and
 * near (slightly faster, larger, darker) — built from simple
 * ConeGeometry silhouettes to match the flat vector-illustration look.
 * Both layers reuse the same `useInfiniteScroll` recycler at different
 * `parallaxFactor`s, which is what produces the depth illusion.
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { LAYERS, PARALLAX_SPEED, RECYCLE_CONFIG } from "./constants";

interface MountainsProps {
  speed: number;
  colorFar: string;
  colorNear: string;
  paused?: boolean;
}

function MountainLayer({
  speed,
  paused,
  parallaxFactor,
  config,
  z,
  color,
  heightRange,
}: {
  speed: number;
  paused: boolean;
  parallaxFactor: number;
  config: typeof RECYCLE_CONFIG.mountainsFar;
  z: number;
  color: string;
  heightRange: [number, number];
}) {
  const instances = useInfiniteScroll(config, parallaxFactor, speed, paused);
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame(() => {
    const list = instances.current!;
    for (let i = 0; i < list.length; i++) {
      const g = groupRefs.current[i];
      if (g) g.position.x = list[i].x;
    }
  });

  return (
    <>
      {Array.from({ length: config.count }).map((_, i) => {
        const h = heightRange[0] + (i % 3) * ((heightRange[1] - heightRange[0]) / 3);
        return (
          <group
            key={i}
            ref={(el) => (groupRefs.current[i] = el)}
            position={[0, -1.5, z]}
          >
            <mesh position={[0, h / 2, 0]}>
              <coneGeometry args={[h * 1.1, h, 4]} />
              <meshBasicMaterial color={color} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

export default function Mountains({ speed, colorFar, colorNear, paused = false }: MountainsProps) {
  return (
    <>
      <MountainLayer
        speed={speed}
        paused={paused}
        parallaxFactor={PARALLAX_SPEED.mountainsFar}
        config={RECYCLE_CONFIG.mountainsFar}
        z={LAYERS.mountainsFar}
        color={colorFar}
        heightRange={[2.5, 4]}
      />
      <MountainLayer
        speed={speed}
        paused={paused}
        parallaxFactor={PARALLAX_SPEED.mountainsNear}
        config={RECYCLE_CONFIG.mountainsNear}
        z={LAYERS.mountainsNear}
        color={colorNear}
        heightRange={[1.8, 3]}
      />
    </>
  );
}
