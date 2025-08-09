"use client";
import { Suspense } from "react";
import { Environment, Sky } from "@react-three/drei";
import * as THREE from "three";

type LocalEnvironmentProps = {
  path?: string;
  background?: boolean;
  blur?: number;
  isNight?: boolean;
};

export function LocalEnvironment({
  path = "/assets/textures/potsdamer_platz_1k.hdr",
  background = false,
  blur = 0.1,
  isNight = false,
}: LocalEnvironmentProps) {
  const daySettings = {
    skyColor: "#87CEEB",
    sunPosition: [10, 10, 10] as [number, number, number],
    inclination: 0.47,
    azimuth: 0.25,
    mieCoefficient: 0.02,
    rayleigh: 2,
    turbidity: 8,
  };

  const nightSettings = {
    skyColor: "#0a0a2a",
    sunPosition: [-10, -10, -10] as [number, number, number],
    inclination: 0.6,
    azimuth: 0.5,
    mieCoefficient: 0.005,
    rayleigh: 0.5,
    turbidity: 2,
  };

  const currentSettings = isNight ? nightSettings : daySettings;

  return (
    <Suspense fallback={<Sky {...currentSettings} />}>
      <Environment
        files={isNight ? undefined : path}
        background={background}
        blur={blur}
      >
        {isNight && (
          <>
            <color attach="background" args={[nightSettings.skyColor]} />
            <fog attach="fog" args={[nightSettings.skyColor, 10, 30]} />
            <ambientLight intensity={0.1} color="#0a0a2a" />
          </>
        )}
      </Environment>
    </Suspense>
  );
}
