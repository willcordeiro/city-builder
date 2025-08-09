"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { CityGrid } from "@/components/city-grid";
import { ToolbarSidebar } from "@/components/ToolbarSidebar";
import * as THREE from "three";
import CameraControls, { CameraControlsHandle } from "./CameraControls";
import { LocalEnvironment } from "./local-environment";
import { DayNightCycle } from "./DayNightCycle";

export default function ThreeScene({ size }: { size: number }) {
  const cameraControlsRef = useRef<CameraControlsHandle>(null); 
  const [isNight, setIsNight] = useState(false);

  const gridSize = size;
  const gridCenter = new THREE.Vector3(
    gridSize / 2 - 0.5,
    0,
    gridSize / 2 - 0.5
  );

  const defaultFreeCameraPosition = new THREE.Vector3(
    gridCenter.x + gridSize * 1.2,
    gridCenter.y + gridSize * 1.5,
    gridCenter.z + gridSize * 1.2
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
          background: isNight 
            ? "linear-gradient(#0a0a2a, #000000)" 
            : "linear-gradient(#6B96C9, #3D5D8D)",
        }}
      >
        <Suspense fallback={null}>
          <CityGrid  />
          <DayNightCycle 
             speed={0.105}  // 1 minute for cicle
            
          />

          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[gridSize / 2 - 0.5, -0.5, gridSize / 2 - 0.5]}
            receiveShadow
          >
            <planeGeometry args={[gridSize * 3, gridSize * 3]} />
            <shadowMaterial opacity={isNight ? 0.2 : 0.4} />
          </mesh>

          <LocalEnvironment isNight={isNight} />
          <CameraControls ref={cameraControlsRef} center={gridCenter} />
        </Suspense>
      </Canvas>
    </>
  );
}