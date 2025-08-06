"use client";
import { getAsset } from "@/utils/getAsset";
import * as THREE from "three";
import Asset from "./asset";

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
const asset = getAsset(assetId);
if (!asset) return null;
if(asset.filename == "") return null
return (
  <Asset
    asset={asset}
    position={position}
    handlePointerDown={handlePointerDown}
  />
);
}

export default RenderAsset;
