"use client";
import type { Tile } from "@/types/city";
import { getAsset } from "@/utils/getAsset";
import assets from "@/utils/assets";
import { lightenColor, getColorForBuilding } from "@/utils/colorUtils";
import { getAdjustedPosition } from "@/utils/positionUtils";
import RenderAsset from "./renderAsset";

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

      {["road"].map((id) => {
        if (tile.building?.id !== id) return null;
        const asset = assets[id as keyof typeof assets];
        return (
          <mesh
            key={id}
            position={getAdjustedPosition(position, asset.position)}
            onPointerDown={handlePointerDown}
            castShadow
            receiveShadow
          >
            <boxGeometry args={asset.args} />
            <meshLambertMaterial
              color={
                selected
                  ? lightenColor(getColorForBuilding(id))
                  : getColorForBuilding(id)
              }
            />
          </mesh>
        );
      })}

      <RenderAsset
        assetId={tile.building?.id ?? ""}
        position={position}
        handlePointerDown={handlePointerDown}
      />
    </group>
  );
}
