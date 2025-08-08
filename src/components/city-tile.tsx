"use client";
import type { Tile } from "@/types/city";
import { getAsset } from "@/utils/getAsset";
import { Text } from '@react-three/drei';
import { lightenColor, getColorForBuilding } from "@/utils/colorUtils";
import { getAdjustedPosition } from "@/utils/positionUtils";
import RenderAsset from "./renderAsset";
import { RoadTile } from "./RoadTile";
import { FloatingLabel } from "./FloatingLabel";


interface CityTileProps {
  tile: Tile;
  position: [number, number, number];
  terrainID: string;
  selected: boolean;
  onSelectTile: (x: number, y: number) => void;
  selectedToolId?: string;
}

export function CityTile({
  tile,
  position,
  selected,
  onSelectTile,
}: CityTileProps) {

  function handlePointerDown(event: any) {
    event.stopPropagation();
    onSelectTile(tile.x, tile.y);
  }

  
  
  return (
    <group>
    {/* Terreno */}
    <mesh
      position={getAdjustedPosition(position, getAsset("grass").position)}
      onPointerDown={(e) => {
        if (e.button === 0) {
          handlePointerDown(e);
        }
      }}
      onPointerMove={(e) => {
        if (e.buttons === 1) {
          // Verifica se o botão esquerdo do mouse está pressionado
          handlePointerDown(e);
        }
      }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={getAsset("grass").args} />
      <meshLambertMaterial
        color={
          selected
            ? lightenColor(getColorForBuilding("grass"))
            : getColorForBuilding("grass")
        }
      />
    </mesh>

    <FloatingLabel position={position} />

    {tile.building?.id === "road" && (
      <RoadTile
        position={position}
        handlePointerDown={handlePointerDown}
      />
    )}

    <RenderAsset
      assetId={tile.building?.id ?? ""}
      position={position}
      handlePointerDown={handlePointerDown}
    />

  </group>
  );
}
