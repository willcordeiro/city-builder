"use client"

import { useMemo, useState, useEffect } from "react"
import { createCity } from "@/utils/city-generator"
import { CityTile } from "./city-tile"
import type { City } from "@/types/city"

interface CityGridProps {
  size: number
  selectedToolId?: string
}

export function CityGrid({ size, selectedToolId }: CityGridProps) {
  const city: City = useMemo(() => createCity(size), [size]);
  const [tick, setTick] = useState(0);

  const [selectedTile, setSelectedTile] = useState<{x: number, y: number} | null>(null);

  // Remove auto-upgrade logic. Now buildings are placed by user interaction.

  const handleSelectTile = (x: number, y: number) => {
    setSelectedTile({ x, y });
    // Set buildingId on tile when user clicks
    if (selectedToolId && city.data[x][y].buildingId !== selectedToolId) {
      city.data[x][y].buildingId = selectedToolId as City["data"][number][number]["buildingId"];
      setTick(tick => tick + 1); // force re-render
    }
  };

  const tiles = useMemo(() => {
    const tileComponents = [];
    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        const tile = city.data[x][y];
        const position: [number, number, number] = [x, 0, y];
        const isSelected = selectedTile !== null && selectedTile.x === x && selectedTile.y === y;
        tileComponents.push(
          <CityTile
            key={`tile-${x}-${y}`}
            tile={tile}
            position={position}
            terrainID={tile.terrainID}
            selectedToolId={selectedToolId}
            selected={isSelected}
            onSelectTile={handleSelectTile}
          />
        );
      }
    }
    return tileComponents;
  }, [city, city.data, tick, selectedTile]);

  return <group>{tiles}</group>;
}
