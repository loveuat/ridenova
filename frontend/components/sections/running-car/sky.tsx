/**
 * Sky.tsx
 *
 * Full-screen vertical gradient plane sitting at the back of the scene.
 * Colors come straight from the `useDayNight` hook so the sky is always
 * perfectly in sync with the sun/moon/stars/street-lights. Implemented
 * as a cheap ShaderMaterial (two colors + a lerp) rather than a texture,
 * so there's zero asset loading and it costs almost nothing per frame.
 */
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LAYERS } from "./constants";
import type { DayNightState } from "./types";

interface SkyProps {
  dayNight: DayNightState;
}

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 topColor;
  uniform vec3 bottomColor;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(mix(bottomColor, topColor, vUv.y), 1.0);
  }
`;

export default function Sky({ dayNight }: SkyProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      topColor: { value: new THREE.Color(dayNight.skyTop) },
      bottomColor: { value: new THREE.Color(dayNight.skyBottom) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Update uniform colors whenever dayNight state changes (throttled
  // upstream in useDayNight, so this is cheap).
  useFrame(() => {
    const mat = materialRef.current;
    if (!mat) return;
    (mat.uniforms.topColor.value as THREE.Color).set(dayNight.skyTop);
    (mat.uniforms.bottomColor.value as THREE.Color).set(dayNight.skyBottom);
  });

  return (
    <mesh position={[0, 0, LAYERS.sky]} renderOrder={-100}>
      {/* Oversized relative to the largest realistic viewport (see
          CAMERA.worldViewHeight + RECYCLE_CONFIG comments) so the
          gradient always fills the frame, including ultra-wide monitors. */}
      <planeGeometry args={[120, 60]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        depthWrite={false}
      />
    </mesh>
  );
}
