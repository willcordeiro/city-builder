import { useAsset } from "@/hooks/useAssetManager";
import { getAsset } from "@/utils/getAsset";
import { getAdjustedPosition } from "@/utils/positionUtils";
import { useState, useEffect, RefObject } from "react";
import * as THREE from "three";

const constructionSiteId = "construction-small.glb";

interface RenderAssetProps {
  assetId: string;
  position: [number, number, number];
  handlePointerDown: (event: THREE.Event) => void;
}

function RenderAsset({
  assetId,
  position,
  handlePointerDown,
}: RenderAssetProps) {
  const [loading, setloading] = useState(true);

  const asset = getAsset(assetId);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (asset) {
      timeout = setTimeout(() => {
        setloading(false);
      }, 1000); 
    } else {
      setloading(false); 
    }
    return () => clearTimeout(timeout);

  }, []);

  if (!asset) return null;

  const model = useAsset(assetId);
  const modelLoading = useAsset("constructionSmall");

  if (!loading) {
    return (
      <group
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
    return (
      <group
        position={getAdjustedPosition(position, asset.position)}
        scale={[0.25, 0.25, 0.25]}
        onPointerDown={handlePointerDown}
        castShadow
        receiveShadow
      >
        <primitive object={modelLoading} />
      </group>
    );
  }
}

export default RenderAsset;

//TODO rending dissapear after first obj being placed
//TODO conditional rendering of construction site are rendering for all tiles
