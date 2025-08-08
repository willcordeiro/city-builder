"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";
import useCity from "@/hooks/useCity";
import { useAsset } from "@/hooks/useAssetManager";
import { getAdjustedPosition } from "@/utils/positionUtils";
import { getAsset } from "@/utils/getAsset";

interface RoadTileProps {
  position: [number, number, number];
  handlePointerDown: (event: THREE.Event) => void;
}

export function RoadTile({ position, handlePointerDown }: RoadTileProps) {
  const { city } = useCity();
  const [style, setStyle] = useState("roadStraight");
  const [rotationY, setRotationY] = useState(0);

  const { gridX, gridY } = useMemo(
    () => ({
      gridX: Math.round(position[0]),
      gridY: Math.round(position[2]),
    }),
    [position]
  );

  const isRoad = useCallback(
    (x: number, y: number) => {
      if (!city?.data) return false;
      if (x < 0 || y < 0 || x >= city.width || y >= city.height) return false;

      const tile = city.data[x][y];
      return tile?.building?.id === "road";
    },
    [city]
  );

  useEffect(() => {
    if (!city?.data) return;

    const top = isRoad(gridX, gridY - 1);
    const bottom = isRoad(gridX, gridY + 1);
    const left = isRoad(gridX - 1, gridY);
    const right = isRoad(gridX + 1, gridY);

    let selectedStyle = "roadStraight";
    let rotation = 0;

    const connections = [top, right, bottom, left];
    const connectionCount = connections.filter(Boolean).length;

    switch (connectionCount) {
      case 4:
        selectedStyle = "roadFourWay";
        break;
      case 3:
        selectedStyle = "roadThreeWay";
        if (!top) rotation = 0;
        else if (!right) rotation = -Math.PI / 2;
        else if (!bottom) rotation = Math.PI;
        else rotation = -(3 * Math.PI) / 2;
        break;
      case 2:
        if (top && bottom) {
          selectedStyle = "roadStraight";
          rotation = 0;
        } else if (left && right) {
          selectedStyle = "roadStraight";
          rotation = Math.PI / 2;
        } else {
          selectedStyle = "roadCorner";
          if (top && right) rotation = Math.PI / 2; // curva conecta topo + direita
          else if (right && bottom)
            rotation = (20 * Math.PI) / 2; // conecta direita + baixo
          else if (bottom && left)
            rotation = (6 * Math.PI) / 4; // conecta baixo + esquerda
          else if (left && top) rotation = (-6 * Math.PI) / 2; // conecta esquerda + topo
        }
        break;
      case 1:
        selectedStyle = "roadEnd";
        if (top) rotation = Math.PI;
        else if (right) rotation = Math.PI / 2;
        else if (bottom) rotation = Math.PI / 2 + Math.PI / -2;
        else rotation = (3 * Math.PI) / 2;
        break;
    }

  //   console.log(
  //   `Tile X:${gridX}, Y:${gridY} | tipo: ${selectedStyle} | lados conectados: ${
  //     top ? "top " : ""
  //   }${right ? "right " : ""}${bottom ? "bottom " : ""}${
  //     left ? "left" : ""
  //   } | rotação: ${rotation}`
  // );

    if (style !== selectedStyle || rotationY !== rotation) {
      setStyle(selectedStyle);
      setRotationY(rotation);
    }
  }, [city, gridX, gridY, isRoad, style, rotationY]);

  const tile = city.data[gridX][gridY];
  const model = useAsset(style,tile?.building?.id);

  if (!model) {
    return null; // Retorno explícito quando não há modelo
  }

  const { scale } = useSpring({
    scale: [0.25, 0.5, 0.25],
    config: { tension: 300, friction: 10 },
    delay: 50,
  });

  const basePosition = getAdjustedPosition(position, getAsset(style).position);
  basePosition[1] += 0.02;

  // Retorno JSX explícito do componente
  return (
    <a.group
      position={basePosition}
      rotation={[0, rotationY, 0]}
      scale={scale.to((x, y, z) => [x, y, z])}
      onPointerDown={handlePointerDown}
      castShadow={false}
      receiveShadow={false}
    >
      <primitive object={model} />
    </a.group>
  );
}
