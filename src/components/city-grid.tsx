"use client"

import { useMemo, useState, useEffect } from "react"
import { createCity } from "@/utils/city-generator"
import { CityTile } from "./city-tile"
import type { City } from "@/types/city"

interface CityGridProps {
  size: number
}

export function CityGrid({ size }: CityGridProps) {
  const city: City = useMemo(() => createCity(size), [size]);
  const [tick, setTick] = useState(0);
  const [selectedTile, setSelectedTile] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    function isFull() {
      for (let x = 0; x < city.size; x++) {
        for (let y = 0; y < city.size; y++) {
          if (city.data[x][y].building !== "building-3") {
            return false;
          }
        }
      }
      return true;
    }
    interval = setInterval(() => {
      if (!isFull()) {
        // Find all tiles that can still grow
        const candidates = [];
        for (let x = 0; x < city.size; x++) {
          for (let y = 0; y < city.size; y++) {
            if (city.data[x][y].building !== "building-3") {
              candidates.push(city.data[x][y]);
            }
          }
        }
        // Pick one random candidate and update it
        if (candidates.length > 0) {
          const idx = Math.floor(Math.random() * candidates.length);
          candidates[idx].update();
        }
        setTick(tick => tick + 1); // force re-render
      } else {
        if (interval) clearInterval(interval);
      }
    }, 1000); // update every 2 seconds
    return () => interval && clearInterval(interval);
  }, [city]);

  const handleSelectTile = (x: number, y: number) => {
    setSelectedTile({ x, y });
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
