import { BoxGeometry, ConeGeometry, MeshBasicMaterial, Mesh } from "three";
import { Text } from "@react-three/drei";

interface DirectionsProps {
  position: [number, number, number];
}

export function Directions({ position }: DirectionsProps) {
  const barGeometry = new BoxGeometry(1, 0.1, 0.1);
  const barMaterial = new MeshBasicMaterial({ color: 0xffffff });

  const coneGeometry = new ConeGeometry(0.15, 0.3, 32);
  const coneMaterial = new MeshBasicMaterial({ color: 0xffffff });

  return (
    <group position={position}>
      <group position={[-2, 1, 0]} rotation={[0, Math.PI, 0]}>
        <mesh
          geometry={barGeometry}
          material={barMaterial}
          position={[-0.5, 0, 0]}
        />
        <mesh
          geometry={coneGeometry}
          material={coneMaterial}
          position={[0, 0, 0]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <Text
          position={[-1.3, 0, 0]}
          fontSize={0.15}
          anchorX="center"
          anchorY="middle"
          color="white"
          rotation={[0, Math.PI, 0]}
        >
          left
        </Text>
      </group>

      <group position={[2, 1, 0]}>
        <mesh
          geometry={barGeometry}
          material={barMaterial}
          position={[-0.5, 0, 0]}
        />
        <mesh
          geometry={coneGeometry}
          material={coneMaterial}
          position={[0, 0, 0]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <Text
          position={[-1.3, 0, 0]}
          fontSize={0.15}
          anchorX="center"
          anchorY="middle"
          color="white"
        >
          right
        </Text>
      </group>

      <group position={[0, 3, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh
          geometry={barGeometry}
          material={barMaterial}
          position={[0.5, 0, 0]}
        />
        <mesh
          geometry={coneGeometry}
          material={coneMaterial}
          position={[0, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <Text
          position={[1.3, 0, 0]}
          fontSize={0.15}
          anchorX="center"
          anchorY="middle"
          color="white"
          rotation={[0, 0, Math.PI / 2]}
        >
          up
        </Text>
      </group>

      <group position={[0, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh
          geometry={barGeometry}
          material={barMaterial}
          position={[0.5, 0, 0]}
        />
        <mesh
          geometry={coneGeometry}
          material={coneMaterial}
          position={[0, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />

        <Text
          position={[1.3, 0, 0]}
          fontSize={0.15}
          anchorX="center"
          anchorY="middle"
          color="white"
        >
          Down
        </Text>
      </group>
    </group>
  );
}
