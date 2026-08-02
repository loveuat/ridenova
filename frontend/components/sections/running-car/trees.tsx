/**
 * Trees.tsx
 *
 * Recycled roadside trees — a trunk box plus a rounded foliage sphere,
 * cycling through `foliageColors` for variety. This is the layer most
 * likely to be swapped for real SVG/PNG sprites first (per the
 * "Assets" requirement); the recycler + positions stay identical, only
 * the mesh/material inside the map would change to a <sprite>.
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { LAYERS, PARALLAX_SPEED, RECYCLE_CONFIG } from "./constants";

interface TreesProps {
  speed: number;
  foliageColors: string[];
  trunkColor: string;
  paused?: boolean;
}

export default function Trees({ speed, foliageColors, trunkColor, paused = false }: TreesProps) {
  const config = RECYCLE_CONFIG.trees;
  const instances = useInfiniteScroll(config, PARALLAX_SPEED.trees, speed, paused);
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
        const foliage = foliageColors[i % foliageColors.length];
        const scale = 0.8 + (i % 3) * 0.15;
        // Alternate near/far row for a touch of extra depth without a new layer.
        const row = i % 2 === 0 ? 0 : 1;
        return (
          <group
            key={i}
            ref={(el) => (groupRefs.current[i] = el)}
            position={[0, row === 0 ? -1.1 : -0.9, LAYERS.trees - row * 0.3]}
            scale={scale}
          >
            <mesh position={[0, 0.25, 0]}>
              <boxGeometry args={[0.12, 0.5, 0.12]} />
              <meshBasicMaterial color={trunkColor} />
            </mesh>
            <mesh position={[0, 0.75, 0]}>
              <sphereGeometry args={[0.35, 10, 10]} />
              <meshBasicMaterial color={foliage} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}
