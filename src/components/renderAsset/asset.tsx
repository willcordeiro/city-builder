"use client";
import { useAsset } from "@/hooks/useAssetManager";
import { getAdjustedPosition } from "@/utils/positionUtils";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { Asset as AssetType } from "@/utils/assets";
import { useSpring, a } from "@react-spring/three";
import useCity from "@/hooks/useCity";
import SmokeParticles from "../smokingParticles";


interface AssetProps {
  asset: AssetType;
  position: [number, number, number];
  handlePointerDown: (event: THREE.Event) => void;
}

function Asset({ asset, position, handlePointerDown }: AssetProps) {
  const { getTile, updateAssetLoading } = useCity();
  const x = position[0];
  const y = position[2];
  const currentTile = getTile(x, y);


  const finalModel = useAsset(asset.id);
  const constructionModel = useAsset("constructionSmall");

  const { activeModel, isLoading } = useMemo(() => ({
    activeModel: currentTile?.loading ? constructionModel : finalModel,
    isLoading: currentTile?.loading ?? false
  }), [currentTile?.loading, constructionModel, finalModel]);


  const { scale } = useSpring({
    from: { scale: [0, 0, 0] as [number, number, number] },
    to: { 
      scale: isLoading 
        ? [0.2, 0.2, 0.2] as [number, number, number] 
        : [0.25, 0.25, 0.25] as [number, number, number] 
    },
    config: {
      tension: isLoading ? 400 : 300,
      friction: isLoading ? 15 : 10,
    },
    delay: isLoading ? 0 : 100,
  });

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        updateAssetLoading(x, y, false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, x, y, updateAssetLoading]);

  if (!currentTile || !activeModel) return null;

  return (
    <a.group
      position={getAdjustedPosition(position, asset.position)}
      scale={scale as unknown as THREE.Vector3}
      onPointerDown={handlePointerDown}
      castShadow
      receiveShadow
    >

      <primitive 
        object={activeModel} 
        rotation={asset.rotation || [0, 0, 0]}
      />
      
     
      {isLoading && (
        <>
          <pointLight
            intensity={2}
            color="#ffaa33"
            position={[0, 1.5, 0]}
            distance={3}
          />
          <SmokeParticles visible={isLoading} />
        </>
      )}
    </a.group>
  );
}

export default Asset;