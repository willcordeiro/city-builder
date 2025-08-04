"use client"

import { useRef } from "react"
import type { Mesh } from "three"
import type { Tile } from "@/types/city"

interface CityTileProps {
  tile: Tile
  position: [number, number, number]
}

export function CityTile({ tile, position }: CityTileProps) {
  const grassMeshRef = useRef<Mesh>(null)
  const buildingMeshRef = useRef<Mesh>(null)

  return (
    <group>
     
      <mesh ref={grassMeshRef} position={[position[0], -0.5, position[2]]}>
        <boxGeometry args={[1, 1, 1]} />
      
        <meshLambertMaterial color={0x00aa00} /> 
      </mesh>

    
      {tile.building === "building" && (
        <mesh ref={buildingMeshRef} position={[position[0], 0.5, position[2]]}>
          <boxGeometry args={[1, 1, 1]} />
        
          <meshLambertMaterial color={0x777777} /> 
        </mesh>
      )}
    </group>
  )
}
