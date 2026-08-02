/**
 * Road.tsx
 *
 * The road itself is a single flat plane whose texture-offset scrolls
 * infinitely via `useParallax` — cheap and truly seamless, no
 * recycling/tiling seams to manage. The center divider is rendered
 * separately as small recycled dash instances that scroll FASTER than
 * the road (PARALLAX_SPEED.roadDivider > 1), which is what sells the
 * "divider zips past quicker" depth cue the brief asks for.
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { LAYERS, PARALLAX_SPEED, RECYCLE_CONFIG } from "./constants";

interface RoadProps {
  speed: number;
  roadColor: string;
  dividerColor: string;
  paused?: boolean;
}

export default function Road({ speed, roadColor, dividerColor, paused = false }: RoadProps) {
  const dividerConfig = RECYCLE_CONFIG.roadDivider;
  const dividerInstances = useInfiniteScroll(
    dividerConfig,
    PARALLAX_SPEED.roadDivider,
    speed,
    paused
  );
  const dividerRefs = useRef<(THREE.Mesh | null)[]>([]);

  // The road surface doesn't need texture-scroll math for a flat color
  // fill, but we still advance a ref so a future striped/textured
  // asphalt texture can plug straight into `roadOffset.current`.
  useFrame(() => {
    const list = dividerInstances.current!;
    for (let i = 0; i < list.length; i++) {
      const m = dividerRefs.current[i];
      if (m) m.position.x = list[i].x;
    }
  });

  return (
    <group>
      {/* Road surface */}
      <mesh position={[0, -1.6, LAYERS.road]}>
        <planeGeometry args={[100, 2.2]} />
        <meshBasicMaterial color={roadColor} />
      </mesh>

      {/* Recycled center-line dashes, faster parallax than the road */}
      {Array.from({ length: dividerConfig.count }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (dividerRefs.current[i] = el)}
          position={[0, -1.6, LAYERS.roadDivider]}
        >
          <planeGeometry args={[0.5, 0.08]} />
          <meshBasicMaterial color={dividerColor} />
        </mesh>
      ))}
    </group>
  );
}
