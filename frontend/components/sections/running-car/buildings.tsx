/**
 * Buildings.tsx
 *
 * Recycled skyline layer with three alternating building "kinds" for
 * variety, common on Indian city streets: a plain flat-roof apartment
 * block with a rooftop water tank, a shopfront-style low building with
 * a colored awning at street level, and a taller block with balconies.
 * Window emissive-look opacity increases at night via
 * `artificialLightIntensity` — a cheap stand-in for lit windows
 * without any actual lights or bloom.
 *
 * Ready for backend swap: `colors` is the only thing this component
 * needs from outside; a future FastAPI payload could hand this an
 * array of building sprite URLs instead and this component would
 * render <sprite> here rather than boxes, with the recycler logic
 * unchanged.
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { LAYERS, PARALLAX_SPEED, RECYCLE_CONFIG } from "./constants";

interface BuildingsProps {
  speed: number;
  colors: string[];
  artificialLightIntensity: number;
  paused?: boolean;
}

export default function Buildings({
  speed,
  colors,
  artificialLightIntensity,
  paused = false,
}: BuildingsProps) {
  const config = RECYCLE_CONFIG.buildings;
  const instances = useInfiniteScroll(config, PARALLAX_SPEED.buildings, speed, paused);
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const windowMatRefs = useRef<(THREE.MeshBasicMaterial | null)[][]>([]);

  useFrame(() => {
    const list = instances.current!;
    for (let i = 0; i < list.length; i++) {
      const g = groupRefs.current[i];
      if (g) g.position.x = list[i].x;
      const mats = windowMatRefs.current[i];
      if (mats) {
        for (let m = 0; m < mats.length; m++) {
          const mat = mats[m];
          if (mat) mat.opacity = 0.15 + artificialLightIntensity * 0.75;
        }
      }
    }
  });

  return (
    <>
      {Array.from({ length: config.count }).map((_, i) => {
        const kind = i % 3; // 0: apartment+tank, 1: shopfront, 2: balcony block
        const h = kind === 1 ? 1.0 + (i % 2) * 0.3 : 1.8 + (i % 4) * 0.5;
        const w = 0.95 + (i % 3) * 0.22;
        const color = colors[i % colors.length];
        const awning = colors[(i + 1) % colors.length];
        if (!windowMatRefs.current[i]) windowMatRefs.current[i] = [];

        const rows = Math.max(2, Math.floor(h / 0.55));

        return (
          <group
            key={i}
            ref={(el) => (groupRefs.current[i] = el)}
            position={[0, -1.5 + h / 2, LAYERS.buildings]}
          >
            {/* Main block */}
            <mesh>
              <boxGeometry args={[w, h, 0.4]} />
              <meshBasicMaterial color={color} />
            </mesh>

            {/* Window grid, density scaled to building height */}
            {Array.from({ length: rows }).map((__, row) =>
              Array.from({ length: 2 }).map((___, col) => (
                <mesh
                  key={`${row}-${col}`}
                  position={[-w / 4 + col * (w / 2), h / 2 - 0.35 - row * 0.5, 0.21]}
                >
                  <planeGeometry args={[0.15, 0.2]} />
                  <meshBasicMaterial
                    ref={(el) => {
                      windowMatRefs.current[i][row * 2 + col] = el;
                    }}
                    color="#fff2b2"
                    transparent
                    opacity={0.2}
                  />
                </mesh>
              ))
            )}

            {/* Kind 0: rooftop water tank + small cable clutter, a very
                common silhouette detail on Indian apartment rooftops */}
            {kind === 0 && (
              <group position={[w * 0.25, h / 2 + 0.12, 0]}>
                <mesh>
                  <cylinderGeometry args={[0.09, 0.09, 0.18, 10]} />
                  <meshBasicMaterial color="#7a8a94" />
                </mesh>
                <mesh position={[0, 0.11, 0]}>
                  <coneGeometry args={[0.1, 0.06, 10]} />
                  <meshBasicMaterial color="#5c6a72" />
                </mesh>
              </group>
            )}
            {kind === 0 && (
              <mesh position={[-w * 0.2, h / 2 + 0.03, 0]}>
                <boxGeometry args={[0.06, 0.06, 0.06]} />
                <meshBasicMaterial color="#3a3a3a" />
              </mesh>
            )}

            {/* Kind 1: street-level shopfront awning + signboard strip */}
            {kind === 1 && (
              <>
                <mesh position={[0, -h / 2 + 0.22, 0.22]}>
                  <boxGeometry args={[w * 0.95, 0.1, 0.06]} />
                  <meshBasicMaterial color={awning} />
                </mesh>
                <mesh position={[0, -h / 2 + 0.08, 0.24]}>
                  <planeGeometry args={[w * 0.8, 0.16]} />
                  <meshBasicMaterial color="#fdfaf1" />
                </mesh>
              </>
            )}

            {/* Kind 2: small projecting balcony ledges on alternating rows */}
            {kind === 2 &&
              Array.from({ length: Math.floor(rows / 2) }).map((__, row) => (
                <mesh key={row} position={[0, h / 2 - 0.6 - row * 1.0, 0.26]}>
                  <boxGeometry args={[w * 0.85, 0.04, 0.12]} />
                  <meshBasicMaterial color={color} />
                </mesh>
              ))}
          </group>
        );
      })}
    </>
  );
}
