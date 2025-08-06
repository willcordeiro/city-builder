"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { CityGrid } from "@/components/city-grid";
import { ToolbarSidebar } from "@/components/ToolbarSidebar";
import * as THREE from "three";
import CameraControls, { CameraControlsHandle } from "./CameraControls";
import Loader from "./loader";

export default function ThreeScene({ size }: { size: number }) {
  const [selectedToolId, setSelectedToolId] = useState<string | undefined>("residential");
  const [isIsometric, setIsIsometric] = useState(false);
  const cameraControlsRef = useRef<CameraControlsHandle>(null); // ✨

  const gridSize = size;
  const gridCenter = new THREE.Vector3(gridSize / 2 - 0.5, 0, gridSize / 2 - 0.5);

  const defaultFreeCameraPosition = new THREE.Vector3(
    gridCenter.x + gridSize * 1.2,
    gridCenter.y + gridSize * 1.5,
    gridCenter.z + gridSize * 1.2
  );

  function handleToolSelect(id: string | undefined) {
    setSelectedToolId(id);
  }

  const toggleIsometricView = () => {
    setIsIsometric((prev) => !prev);
  };

  const resetCamera = () => {
    cameraControlsRef.current?.resetCamera(); // ✨ chama a função do filho
  };

  return (
    <>
      <ToolbarSidebar
        onSelect={handleToolSelect}
        selectedId={selectedToolId}
        onToggleIsometric={toggleIsometricView}
        isIsometricActive={isIsometric}
        onResetCamera={resetCamera} // ✨ passa pro botão
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
          <CityGrid selectedToolId={selectedToolId} />
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
          <Environment preset="city" />
          <CameraControls ref={cameraControlsRef} center={gridCenter} isometricView={isIsometric} />
        </Suspense>
      </Canvas>
    </>
  );
}
