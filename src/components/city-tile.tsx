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
  selectedToolId?: string
}

export function CityTile({ tile, position, terrainID, selected, onSelectTile, selectedToolId }: CityTileProps) {
  const grassMeshRef = useRef<Mesh>(null)
  const buildingMeshRef = useRef<Mesh>(null)


  function handlePointerDown(event: any) {
    event.stopPropagation();
    onSelectTile(tile.x, tile.y);
    // Log x, y, building, and terrainID in a clear format
    console.log(
      `Clicked tile: x=${tile.x}, y=${tile.y}, building=${tile.buildingId ?? "none"}, terrainID=${terrainID}`
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

      {tile.buildingId === "residential" && (
        <mesh
          position={[position[0], 0.5, position[2]]}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={[0.8, 1, 0.8]} />
          <meshLambertMaterial color={0x27ae60} />
        </mesh>
      )}
      {tile.buildingId === "commercial" && (
        <mesh
          position={[position[0], 0.7, position[2]]}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={[1, 1.4, 1]} />
          <meshLambertMaterial color={0x2980b9} />
        </mesh>
      )}
      {tile.buildingId === "industrial" && (
        <mesh
          position={[position[0], 0.6, position[2]]}
          onPointerDown={handlePointerDown}
        >
          <cylinderGeometry args={[0.5, 0.5, 1.2, 16]} />
          <meshLambertMaterial color={0xf39c12} />
        </mesh>
      )}
      {tile.buildingId === "road" && (
        <mesh
          position={[position[0], 0.05, position[2]]}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={[1, 0.1, 1]} />
          <meshLambertMaterial color={0x7f8c8d} />
        </mesh>
      )}
      {/* Bulldoze: don't render any building mesh */}
    </group>
  )
}
