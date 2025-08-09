"use client";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function RainSystem({ intensity = 0 }) {
  const rainRef = useRef<THREE.Group>(null);
  const rainCount = Math.floor(5000 * intensity);
  const rainGeometry = useRef<THREE.BufferGeometry>(null);
  const rainMaterial = useRef<THREE.Material>(null);

  useEffect(() => {
    if (!rainGeometry.current || !rainMaterial.current) return;

    const positions = new Float32Array(rainCount * 3);
    const sizes = new Float32Array(rainCount);

    for (let i = 0; i < rainCount; i++) {
      const i3 = i * 3;
      positions[i3] = Math.random() * 200 - 100; // x (-100 a 100)
      positions[i3 + 1] = Math.random() * 100 + 20; // y (20 a 120)
      positions[i3 + 2] = Math.random() * 200 - 100; // z (-100 a 100)
      sizes[i] = 0.1 + Math.random() * 0.3;
    }

    rainGeometry.current.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    rainGeometry.current.setAttribute(
      "size",
      new THREE.BufferAttribute(sizes, 1)
    );

    return () => {
      rainGeometry.current?.dispose();
      rainMaterial.current?.dispose();
    };
  }, [intensity, rainCount]);

  useFrame((state) => {
    if (!rainRef.current || !rainGeometry.current || intensity <= 0) return;

    const positions = rainGeometry.current.attributes.position.array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < rainCount; i++) {
      const i3 = i * 3;
      positions[i3 + 1] -= 0.1 + Math.random() * intensity;

      if (positions[i3 + 1] < 0) {
        positions[i3] = Math.random() * 200 - 100;
        positions[i3 + 1] = Math.random() * 50 + 70;
        positions[i3 + 2] = Math.random() * 200 - 100;
      }

      positions[i3] += Math.sin(time * 2 + i) * 0.02 * intensity;
      positions[i3 + 2] += Math.cos(time * 1.5 + i) * 0.02 * intensity;
    }

    rainGeometry.current.attributes.position.needsUpdate = true;
  });

  if (intensity <= 0) return null;

  return (
    <group ref={rainRef}>
      <points>
        <bufferGeometry ref={rainGeometry} />
        <pointsMaterial
          ref={rainMaterial}
          color={"darkblue"}
          size={0.3}
          transparent
          opacity={1}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
}
