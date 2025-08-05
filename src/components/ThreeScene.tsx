"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei" // Importe Environment
import { Suspense, useState } from "react"
import { CityGrid } from "@/components/city-grid"
import { ToolbarSidebar } from "@/components/ToolbarSidebar"

export default function Home() {
  const [selectedToolId, setSelectedToolId] = useState<string>("residential")
  const gridSize = 16 // Definindo o tamanho do grid aqui para usar na câmera e luz

  function handleToolSelect(id: string) {
    setSelectedToolId(id)
  }

  return (
    <>
      <ToolbarSidebar onSelect={handleToolSelect} selectedId={selectedToolId} />
      <Canvas
        shadows // Habilita sombras no Canvas
        camera={{ position: [gridSize * 1.5, gridSize * 1.5, gridSize * 1.5], fov: 60 }} // Ajusta a posição da câmera
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

          {/* Luz ambiente para iluminação geral */}
          <ambientLight intensity={0.5} />

          {/* Luz direcional para simular o sol e lançar sombras */}
          <directionalLight
            position={[gridSize * 0.8, gridSize * 2, gridSize * 0.8]} // Posição da luz (sol)
            intensity={1.5} // Intensidade da luz
            castShadow // Habilita a luz para lançar sombras
            shadow-mapSize-width={2048} // Qualidade da sombra (largura)
            shadow-mapSize-height={2048} // Qualidade da sombra (altura)
            shadow-camera-near={0.1} // Perto do frustum da sombra
            shadow-camera-far={gridSize * 4} // Longe do frustum da sombra
            shadow-camera-left={-gridSize * 1.2} // Limites do frustum da sombra
            shadow-camera-right={gridSize * 1.2}
            shadow-camera-top={gridSize * 1.2}
            shadow-camera-bottom={-gridSize * 1.2}
          />

          {/* Adiciona um ambiente para iluminação mais realista */}
          <Environment preset="city" />

          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>
    </>
  )
}
