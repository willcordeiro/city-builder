"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CLOUD_COUNT = 6;
const CLOUD_SPEED = 0.02;

export function Clouds({ isNight }: { isNight: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const cloudGeo = useMemo(() => {
    const group = new THREE.Group();

    const spheres = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < spheres; i++) {
      const geo = new THREE.SphereGeometry(0.5 + Math.random() * 0.7, 8, 8);
      const mesh = new THREE.Mesh(geo);
      mesh.position.set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 2
      );
      group.add(mesh);
    }
    return group;
  }, []);

  const clouds = useMemo(
    () =>
      Array.from({ length: CLOUD_COUNT }).map(() => ({
        position: [
          Math.random() * 100 - 50, // x (-50 a 50)
          15 + Math.random() * 10, // y (15-25)
          Math.random() * 100 - 50, // z (-50 a 50)
        ],
        scale: 3 + Math.random() * 4,
        speed: CLOUD_SPEED * (0.5 + Math.random()),
      })),
    []
  );

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((cloud, i) => {
      cloud.position.x -= clouds[i].speed;

      if (cloud.position.x < -60) {
        cloud.position.x = 60;
        cloud.position.z = Math.random() * 100 - 50;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {clouds.map((cloud, i) => (
        <group
          key={i}
          position={cloud.position as [number, number, number]}
          scale={[cloud.scale, cloud.scale, cloud.scale]}
        >
          <primitive
            object={cloudGeo.clone()}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            <meshStandardMaterial
              color={isNight ? "#555555" : "#ffffff"}
              transparent
              opacity={0.8}
              roughness={0.9}
              metalness={0}
            />
          </primitive>
        </group>
      ))}
    </group>
  );
}
