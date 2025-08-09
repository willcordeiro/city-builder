"use client";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

export default function SmokeParticles({ visible }: { visible: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i3 + 1] = Math.cos(phi) * radius + 1.5;
      positions[i3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
      scales[i] = Math.random() * 0.5 + 0.5;
    }
    
    return { positions, scales };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current || !visible) return;
    
    const geometry = particlesRef.current.geometry;
    const positionAttribute = geometry.attributes.position;
    
    if (!positionAttribute || !positionAttribute.array) return;
    
    const time = state.clock.getElapsedTime();
    particlesRef.current.rotation.y = time * 0.1;
    
    const positions = positionAttribute.array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += 0.01 + Math.sin(time + i) * 0.005;
      if (positions[i3 + 1] > 3) positions[i3 + 1] = 0.5;
    }
    
    positionAttribute.needsUpdate = true;
  });

  if (!visible) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
          count={particles.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[particles.scales, 1]}
          count={particles.scales.length}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        sizeAttenuation={true}
        color="#aaaaaa"
        transparent
        opacity={0.6}
        alphaTest={0.01}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}