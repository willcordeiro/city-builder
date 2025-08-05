"use client";

import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useMemo } from "react";
import models from "../utils/assets";

export function useAsset(name: keyof typeof models) {
  const { filename, scale = 1, rotation = 0 } = models[name];
  const gltf = useLoader(GLTFLoader, `/assets/models/${filename}`);

  const mesh = useMemo(() => {
    const cloned = gltf.scene.clone();

    const textureLoader = new THREE.TextureLoader();
    const baseTexture = textureLoader.load("/assets/textures/base.png");
    const specularTexture = textureLoader.load("/assets/textures/specular.png");

    cloned.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
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
  }, [gltf, scale, rotation]);

  return mesh;
}
