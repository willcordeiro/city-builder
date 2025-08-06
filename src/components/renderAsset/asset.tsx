import { useAsset } from "@/hooks/useAssetManager";
import useCity from "@/hooks/useCity";
import { getAdjustedPosition } from "@/utils/positionUtils";
import { useEffect, useState } from "react";
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
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const x = position[0];
  const y = position[2];
  const currentAsset = city.data[x][y];

  const model = useAsset(asset.id);
  const modelLoading = useAsset("constructionSmall");

  // Marca como finalizado após simulação de carregamento
  useEffect(() => {
    if (currentAsset?.loading) {
      setShouldAnimate(true); // inicia animação para esta tile
      const timeout = setTimeout(() => {
        updateAssetLoading(x, y, false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [currentAsset?.loading, x, y, updateAssetLoading]);

  // Só aplica animação se for a tile recém colocada
  const { scale } = useSpring({
    scale: shouldAnimate ? [0.25, 0.25, 0.25] : [0.25, 0.25, 0.25],
    from: shouldAnimate ? { scale: [0, 0, 0] } : undefined,
    config: { tension: 300, friction: 10 },
    delay: 50,
    onRest: () => setShouldAnimate(false), // desativa após animar uma vez
  });

  const activeModel = currentAsset?.loading ? modelLoading : model;

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
