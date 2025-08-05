"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import { CityGrid } from "@/components/city-grid";
import { ToolbarSidebar } from "@/components/ToolbarSidebar";


export default function Home() {
  const [selectedToolId, setSelectedToolId] = useState<string>("residential");

  function handleToolSelect(id: string) {
    setSelectedToolId(id);
  }

  return (
    <>
      <ToolbarSidebar onSelect={handleToolSelect} selectedId={selectedToolId} />
      <Canvas
        camera={{ position: [25, 10, 25], fov: 60 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "#777777",
        }}
      >
        <Suspense fallback={null}>
          <CityGrid size={16} selectedToolId={selectedToolId} />
          <ambientLight color={0xffffff} intensity={0.2} />
          <directionalLight color={0xffffff} intensity={0.3} position={[0, 1, 0]} />
          <directionalLight color={0xffffff} intensity={0.3} position={[1, 1, 0]} />
          <directionalLight color={0xffffff} intensity={0.3} position={[0, 1, 1]} />
          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>
    </>
  );
}
