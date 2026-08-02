/**
 * Clouds.tsx
 *
 * Recycled cloud puffs built from three overlapping flattened spheres
 * (cheap primitive geometry, no textures) — reads as a simple flat
 * cloud silhouette from the fixed orthographic camera. Moves very
 * slowly relative to the road via PARALLAX_SPEED.clouds.
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { LAYERS, PARALLAX_SPEED, RECYCLE_CONFIG } from "./constants";

interface CloudsProps {
  speed: number;
  color: string;
  paused?: boolean;
}

export default function Clouds({ speed, color, paused = false }: CloudsProps) {
  const config = RECYCLE_CONFIG.clouds;
  const instances = useInfiniteScroll(config, PARALLAX_SPEED.clouds, speed, paused);
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame(() => {
    const list = instances.current!;
    for (let i = 0; i < list.length; i++) {
      const g = groupRefs.current[i];
      if (g) {
        g.position.x = list[i].x;
        g.position.y = 5.5 + (list[i].id % 3) * 0.8;
      }
    }
  });

  return (
    <>
      {Array.from({ length: config.count }).map((_, i) => (
        <group
          key={i}
          ref={(el) => (groupRefs.current[i] = el)}
          position={[0, 5.5, LAYERS.clouds]}
          scale={0.7 + (i % 3) * 0.2}
        >
          <mesh position={[-0.5, 0, 0]}>
            <sphereGeometry args={[0.5, 12, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0.2, 0.15, 0]}>
            <sphereGeometry args={[0.65, 12, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0.9, -0.05, 0]}>
            <sphereGeometry args={[0.45, 12, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.9} />
          </mesh>
        </group>
      ))}
    </>
  );
}
