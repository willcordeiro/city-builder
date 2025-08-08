"use client";
import * as THREE from "three";
import { useMemo } from "react";
import assets from "@/utils/assets"; // Assuming this path is correct
import { useGLTF } from "@react-three/drei";

// Cache for loaded textures to prevent redundant loading
const textureCache = new Map<string, THREE.Texture>();

function getTexture(path: string): THREE.Texture {
  if (!textureCache.has(path)) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(path);
    textureCache.set(path, texture);
  }
  return textureCache.get(path)!;
}

Object.values(assets)
  .filter(({ filename }) => filename) // remove os vazios
  .forEach(({ filename }) => {
    useGLTF.preload(`/assets/models/${filename}`);
  });


export function useAsset(name: keyof typeof assets, buildingId?: string) {
  const asset = assets[name] ?? null;

  // Mesmo que o asset não exista, o hook precisa rodar:
  const filename = asset?.filename ?? "";
  const scale = asset?.scale ?? 1;
  const defaultRotation = asset?.rotation ?? 0;
  const finalRotation =  defaultRotation;

  const gltf = useGLTF(`/assets/models/${filename}`);

  const mesh = useMemo(() => {
    if (!asset || !gltf?.scene) return null;

    const cloned = gltf.scene.clone();

    const baseTexture = getTexture("/assets/textures/base.png");
    const baseTextureRoads = getTexture("/assets/textures/final_output.png");
    const specularTexture = getTexture("/assets/textures/specular.png");

    cloned.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        obj.material = new THREE.MeshLambertMaterial({
          map: buildingId === "road" ? baseTextureRoads : baseTexture,
          specularMap: specularTexture,
          
        });
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    


    cloned.scale.setScalar(scale / 30);
    cloned.rotation.y = THREE.MathUtils.degToRad(finalRotation);

    return cloned;
  }, [gltf, asset, scale, finalRotation]);

  return mesh;
}


