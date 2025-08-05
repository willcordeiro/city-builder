"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense, useState } from "react"
import { CityGrid } from "@/components/city-grid"
import { ToolbarSidebar } from "@/components/ToolbarSidebar"

export default function Home() {
  const [selectedToolId, setSelectedToolId] = useState<string | undefined>("residential")
  const gridSize = 32

/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Handles a tool selection in the toolbar sidebar. If the selected id is not undefined, it is set as the new selected tool id.
   * @param {string | undefined} id The new tool id to select, or undefined to deselect any tool.
   */
/*******  855a3c3d-2f92-41fb-a67e-d6c0c4891061  *******/
  function handleToolSelect(id: string | undefined) {
    setSelectedToolId(id)
  }

  return (
    <>
      <ToolbarSidebar onSelect={handleToolSelect} selectedId={selectedToolId} />
      <Canvas
        shadows
        camera={{ position: [gridSize * 1.5, gridSize * 1.5, gridSize * 1.5], fov: 60 }}
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
          <CityGrid size={gridSize} selectedToolId={selectedToolId} />

          {/* Plano invisível que recebe sombra */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[gridSize / 2 - 0.5, -0.5, gridSize / 2 - 0.5]} // centraliza sob o grid
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

          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>
    </>
  )
}
