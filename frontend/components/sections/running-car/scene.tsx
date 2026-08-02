/**
 * Scene.tsx
 *
 * Owns the <Canvas> boundary, camera and the one ambient light in the
 * whole scene (per performance rules: no shadows, no per-object
 * lights — everything else fakes lighting via material color/opacity
 * driven by `useDayNight`). Also owns the `useDayNight` call itself,
 * since it must live inside the Canvas (it uses `useFrame`), and
 * passes the resulting state down into World.
 */
import { Suspense, useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CAMERA } from "./constants";
import { useDayNight } from "../../../hooks/useDayNight";
import World from "./world";
import type { CarType, RunningCarTheme } from "./types";

/**
 * ResponsiveCamera
 *
 * Fiber's <Canvas> already tracks its container with a ResizeObserver
 * and updates `useThree().size` reactively — on any resize (window
 * resize, a flex sibling changing width, a sidebar collapsing, a
 * device rotation, whatever), not just on window `resize` events. We
 * hook into that to recompute the orthographic zoom so the number of
 * WORLD UNITS visible vertically (`CAMERA.worldViewHeight`) stays
 * constant regardless of the container's pixel size. That keeps the
 * road/car/trees the same visual scale on a phone and a 4K monitor —
 * only how much width is visible changes with aspect ratio, and the
 * recycled layers are sized generously enough (see RECYCLE_CONFIG) to
 * cover that without gaps.
 *
 * Runs in useLayoutEffect (not useFrame) so the correct zoom is applied
 * before the first paint — no visible flash of the fallback zoom.
 */
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    if (!(camera instanceof THREE.OrthographicCamera)) return;
    if (size.height <= 0) return;

    const nextZoom = THREE.MathUtils.clamp(
      size.height / CAMERA.worldViewHeight,
      CAMERA.minZoom,
      CAMERA.maxZoom
    );

    if (camera.zoom !== nextZoom) {
      camera.zoom = nextZoom;
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width, size.height]);

  return null;
}

interface SceneProps {
  speed: number;
  theme: RunningCarTheme;
  carType: CarType;
  showTrees: boolean;
  showBuildings: boolean;
  showTemples: boolean;
  showClouds: boolean;
  showStreetLights: boolean;
  showStars: boolean;
  freezeDayNight?: boolean;
}

function SceneContents(props: Omit<SceneProps, "freezeDayNight"> & { freezeDayNight: boolean }) {
  // Lives inside <Canvas> because useDayNight relies on useFrame.
  const dayNight = useDayNight(props.freezeDayNight);

  return (
    <>
      {/* Single ambient light for very subtle overall tinting only —
          no shadows, no point/spot lights, per performance constraints. */}
      <ambientLight intensity={Math.max(0.5, dayNight.lightIntensity)} />
      <World
        speed={props.speed}
        theme={props.theme}
        carType={props.carType}
        dayNight={dayNight}
        showTrees={props.showTrees}
        showBuildings={props.showBuildings}
        showTemples={props.showTemples}
        showClouds={props.showClouds}
        showStreetLights={props.showStreetLights}
        showStars={props.showStars}
      />
    </>
  );
}

export default function Scene({ freezeDayNight = false, ...rest }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]} // cap device-pixel-ratio to protect FPS on hi-dpi screens
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      orthographic
      camera={{
        zoom: CAMERA.initialZoom,
        position: CAMERA.position,
        near: CAMERA.near,
        far: CAMERA.far,
      }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color("#000000");
      }}
    >
      <ResponsiveCamera />
      <Suspense fallback={null}>
        <SceneContents {...rest} freezeDayNight={freezeDayNight} />
      </Suspense>
    </Canvas>
  );
}
