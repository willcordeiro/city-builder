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


export function useAsset(name: keyof typeof assets ) {
  const { filename, scale = 1, rotation = 0 } = assets[name];

  // useLoader handles caching of the GLTF data itself.
  const gltf = useGLTF(`/assets/models/${filename}`);
  const mesh = useMemo(() => {
    // Clone the scene from the loaded GLTF data.
    // This clone happens once per useAsset call for a given filename/scale/rotation.
    const cloned = gltf.scene.clone();

    // Get textures from cache or load them
    const baseTexture = getTexture("/assets/textures/base.png");
    const specularTexture = getTexture("/assets/textures/specular.png");

    cloned.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        // Apply new Lambert material with cached textures
        obj.material = new THREE.MeshLambertMaterial({
          map: baseTexture,
          specularMap: specularTexture,
        });
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    cloned.scale.setScalar(scale / 30);
    cloned.rotation.y = THREE.MathUtils.degToRad(rotation);

    return cloned;
  }, [gltf, scale, rotation]); // Dependencies ensure this memo re-runs only if gltf, scale, or rotation changes.

  return mesh;
}
