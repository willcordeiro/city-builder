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

  const buildingColors: Record<string, number> = {
    "building-1": 0x777777,
    "building-2": 0x2222aa,
    "building-3": 0xaa2222,
  };
  const buildingSizes: Record<string, [number, number, number]> = {
    "building-1": [1, 1, 1],
    "building-2": [1, 2, 1],
    "building-3": [1, 3, 1],
  };

  return (
    <group>
      <mesh ref={grassMeshRef} position={[position[0], -0.5, position[2]]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial color={0x00aa00} />
      </mesh>

      {tile.building && buildingColors[tile.building] !== undefined && (
        <mesh
          ref={buildingMeshRef}
          position={[position[0], buildingSizes[tile.building][1] / 2, position[2]]}
        >
          <boxGeometry args={buildingSizes[tile.building]} />
          <meshLambertMaterial color={buildingColors[tile.building]} />
        </mesh>
      )}
    </group>
  )
}
