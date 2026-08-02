/**
 * index.ts
 *
 * Barrel export. Import the component from here:
 *   import { RunningCar } from "@/components/running-car";
 *
 * Types are re-exported too so consumers can type props/theme/carType
 * without reaching into internal files.
 */
export { default as RunningCar } from "./RunningCar";
export type {
  RunningCarProps,
  RunningCarTheme,
  CarType,
  RunningCarAssetPack,
} from "./types";
