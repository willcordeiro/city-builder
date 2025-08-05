"use client";

import { useRef } from "react";
import type { Mesh } from "three";
import type { Tile } from "@/types/city";
import assets from "@/utils/assets";

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
  terrainID,
  selected,
  onSelectTile,
  selectedToolId,
}: CityTileProps) {
  const grassMeshRef = useRef<Mesh>(null);
  const buildingMeshRef = useRef<Mesh>(null);

  function handlePointerDown(event: any) {
    event.stopPropagation();
    onSelectTile(tile.x, tile.y);
  }

  function lightenColor(hex: number): number {
    return hex + 0x222222 > 0xffffff ? 0xffffff : hex + 0x222222;
  }

  function getColorForBuilding(buildingId: string): number {
    const asset = assets[buildingId];
    if (!asset) return 0xaaaaaa; // fallback color
    return parseInt(asset.color.replace("#", "0x"));
  }

  const baseHeight = 0.1; // Altura do terreno
  const buildingHeight = tile.building ? tile.building.height : baseHeight;

  return (
    <group>
      {/* Terreno */}
      <mesh
        ref={grassMeshRef}
        position={[
          position[assets.grass.position[0]],
          assets.grass.position[1],
          position[assets.grass.position[2]],
        ]}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={assets.grass.args} />
        <meshLambertMaterial
          color={
            selected
              ? lightenColor(getColorForBuilding("grass"))
              : getColorForBuilding("grass")
          }
        />
      </mesh>

      {/* Road: altura fixa */}
      {tile.building && tile.building.id === "road" && (
        <mesh
          ref={buildingMeshRef}
          position={[
            position[assets.road.position[0]],
            assets.road.position[1],
            position[assets.road.position[2]],
          ]}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={assets.road.args} />
          <meshLambertMaterial
            color={
              selected
                ? lightenColor(getColorForBuilding("road"))
                : getColorForBuilding("road")
            }
          />
        </mesh>
      )}

      {/* Outros edifícios: altura dinâmica */}
      {tile.building &&
        ["residential", "commercial", "industrial"].includes(tile.building.id) && (
          <mesh
            ref={buildingMeshRef}
            position={[position[0], buildingHeight / 2 + baseHeight, position[2]]}
            onPointerDown={handlePointerDown}
          >
            <boxGeometry args={[0.9, buildingHeight, 0.9]} />
            <meshLambertMaterial
              color={
                selected
                  ? lightenColor(getColorForBuilding(tile.building.id))
                  : getColorForBuilding(tile.building.id)
              }
            />
          </mesh>
        )}
    </group>
  );
}
