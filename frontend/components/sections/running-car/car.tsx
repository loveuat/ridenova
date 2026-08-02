/**
 * Car.tsx
 *
 * The car stays fixed near the bottom-center of the viewport — it's
 * the world that scrolls, not the car — matching the Chrome Dino /
 * Alto's Adventure "runner" convention. Built from flat boxes/planes
 * per car type; swap this for a real sprite/SVG using `carType` once
 * backend assets exist.
 *
 * `mpv` is the flagship silhouette here: a generic 3-row MPV/crossover
 * shape — stepped hood, tall glasshouse, roof rails, dark lower-body
 * cladding, split running lamps, dual-tone roof. It's styled after
 * that whole body-style class (common on many compact family MPVs on
 * Indian roads) rather than any one manufacturer's specific design —
 * real car body designs and badges are proprietary, so this is an
 * original silhouette built from primitives, not a reproduction of a
 * particular model.
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LAYERS, CAR_COLORS, MPV_TRIM } from "./constants";
import type { CarType } from "./types";

interface CarProps {
  carType: CarType;
  bodyColor?: string;
  artificialLightIntensity: number;
}

export default function Car({ carType, bodyColor, artificialLightIntensity }: CarProps) {
  const wheelFrontRef = useRef<THREE.Mesh>(null);
  const wheelBackRef = useRef<THREE.Mesh>(null);
  const bodyGroupRef = useRef<THREE.Group>(null);
  const headlightRefs = useRef<(THREE.MeshBasicMaterial | null)[]>([]);

  const color = bodyColor ?? CAR_COLORS[carType];

  useFrame((state, delta) => {
    const spin = delta * 6;
    if (wheelFrontRef.current) wheelFrontRef.current.rotation.z -= spin;
    if (wheelBackRef.current) wheelBackRef.current.rotation.z -= spin;
    if (bodyGroupRef.current) {
      bodyGroupRef.current.position.y = 0.02 * Math.sin(state.clock.elapsedTime * 10);
    }
    headlightRefs.current.forEach((mat) => {
      if (mat) mat.opacity = 0.15 + artificialLightIntensity * 0.85;
    });
  });

  if (carType === "mpv") {
    return (
      <group position={[-1.2, -1.32, LAYERS.car]}>
        <group ref={bodyGroupRef}>
          {/* Dark lower-body cladding, the full length + slightly wider than the body */}
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[1.62, 0.16, 0.56]} />
            <meshBasicMaterial color={MPV_TRIM.cladding} />
          </mesh>

          {/* Front skid plate accent, low and centered on the nose */}
          <mesh position={[0.72, 0.05, 0]}>
            <boxGeometry args={[0.16, 0.1, 0.5]} />
            <meshBasicMaterial color={MPV_TRIM.skidPlate} />
          </mesh>

          {/* Main body shell */}
          <mesh position={[0, 0.32, 0]}>
            <boxGeometry args={[1.5, 0.34, 0.52]} />
            <meshBasicMaterial color={color} />
          </mesh>

          {/* Stepped hood (shorter, sits forward, sloped feel via lower height) */}
          <mesh position={[0.58, 0.36, 0]}>
            <boxGeometry args={[0.42, 0.24, 0.5]} />
            <meshBasicMaterial color={color} />
          </mesh>

          {/* Glasshouse / cabin, tall and set slightly rearward for a cab-forward MPV stance */}
          <mesh position={[-0.08, 0.62, 0]}>
            <boxGeometry args={[1.0, 0.32, 0.48]} />
            <meshBasicMaterial color={MPV_TRIM.glass} />
          </mesh>

          {/* Rear quarter, a touch shorter than the main cabin roofline */}
          <mesh position={[-0.62, 0.56, 0]}>
            <boxGeometry args={[0.2, 0.2, 0.5]} />
            <meshBasicMaterial color={color} />
          </mesh>

          {/* Dual-tone roof cap */}
          <mesh position={[-0.08, 0.79, 0]}>
            <boxGeometry args={[1.02, 0.05, 0.46]} />
            <meshBasicMaterial color={MPV_TRIM.roof} />
          </mesh>

          {/* Roof rails */}
          <mesh position={[-0.08, 0.83, 0.16]}>
            <boxGeometry args={[0.86, 0.03, 0.03]} />
            <meshBasicMaterial color={MPV_TRIM.cladding} />
          </mesh>
          <mesh position={[-0.08, 0.83, -0.16]}>
            <boxGeometry args={[0.86, 0.03, 0.03]} />
            <meshBasicMaterial color={MPV_TRIM.cladding} />
          </mesh>

          {/* Window strip line (glass reflection accent) */}
          <mesh position={[-0.08, 0.66, 0.25]}>
            <planeGeometry args={[0.94, 0.05]} />
            <meshBasicMaterial color="#aebbc7" transparent opacity={0.55} />
          </mesh>

          {/* Front grille (dark) + thin chrome-look slat */}
          <mesh position={[0.79, 0.32, 0]}>
            <boxGeometry args={[0.04, 0.2, 0.42]} />
            <meshBasicMaterial color={MPV_TRIM.cladding} />
          </mesh>
          <mesh position={[0.79, 0.38, 0]}>
            <boxGeometry args={[0.02, 0.03, 0.4]} />
            <meshBasicMaterial color={MPV_TRIM.skidPlate} />
          </mesh>

          {/* Split running lamps: slim upper DRL strip + lower main lamp */}
          <mesh position={[0.79, 0.44, 0.16]}>
            <planeGeometry args={[0.03, 0.1]} />
            <meshBasicMaterial
              ref={(el) => (headlightRefs.current[0] = el)}
              color="#fff6d8"
              transparent
              opacity={0.9}
            />
          </mesh>
          <mesh position={[0.79, 0.44, -0.16]}>
            <planeGeometry args={[0.03, 0.1]} />
            <meshBasicMaterial
              ref={(el) => (headlightRefs.current[1] = el)}
              color="#fff6d8"
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Taillights */}
          <mesh position={[-0.71, 0.4, 0.16]}>
            <planeGeometry args={[0.03, 0.08]} />
            <meshBasicMaterial color="#e6473f" />
          </mesh>
          <mesh position={[-0.71, 0.4, -0.16]}>
            <planeGeometry args={[0.03, 0.08]} />
            <meshBasicMaterial color="#e6473f" />
          </mesh>

          {/* Door seam lines for a less monolithic body */}
          <mesh position={[0.18, 0.32, 0.261]}>
            <planeGeometry args={[0.015, 0.32]} />
            <meshBasicMaterial color={MPV_TRIM.cladding} transparent opacity={0.4} />
          </mesh>
          <mesh position={[-0.4, 0.32, 0.261]}>
            <planeGeometry args={[0.015, 0.32]} />
            <meshBasicMaterial color={MPV_TRIM.cladding} transparent opacity={0.4} />
          </mesh>

          {/* Wheels: two-tone alloy look — dark tire + lighter rim + hub dot */}
          {[
            { ref: wheelBackRef, x: -0.52 },
            { ref: wheelFrontRef, x: 0.52 },
          ].map(({ ref, x }, i) => (
            <group key={i} position={[x, -0.06, 0.27]}>
              <mesh ref={ref}>
                <circleGeometry args={[0.19, 20]} />
                <meshBasicMaterial color="#232323" />
              </mesh>
              <mesh position={[0, 0, 0.001]}>
                <circleGeometry args={[0.11, 16]} />
                <meshBasicMaterial color="#9a9d9f" />
              </mesh>
              <mesh position={[0, 0, 0.002]}>
                <circleGeometry args={[0.035, 10]} />
                <meshBasicMaterial color="#4a4a4a" />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    );
  }

  // --- Other car types keep their original, simpler treatment ---
  const isBike = carType === "bike";
  const isTruck = carType === "truck";
  const isAuto = carType === "auto-rickshaw";
  const bodyWidth = isTruck ? 1.6 : isBike ? 0.5 : 1.2;
  const bodyHeight = isBike ? 0.35 : 0.42;
  const cabinHeight = isTruck ? 0.55 : 0.32;

  return (
    <group position={[-1.2, -1.35, LAYERS.car]}>
      <group ref={bodyGroupRef}>
        <mesh position={[0, bodyHeight / 2, 0]}>
          <boxGeometry args={[bodyWidth, bodyHeight, 0.5]} />
          <meshBasicMaterial color={color} />
        </mesh>

        {!isBike && (
          <mesh position={[isAuto ? 0 : -bodyWidth * 0.1, bodyHeight + cabinHeight / 2, 0]}>
            <boxGeometry args={[bodyWidth * 0.55, cabinHeight, 0.46]} />
            <meshBasicMaterial color={isAuto ? "#ffe27a" : "#cfe8f2"} />
          </mesh>
        )}

        <mesh position={[bodyWidth / 2 + 0.02, bodyHeight * 0.4, 0]}>
          <circleGeometry args={[0.09, 12]} />
          <meshBasicMaterial
            ref={(el) => (headlightRefs.current[0] = el)}
            color="#fff6c9"
            transparent
            opacity={0.2}
          />
        </mesh>

        <mesh ref={wheelBackRef} position={[-bodyWidth / 2 + 0.2, -0.06, 0.26]}>
          <circleGeometry args={[0.16, 16]} />
          <meshBasicMaterial color="#2b2b2b" />
        </mesh>
        <mesh ref={wheelFrontRef} position={[bodyWidth / 2 - 0.2, -0.06, 0.26]}>
          <circleGeometry args={[0.16, 16]} />
          <meshBasicMaterial color="#2b2b2b" />
        </mesh>
      </group>
    </group>
  );
}
