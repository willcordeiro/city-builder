"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { createCity } from "@/utils/city-generator"
import { CityTile } from "./city-tile"
import type { City } from "@/types/city"
import buildingFactory from "@/utils/building-constants"

interface CityGridProps {
  size: number
  selectedToolId?: string
}

export function CityGrid({ size, selectedToolId }: CityGridProps) {
  const city = useRef(createCity(size))

  const [selectedTile, setSelectedTile] = useState<{
    x: number
    y: number
  } | null>(null)
 
  const handleSelectTile = (x: number, y: number) => {
    setSelectedTile({ x, y })
    const currentTool = selectedToolId

    if (currentTool && currentTool === "bulldoze") {
      if (city.current.data[x][y].building) {
        city.current.data[x][y].building = undefined // Remove o edifício
      }
    } else if (currentTool && buildingFactory[currentTool]) {
      const existingBuilding = city.current.data[x][y].building

      if (!existingBuilding || existingBuilding.id !== currentTool) {
        const newBuilding = buildingFactory[currentTool]()

        city.current.data[x][y].building = newBuilding // Adiciona o novo edifício
      }
    }
  }

  const Tiles = () => {
    const tileComponents = []
    for (let x = 0; x < city.current.size; x++) {
      for (let y = 0; y < city.current.size; y++) {
        const tile = city.current.data[x][y]
        const position: [number, number, number] = [x, 0, y] // Posição no grid 3D
        const isSelected = selectedTile !== null && selectedTile.x === x && selectedTile.y === y
       
        
        tileComponents.push(
          <CityTile
            key={`tile-${x}-${y}`}
            tile={tile}
            position={position}
            terrainID={tile.terrainID}
            selectedToolId={selectedToolId}
            selected={isSelected}
            onSelectTile={handleSelectTile}
          />,
        )
      }
    }
    return tileComponents
  }

  return <Tiles/>
}
