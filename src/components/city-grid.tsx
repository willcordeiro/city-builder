"use client"

import { useState} from "react"
import { CityTile } from "./city-tile"
import buildingFactory from "@/utils/building-constants"
import useCity from "@/hooks/useCity"

interface CityGridProps {
  selectedToolId?: string
}

export function CityGrid({ selectedToolId }: CityGridProps) {

  const {city} = useCity()

  const [selectedTile, setSelectedTile] = useState<{
    x: number
    y: number
  } | null>(null)
 
  const handleSelectTile = (x: number, y: number) => {
    setSelectedTile({ x, y })
    const currentTool = selectedToolId

    if (currentTool && currentTool === "bulldoze") {
      if (city.data[x][y].building) {
        city.data[x][y].building = undefined // Remove o edifício
      }
    } else if (currentTool && buildingFactory[currentTool]) {
      const existingBuilding = city.data[x][y].building

      if (!existingBuilding || existingBuilding.id !== currentTool) {
        const newBuilding = buildingFactory[currentTool]()

        city.data[x][y].building = newBuilding // Adiciona o novo edifício
      }
    }
  }

  const Tiles = () => {
    const tileComponents = []
    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        const tile = city.data[x][y]
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
