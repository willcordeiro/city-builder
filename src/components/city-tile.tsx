"use client"

import { useRef, useState } from "react"
import type { Mesh } from "three"
import type { Tile } from "@/types/city"
import { buildingColors, buildingSizes } from "../utils/building-constants"

interface CityTileProps {
  tile: Tile
  position: [number, number, number]
  terrainID: string
  selected: boolean
  onSelectTile: (x: number, y: number) => void
}

export function CityTile({ tile, position, terrainID, selected, onSelectTile }: CityTileProps) {
  const grassMeshRef = useRef<Mesh>(null)
  const buildingMeshRef = useRef<Mesh>(null)


  function handlePointerDown(event: any) {
    event.stopPropagation();
    onSelectTile(tile.x, tile.y);
    // Log x, y, building, and terrainID in a clear format
    console.log(
      `Clicked tile: x=${tile.x}, y=${tile.y}, building=${tile.building ?? "none"}, terrainID=${terrainID}`
    );
  }

 
  function lightenColor(hex: number): number {

    return hex + 0x222222 > 0xffffff ? 0xffffff : hex + 0x222222;
  }

  return (
    <group>
      <mesh
        ref={grassMeshRef}
        position={[position[0], -0.5, position[2]]}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial color={selected ? lightenColor(0x00aa00) : 0x00aa00} />
      </mesh>

      {tile.building && buildingColors[tile.building] !== undefined && (
        <mesh
          ref={buildingMeshRef}
          position={[position[0], buildingSizes[tile.building][1] / 2, position[2]]}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={buildingSizes[tile.building]} />
          <meshLambertMaterial color={selected ? lightenColor(buildingColors[tile.building]) : buildingColors[tile.building]} />
        </mesh>
      )}
    </group>
  )
}
