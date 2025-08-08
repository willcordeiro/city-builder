import { useAsset } from "@/hooks/useAssetManager";
import useCity from "@/hooks/useCity";
import { getAdjustedPosition } from "@/utils/positionUtils";
import { useEffect } from "react";
import * as THREE from "three";
import { Asset as AssetType } from "@/utils/assets";
import { useSpring, a } from "@react-spring/three";

interface AssetProps {
  asset: AssetType;
  position: [number, number, number];
  handlePointerDown: (event: THREE.Event) => void;
}

function Asset({ asset, position, handlePointerDown }: AssetProps) {
  const { city, updateAssetLoading } = useCity();

  const x = position[0];
  const y = position[2];
  const currentAsset = city.data[x][y];

  const model = useAsset(asset.id);
  const modelLoading = useAsset("constructionSmall");

  useEffect(() => {
    if (currentAsset?.loading) {
   
      const timeout = setTimeout(() => {
        updateAssetLoading(x, y, false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [currentAsset?.loading, x, y, updateAssetLoading]);

  const activeModel = currentAsset?.loading ? modelLoading : model;

  const { scale } = useSpring({
    scale:  [0.25, 0.25, 0.25],
    from: currentAsset?.loading ? { scale: [0, 0, 0] } : undefined,
    config: { tension: 300, friction: 10 },
    delay: 50,
  });

  if (!currentAsset || !activeModel) return null;

  

  return (
    <a.group
      position={getAdjustedPosition(position, asset.position)}
      scale={scale.to((x, y, z) => [x, y, z])}
      onPointerDown={handlePointerDown}
      castShadow
      receiveShadow
    >
      <primitive object={activeModel} />
    </a.group>
  );
}

export default Asset;
