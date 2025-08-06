import { useRef } from "react";
import type { Mesh } from "three";
import type { Tile } from "@/types/city";
import { getAsset } from "@/utils/getAsset";
import { useAsset } from "@/hooks/useAssetManager";
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
  selected,
  onSelectTile,
}: CityTileProps) {
  const grassMeshRef = useRef<Mesh>(null);
  const buildingMeshRef = useRef<Mesh>(null);

  const renderAsset = (assetId: any) => {
    const asset = getAsset(assetId);
   
    if (!asset) return null;

    if (asset.filename) {
      // Renderiza um modelo GLTF
      const model = useAsset(assetId);
      return (
        <group
          key={assetId}
          ref={buildingMeshRef}
          position={getAdjustedPosition(position, asset.position)}
          scale={[0.25, 0.25, 0.25]}
          onPointerDown={handlePointerDown}
          castShadow
          receiveShadow
        >
          <primitive object={model} />
        </group>
      );
    } else {
      // Renderiza um cubo simples
      return (
        <mesh
          key={assetId}
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
                ? lightenColor(getColorForBuilding(assetId))
                : getColorForBuilding(assetId)
            }
          />
        </mesh>
      );
    }
  };

  function handlePointerDown(event: any) {
    event.stopPropagation();
    onSelectTile(tile.x, tile.y);
  }

  function lightenColor(hex: number): number {
    return hex + 0x222222 > 0xffffff ? 0xffffff : hex + 0x222222;
  }

  function getColorForBuilding(buildingId: string): number {
    const asset = getAsset(buildingId);
    if (!asset || !asset.color) return 0xaaaaaa;
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
        position={getAdjustedPosition(position, getAsset("grass").position)}
        onPointerDown={handlePointerDown}
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
            // ref={buildingMeshRef} // Removed for consistency
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

           {["road"].map((id) => {
        if (tile.building?.id !== id) return null;
        const asset = assets[id as keyof typeof assets];
        return (
          <mesh
            key={id}
            // ref={buildingMeshRef} // Removed for consistency
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

      {/* Renderiza o asset */}
      {renderAsset(tile.building?.id)}
    </group>
  );
}