"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { CityGrid } from "@/components/CityGrid";
import { ToolbarSidebar } from "@/components/ToolbarSidebar";
import * as THREE from "three";
import CameraControls, { CameraControlsHandle } from "./CameraControls";
import { LocalEnvironment } from "./LocalEnvironment";
import { DayNightCycle } from "./DayNightCycle";
import { Clouds } from "./Clouds";
//import { RainController } from "./rainController";

export default function ThreeScene({ size }: { size: number }) {
  const cameraControlsRef = useRef<CameraControlsHandle>(null);

  const gridSize = size;
  const gridCenter = new THREE.Vector3(
    gridSize / 2 - 0.5,
    0,
    gridSize / 2 - 0.5
  );

  const defaultFreeCameraPosition = new THREE.Vector3(
    gridCenter.x + gridSize * 1,
    gridCenter.y + gridSize * 0.5,
    gridCenter.z + gridSize * 1
  );

  const resetCamera = () => {
    cameraControlsRef.current?.resetCamera();
  };

  return (
    <>
      <ToolbarSidebar onResetCamera={resetCamera} />
      <Canvas
        shadows
        camera={{
          position: defaultFreeCameraPosition.toArray(),
          fov: 60,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(#6B96C9, #3D5D8D)",
        }}
      >
        <Suspense fallback={null}>
          <CityGrid />
          <Clouds isNight={false} />
          {/* <RainController/> */}
          <DayNightCycle speed={0.03} />

          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[gridSize / 2 - 0.5, -0.5, gridSize / 2 - 0.5]}
            receiveShadow
          >
            <planeGeometry args={[gridSize * 3, gridSize * 3]} />
            <shadowMaterial opacity={0.4} />
          </mesh>

          <LocalEnvironment isNight={false} />
          <CameraControls ref={cameraControlsRef} center={gridCenter} />
        </Suspense>
      </Canvas>
    </>
  );
}

//todo increase city cize with infinite map but limited
//todo toolbar like cities skylines with models
//todo add more models for building
