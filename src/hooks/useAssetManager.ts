"use client";
import * as THREE from "three";
import { useMemo } from "react";
import assets from "@/utils/assets";
import { useGLTF } from "@react-three/drei";

const textureCache = new Map<string, THREE.Texture>();

function getTexture(path: string): THREE.Texture {
  if (!textureCache.has(path)) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(path);
    texture.flipY = false; // Importante para Normal Maps
    textureCache.set(path, texture);
  }
  return textureCache.get(path)!;
}

// Pré-carrega modelos
Object.values(assets)
  .filter(({ filename }) => filename)
  .forEach(({ filename }) => {
    useGLTF.preload(`/assets/models/${filename}`);
  });

export function useAsset(name: keyof typeof assets, buildingId?: string) {
  const asset = assets[name] ?? null;
  const filename = asset?.filename ?? "";
  const scale = asset?.scale ?? 1;
  const defaultRotation = asset?.rotation ?? 0;
  const finalRotation = defaultRotation;

  const gltf = useGLTF(`/assets/models/${filename}`);

  const mesh = useMemo(() => {
    if (!asset || !gltf?.scene) return null;

    const cloned = gltf.scene.clone();

    // Texturas (substitua pelos caminhos corretos)
    const baseColorTexture = getTexture("/assets/textures/base.png");

    cloned.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        obj.material = new THREE.MeshStandardMaterial({
          map: baseColorTexture,
          metalness: 1, // Define um valor fixo (0 = não metálico, 1 = metálico)
          roughness: 1, // Define um valor fixo (0 = liso, 1 = rugoso)
          emissive: 0x000000, // Sem brilho
        });
      }
    });

    cloned.scale.setScalar(scale / 30);
    cloned.rotation.y = THREE.MathUtils.degToRad(finalRotation);

    return cloned;
  }, [gltf, asset, scale, finalRotation]);

  return mesh;
}
