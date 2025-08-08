"use client";

import { useEffect, useState } from "react";
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

  const gridX = position[0];
  const gridY = position[2];

  const isRoad = (x: number, y: number) => {
    const tile = city?.data?.[y]?.[x];

    if (tile?.building?.id === "road") {
      console.log(tile);
    }

    return tile?.building?.id === "road";
  };

  useEffect(() => {
    if (!city || !city.data) return;

    if (isRoad(gridX, gridY - 1)) {
      console.log(`top Road found at x: ${gridX}, y: ${gridY - 1}`);
    }
    if (isRoad(gridX, gridY + 1)) {
      console.log(`bottom Road found at x: ${gridX}, y: ${gridY + 1}`);
    }
    if (isRoad(gridX - 1, gridY)) {
      console.log(`left Road found at x: ${gridX - 1}, y: ${gridY}`);
    }
    if (isRoad(gridX + 1, gridY)) {
      console.log(`right Road found at x: ${gridX + 1}, y: ${gridY}`);
    }

    console.log("Rendering RoadTile at:", "x:", gridX, "y:", gridY);

    const top = isRoad(gridX, gridY - 1);
    const bottom = isRoad(gridX, gridY + 1);
    const left = isRoad(gridX - 1, gridY);
    const right = isRoad(gridX + 1, gridY);

    let selectedStyle = "roadStraight";
    let rotation = 0;

    if (top && bottom && left && right) {
      selectedStyle = "roadFourWay";
      rotation = 0;
    } else if (!top && bottom && left && right) {
      selectedStyle = "roadThreeWay";
      rotation = 0;
    } else if (top && !bottom && left && right) {
      selectedStyle = "roadThreeWay";
      rotation = Math.PI;
    } else if (top && bottom && !left && right) {
      selectedStyle = "roadThreeWay";
      rotation = Math.PI / 2;
    } else if (top && bottom && left && !right) {
      selectedStyle = "roadThreeWay";
      rotation = (3 * Math.PI) / 2;
    } else if (top && !bottom && left && !right) {
      selectedStyle = "roadCorner";
      rotation = Math.PI;
    } else if (top && !bottom && !left && right) {
      selectedStyle = "roadCorner";
      rotation = Math.PI / 2;
    } else if (!top && bottom && left && !right) {
      selectedStyle = "roadCorner";
      rotation = (3 * Math.PI) / 2;
    } else if (!top && bottom && !left && right) {
      selectedStyle = "roadCorner";
      rotation = 0;
    } else if (top && bottom && !left && !right) {
      selectedStyle = "roadStraight";
      rotation = 0;
    } else if (!top && !bottom && left && right) {
      selectedStyle = "roadStraight";
      rotation = Math.PI / 2;
    } else if (top && !bottom && !left && !right) {
      selectedStyle = "roadEnd";
      rotation = Math.PI;
    } else if (!top && bottom && !left && !right) {
      selectedStyle = "roadEnd";
      rotation = 0;
    } else if (!top && !bottom && left && !right) {
      selectedStyle = "roadEnd";
      rotation = (3 * Math.PI) / 2;
    } else if (!top && !bottom && !left && right) {
      selectedStyle = "roadEnd";
      rotation = Math.PI / 2;
    }

    setStyle(selectedStyle);
    setRotationY(rotation);
  }, [city, gridX, gridY]);

  const model = useAsset(style);

  if (!model) return null;

  const { scale } = useSpring({
    scale: [0.25, 0.5, 0.25],
    config: { tension: 300, friction: 10 },
    delay: 50,
  });

  const basePosition = getAdjustedPosition(position, getAsset(style).position);
  basePosition[1] += 0.2;

  return (
    <a.group
      position={basePosition}
      rotation={[0, rotationY, 0]}
      scale={scale.to((x, y, z) => [x, y, z])}
      onPointerDown={handlePointerDown}
      castShadow
      receiveShadow
    >
      <primitive object={model} />
    </a.group>
  );
}
