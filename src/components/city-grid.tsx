"use client";
import useCity from "@/hooks/useCity";
import { CityTile } from "./city-tile";

import { useToolbar } from "@/hooks/useTollbar";
import assets from "@/utils/assets";

export function CityGrid() {
  const { city, selectedTile, setSelectedTile, updateTileBuilding } = useCity();
  const { selectedToolId } = useToolbar();

  const handleSelectTile = (x: number, y: number) => {
    setSelectedTile({ x, y });
    
    if (!selectedToolId) return;

    if (selectedToolId === "bulldoze") {
      updateTileBuilding(x, y, null);
    } else if (assets[selectedToolId]) {
      updateTileBuilding(x, y, selectedToolId);
    }
  };

  return (
    <>
      {Array.from({ length: city.size }).map((_, x) =>
        Array.from({ length: city.size }).map((_, y) => {
          const tile = city.data[x][y];
          const position: [number, number, number] = [x, 0, y];
          const isSelected = selectedTile?.x === x && selectedTile?.y === y;

          return (
            <CityTile
              key={`tile-${x}-${y}`}
              tile={tile}
              position={position}
              selected={isSelected}
              onSelectTile={handleSelectTile}
            />
          );
        })
      )}
    </>
  );
}