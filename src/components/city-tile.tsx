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
  return (
    <group>
      <mesh
        ref={grassMeshRef}
        position={[position[0], -0.5, position[2]]}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial color={selected ? lightenColor(0x00aa00) : 0x00aa00} />
      </mesh>

      {tile.building && tile.building.id === "residential" && (
        <mesh
          ref={buildingMeshRef}
           position={[position[assets.residential.position[0]], assets.residential.position[1], position[assets.residential.position[2]]]}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={assets.residential.args} />
          <meshLambertMaterial color={getColorForBuilding("residential")} />
        </mesh>
      )}

      {tile.building && tile.building.id === "commercial" && (
        <mesh
          ref={buildingMeshRef}
        position={[position[assets.commercial.position[0]], assets.commercial.position[1], position[assets.commercial.position[2]]]}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={assets.commercial.args} />
          <meshLambertMaterial color={getColorForBuilding("commercial")} />
        </mesh>
      )}

      {tile.building && tile.building.id === "industrial" && (
        <mesh
          ref={buildingMeshRef}
        position={[position[assets.industrial.position[0]], assets.industrial.position[1], position[assets.industrial.position[2]]]}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={assets.industrial.args} />
          <meshLambertMaterial color={getColorForBuilding("industrial")} />
        </mesh>
      )}

      {tile.building && tile.building.id === "road" && (
        <mesh
          ref={buildingMeshRef}
        position={[position[assets.road.position[0]], assets.road.position[1], position[assets.road.position[2]]]}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={assets.road.args} />
          <meshLambertMaterial color={getColorForBuilding("road")} />
        </mesh>
      )}
    </group>
  );
}
