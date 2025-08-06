import { useAsset } from "@/hooks/useAssetManager";
import { lightenColor, getColorForBuilding } from "@/utils/colorUtils";
import { getAsset } from "@/utils/getAsset";
import { getAdjustedPosition } from "@/utils/positionUtils";
import { useState, useEffect, RefObject } from "react";
import * as THREE from "three";

const constructionSiteId = "construction-small.glb";

interface RenderAssetProps {
  assetId: string;
  position: [number, number, number];
  selected: boolean;
  buildingMeshRef: RefObject<THREE.Object3D | null>;
  handlePointerDown: (event: THREE.Event) => void;
}

 function RenderAsset({
  assetId,
  position,
  selected,
  buildingMeshRef,
  handlePointerDown,
}: RenderAssetProps) {
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

export default RenderAsset;
