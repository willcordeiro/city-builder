"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense,  useRef, useState } from "react";
import { CityGrid } from "@/components/city-grid";
import { ToolbarSidebar } from "@/components/ToolbarSidebar";
import * as THREE from "three";
import CameraControls, { CameraControlsHandle } from "./CameraControls";
import { LocalEnvironment } from "./local-environment";


export default function ThreeScene({ size }: { size: number }) {
  const cameraControlsRef = useRef<CameraControlsHandle>(null); 

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
      <ToolbarSidebar
        onResetCamera={resetCamera}
      />
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

          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[gridSize / 2 - 0.5, -0.5, gridSize / 2 - 0.5]}
            receiveShadow
          >
            <planeGeometry args={[gridSize * 3, gridSize * 3]} />
            <shadowMaterial opacity={0.4} />
          </mesh>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[gridSize * 0.8, gridSize * 2, gridSize * 0.8]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.1}
            shadow-camera-far={gridSize * 4}
            shadow-camera-left={-gridSize * 1.2}
            shadow-camera-right={gridSize * 1.2}
            shadow-camera-top={gridSize * 1.2}
            shadow-camera-bottom={-gridSize * 1.2}
          />
          <LocalEnvironment />
          <CameraControls
            ref={cameraControlsRef}
            center={gridCenter}
          />
        </Suspense>
      </Canvas>
    </>
  );
}
