/**
 * World.tsx
 *
 * Pure composition layer: wires together Sky/Sun/Moon/Stars/Mountains/
 * Clouds/Buildings/Temples/Trees/Road/StreetLights/Car in back-to-front
 * order and forwards the shared `speed` and `dayNight` state to each.
 * Individual layers can be toggled on/off via the `show*` flags coming
 * from the public RunningCar API.
 */
import { THEME_PALETTES } from "./constants";
import type { CarType, DayNightState, RunningCarTheme } from "./types";

import Sky from "./sky";
import Sun from "./sun";
import Moon from "./moon";
import Stars from "./stars";
import Mountains from "./mountains";
import Clouds from "./clouds";
import Buildings from "./buildings";
import Temples from "./temples";
import Trees from "./trees";
import Road from "./road";
import StreetLights from "./streetlights";
import Car from "./car";

interface WorldProps {
  speed: number;
  theme: RunningCarTheme;
  carType: CarType;
  dayNight: DayNightState;
  showTrees: boolean;
  showBuildings: boolean;
  showTemples: boolean;
  showClouds: boolean;
  showStreetLights: boolean;
  showStars: boolean;
  paused?: boolean;
}

export default function World({
  speed,
  theme,
  carType,
  dayNight,
  showTrees,
  showBuildings,
  showTemples,
  showClouds,
  showStreetLights,
  showStars,
  paused = false,
}: WorldProps) {
  const palette = THEME_PALETTES[theme];

  return (
    <>
      <Sky dayNight={dayNight} />
      {showStars && <Stars dayNight={dayNight} />}
      <Sun dayNight={dayNight} />
      <Moon dayNight={dayNight} />

      <Mountains
        speed={speed}
        colorFar={palette.mountainFar}
        colorNear={palette.mountainNear}
        paused={paused}
      />

      {showClouds && <Clouds speed={speed} color={palette.cloud} paused={paused} />}

      {showBuildings && (
        <Buildings
          speed={speed}
          colors={palette.buildingColors}
          artificialLightIntensity={dayNight.artificialLightIntensity}
          paused={paused}
        />
      )}

      {showTemples && (
        <Temples
          speed={speed}
          color={palette.templeColor}
          accent={palette.templeAccent}
          paused={paused}
        />
      )}

      {showTrees && (
        <Trees
          speed={speed}
          foliageColors={palette.treeFoliage}
          trunkColor={palette.treeTrunk}
          paused={paused}
        />
      )}

      {showStreetLights && (
        <StreetLights
          speed={speed}
          artificialLightIntensity={dayNight.artificialLightIntensity}
          paused={paused}
        />
      )}

      <Road
        speed={speed}
        roadColor={palette.road}
        dividerColor={palette.roadDivider}
        paused={paused}
      />

      <Car carType={carType} artificialLightIntensity={dayNight.artificialLightIntensity} />
    </>
  );
}
