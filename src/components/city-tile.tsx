"use client";

import { useRef } from "react";
import type { Mesh } from "three";
import type { Tile } from "@/types/city";
import assets from "@/utils/assets";
import { useAsset } from "@/hooks/useAssetManager";

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
  const grassMeshRef = useRef<Mesh>(null);
  const buildingMeshRef = useRef<Mesh>(null);

  const residentialMesh = useAsset("residential");
  const commercialMesh = useAsset("commercial");
  const industrialMesh = useAsset("industrial");
  const roadMesh = useAsset("road");

  function handlePointerDown(event: any) {
    event.stopPropagation();
    onSelectTile(tile.x, tile.y);
  }

  function lightenColor(hex: number): number {
    return hex + 0x222222 > 0xffffff ? 0xffffff : hex + 0x222222;
  }

  function getColorForBuilding(buildingId: string): number {
    const asset = assets[buildingId];
    if (!asset) return 0xaaaaaa;
    return Number.parseInt(asset.color.replace("#", "0x"));
  }

  function getAdjustedPosition(
    base: [number, number, number],
    offset: [number, number, number]
  ): [number, number, number] {
    return [base[0] + offset[0], base[1] + offset[1], base[2] + offset[2]];
  }

  return (
    <group>
      {/* Terreno */}
      <mesh
        ref={grassMeshRef}
        position={getAdjustedPosition(position, assets.grass.position)}
        onPointerDown={handlePointerDown}
        castShadow
        receiveShadow
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

      {/* Construções com modelo GLTF */}
      {["residential", "commercial", "industrial"].map((id) => {
        if (tile.building?.id !== id) return null;

        const asset = assets[id];
        const model = {
          residential: residentialMesh,
          commercial: commercialMesh,
          industrial: industrialMesh,
        }[id];

        if (!model) return null;

        return (
          <group
            key={id}
            ref={buildingMeshRef}
            position={getAdjustedPosition(position, asset.position)}
            scale={[0.25, 0.25, 0.25]}
            onPointerDown={handlePointerDown}
            castShadow
            receiveShadow
          >
            <primitive object={model.clone(true)} />
          </group>
        );
      })}

      {/* Construção simples (ex: estrada) */}
      {["road"].map((id) => {
        if (tile.building?.id !== id) return null;
        const asset = assets[id];

        return (
          <mesh
            key={id}
            ref={buildingMeshRef}
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
    </group>
  );
}
