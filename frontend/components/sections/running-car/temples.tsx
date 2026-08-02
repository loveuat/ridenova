/**
 * Temples.tsx
 *
 * Recycled Indian-temple silhouettes: a tiered shikhara (tower) built
 * from several stacked, tapering boxes to approximate the curved
 * profile, flanked by two smaller corner chattris (domed mini-towers),
 * with a stepped plinth, an arched entrance recess, decorative bands
 * at each tier, and a flag-topped kalasha finial. Generic temple
 * architecture (not any specific named monument), intentionally kept
 * flat/low-poly per the illustration style rather than photorealistic.
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { LAYERS, PARALLAX_SPEED, RECYCLE_CONFIG } from "./constants";

interface TemplesProps {
  speed: number;
  color: string;
  accent: string;
  paused?: boolean;
}

export default function Temples({ speed, color, accent, paused = false }: TemplesProps) {
  const config = RECYCLE_CONFIG.temples;
  const instances = useInfiniteScroll(config, PARALLAX_SPEED.temples, speed, paused);
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
        const scale = 0.9 + (i % 2) * 0.22;
        const shade = color;
        return (
          <group
            key={i}
            ref={(el) => (groupRefs.current[i] = el)}
            position={[0, -1.5, LAYERS.temples]}
            scale={scale}
          >
            {/* Stepped plinth (base platform), widest at the bottom */}
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[1.7, 0.2, 0.65]} />
              <meshBasicMaterial color={shade} />
            </mesh>
            <mesh position={[0, 0.28, 0]}>
              <boxGeometry args={[1.5, 0.16, 0.6]} />
              <meshBasicMaterial color={shade} />
            </mesh>

            {/* Main sanctum body */}
            <mesh position={[0, 0.62, 0]}>
              <boxGeometry args={[1.3, 0.5, 0.55]} />
              <meshBasicMaterial color={shade} />
            </mesh>

            {/* Arched entrance recess (dark, gives a sense of a real doorway) */}
            <mesh position={[0, 0.5, 0.28]}>
              <planeGeometry args={[0.32, 0.34]} />
              <meshBasicMaterial color="#2a1a14" />
            </mesh>
            <mesh position={[0, 0.7, 0.281]}>
              <circleGeometry args={[0.16, 12, 0, Math.PI]} />
              <meshBasicMaterial color="#2a1a14" />
            </mesh>

            {/* Decorative band between sanctum and tower */}
            <mesh position={[0, 0.9, 0]}>
              <boxGeometry args={[1.35, 0.06, 0.57]} />
              <meshBasicMaterial color={accent} />
            </mesh>

            {/* Tiered shikhara — 4 tapering tiers approximating the curved tower profile */}
            <mesh position={[0, 1.08, 0]}>
              <boxGeometry args={[1.0, 0.3, 0.5]} />
              <meshBasicMaterial color={shade} />
            </mesh>
            <mesh position={[0, 1.02, 0]}>
              <boxGeometry args={[1.06, 0.04, 0.52]} />
              <meshBasicMaterial color={accent} />
            </mesh>

            <mesh position={[0, 1.36, 0]}>
              <boxGeometry args={[0.78, 0.28, 0.4]} />
              <meshBasicMaterial color={shade} />
            </mesh>
            <mesh position={[0, 1.31, 0]}>
              <boxGeometry args={[0.84, 0.03, 0.42]} />
              <meshBasicMaterial color={accent} />
            </mesh>

            <mesh position={[0, 1.62, 0]}>
              <boxGeometry args={[0.56, 0.24, 0.3]} />
              <meshBasicMaterial color={shade} />
            </mesh>
            <mesh position={[0, 1.58, 0]}>
              <boxGeometry args={[0.62, 0.03, 0.32]} />
              <meshBasicMaterial color={accent} />
            </mesh>

            {/* Amalaka (ribbed disc just below the finial) */}
            <mesh position={[0, 1.78, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.08, 12]} />
              <meshBasicMaterial color={accent} />
            </mesh>

            {/* Kalasha finial + flag */}
            <mesh position={[0, 1.9, 0]}>
              <sphereGeometry args={[0.09, 10, 10]} />
              <meshBasicMaterial color={accent} />
            </mesh>
            <mesh position={[0.03, 2.04, 0]}>
              <boxGeometry args={[0.015, 0.22, 0.015]} />
              <meshBasicMaterial color="#8a7a5a" />
            </mesh>
            <mesh position={[0.1, 2.1, 0]}>
              <planeGeometry args={[0.14, 0.09]} />
              <meshBasicMaterial color="#e0672f" />
            </mesh>

            {/* Corner chattris (small domed mini-towers) flanking the plinth */}
            {[-0.72, 0.72].map((cx, idx) => (
              <group key={idx} position={[cx, 0.5, 0]}>
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.13, 0.15, 0.3, 8]} />
                  <meshBasicMaterial color={shade} />
                </mesh>
                <mesh position={[0, 0.22, 0]}>
                  <coneGeometry args={[0.15, 0.18, 8]} />
                  <meshBasicMaterial color={accent} />
                </mesh>
                <mesh position={[0, 0.33, 0]}>
                  <sphereGeometry args={[0.03, 8, 8]} />
                  <meshBasicMaterial color={accent} />
                </mesh>
              </group>
            ))}
          </group>
        );
      })}
    </>
  );
}
