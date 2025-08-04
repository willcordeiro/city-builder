"use client"

import { useMemo } from "react"
import { createCity } from "@/utils/city-generator"
import { CityTile } from "./city-tile"
import type { City } from "@/types/city"

interface CityGridProps {
  size: number
}

export function CityGrid({ size }: CityGridProps) {
  const city: City = useMemo(() => createCity(size), [size])

  const tiles = useMemo(() => {
    const tileComponents = []

    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        const tile = city.data[x][y]
        const position: [number, number, number] = [x, 0, y]

        tileComponents.push(<CityTile key={`tile-${x}-${y}`} tile={tile} position={position} />)
      }
    }

    return tileComponents
  }, [city])

  return <group>{tiles}</group>
}
