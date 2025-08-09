"use client";
import type { Tile } from "@/types/city";
import { getAsset } from "@/utils/getAsset";
import { lightenColor, getColorForBuilding } from "@/utils/colorUtils";
import { getAdjustedPosition } from "@/utils/positionUtils";
import RenderAsset from "./renderAsset";
import { RoadTile } from "./RoadTile";

interface CityTileProps {
  tile: Tile;
  position: [number, number, number];
  selected: boolean;
  onSelectTile: (x: number, y: number) => void;
}

export function CityTile({ tile, position, selected, onSelectTile }: CityTileProps) {

  function handlePointerDown(event: any) {
    event.stopPropagation();
    onSelectTile(tile.x, tile.y);
  }

  return (
    <group>
      <mesh
        position={getAdjustedPosition(position, getAsset("grass").position)}
        onPointerDown={(e) => e.button === 0 && handlePointerDown(e)}
        onPointerMove={(e) => e.buttons === 1 && handlePointerDown(e)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={getAsset("grass").args} />
        <meshLambertMaterial
          color={selected 
            ? lightenColor(getColorForBuilding("grass")) 
            : getColorForBuilding("grass")
          }
        />
      </mesh>

      {tile.building?.id === "road" && (
        <RoadTile position={position} handlePointerDown={handlePointerDown} />
      )}

      <RenderAsset
        assetId={tile.building?.id ?? ""}
        position={position}
        handlePointerDown={handlePointerDown}
      />
    </group>
  );
}