import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function FloatingLabel({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1] + 1, position[2]]}
    >
      {/* Fundo branco */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.2, 0.25]} />
        <meshBasicMaterial color="gray" transparent opacity={0.9} />
      </mesh>

      {/* Texto */}
      <Text
        color="black"
        fontSize={0.1}
        anchorX="center"
        anchorY="middle"
      >
        {`x: ${position[0]}, y: ${position[2]}`}
      </Text>
    </group>
  );
}
