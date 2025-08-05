"use client";

import { useRef } from "react";
import type { Mesh } from "three";
import type { Tile } from "@/types/city";
import { TOOL_DEFINITIONS } from "@/utils/tool-constants";

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
    console.log(
      `Clicked tile: x=${tile.x}, y=${tile.y}, building=${tile.buildingId ?? "none"}, terrainID=${terrainID}`
    );
  }

  function lightenColor(hex: number): number {
    return hex + 0x222222 > 0xffffff ? 0xffffff : hex + 0x222222;
  }

  function getColorForBuilding(buildingId: string): number {
    const tool = TOOL_DEFINITIONS.find((t) => t.id === buildingId);
    if (!tool) return 0xaaaaaa; // fallback color
    return parseInt(tool.color.replace("#", "0x"));
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

      {tile.buildingId === "residential" && (
        <mesh
          ref={buildingMeshRef}
          position={[position[0], 0.5, position[2]]}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={[0.8, 1, 0.8]} />
          <meshLambertMaterial color={getColorForBuilding("residential")} />
        </mesh>
      )}

      {tile.buildingId === "commercial" && (
        <mesh
          ref={buildingMeshRef}
          position={[position[0], 0.7, position[2]]}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={[1, 1.4, 1]} />
          <meshLambertMaterial color={getColorForBuilding("commercial")} />
        </mesh>
      )}

      {tile.buildingId === "industrial" && (
        <mesh
          ref={buildingMeshRef}
          position={[position[0], 0.6, position[2]]}
          onPointerDown={handlePointerDown}
        >
          <cylinderGeometry args={[0.5, 0.5, 1.2, 16]} />
          <meshLambertMaterial color={getColorForBuilding("industrial")} />
        </mesh>
      )}

      {tile.buildingId === "road" && (
        <mesh
          ref={buildingMeshRef}
          position={[position[0], 0.05, position[2]]}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={[1, 0.1, 1]} />
          <meshLambertMaterial color={getColorForBuilding("road")} />
        </mesh>
      )}
    </group>
  );
}
