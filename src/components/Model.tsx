// src/components/Model.tsx
import { useAsset } from "@/hooks/useAssetManager";
import { useMemo } from "react";

interface ModelProps {
  name: string;
  position?: [number, number, number];
}

export function Model({ name, position = [0, 0, 0] }: ModelProps) {
  const mesh = useAsset(name as any);

  const cloned = useMemo(() => mesh.clone(), [mesh]);

  return <primitive object={cloned} position={position} />;
}
