"use client"

import { useRef } from "react"
import type { Mesh } from "three"
import type { Tile } from "@/types/city"

interface CityTileProps {
  tile: Tile
  position: [number, number, number]
}

export function CityTile({ tile, position }: CityTileProps) {
  const meshRef = useRef<Mesh>(null)

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color={0x00aa00} />
    </mesh>
  )
}
