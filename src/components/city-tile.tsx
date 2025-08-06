import { useRef } from "react";
import type { Mesh } from "three";
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
  const grassMeshRef = useRef<Mesh>(null);
  const buildingMeshRef = useRef<Mesh>(null);

  function handlePointerDown(event: any) {
    event.stopPropagation();
    onSelectTile(tile.x, tile.y);
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

      {/* Renderiza o asset */}
      <RenderAsset
        assetId={tile.building?.id ?? ""}
        position={position} // aqui você passa a posição do tile
        selected={selected} // boolean que indica se está selecionado
        buildingMeshRef={buildingMeshRef} // o ref que você usa para o mesh ou grupo
        handlePointerDown={handlePointerDown} // sua função de clique
      />
    </group>
  );
}
