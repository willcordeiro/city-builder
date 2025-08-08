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

  const { gridX, gridY } = useMemo(() => ({
    gridX: position[0],
    gridY: position[2]
  }), [position]);

  const isRoad = useCallback((x: number, y: number) => {
    if (!city?.data || y < 0 || x < 0 || y >= city.data.length || x >= city.data[0]?.length) {
      return false;
    }
    return city.data[y][x]?.building?.id === "road";
  }, [city]);

  useEffect(() => {
    if (!city?.data) return;

    // Check adjacent tiles - note the y/x order matches your working example
    const top = isRoad(gridX, gridY - 1);
    const bottom = isRoad(gridX, gridY + 1);
    const left = isRoad(gridX - 1, gridY);
    const right = isRoad(gridX + 1, gridY);

    console.log(`Road at ${gridX},${gridY} connections:`, {top, bottom, left, right});

    // Match the exact logic from your working vanilla JS example
    let selectedStyle = "roadStraight";
    let rotation = 0;

    // Four-way intersection
    if (top && bottom && left && right) {
      selectedStyle = "roadFourWay";
      rotation = 0;
    } 
    // T intersection
    else if (!top && bottom && left && right) { // bottom-left-right
      selectedStyle = "roadThreeWay";
      rotation = 0;
    } else if (top && !bottom && left && right) { // top-left-right
      selectedStyle = "roadThreeWay";
      rotation = Math.PI; // 180 degrees in radians
    } else if (top && bottom && !left && right) { // top-bottom-right
      selectedStyle = "roadThreeWay";
      rotation = Math.PI / 2; // 90 degrees in radians
    } else if (top && bottom && left && !right) { // top-bottom-left
      selectedStyle = "roadThreeWay";
      rotation = (3 * Math.PI) / 2; // 270 degrees in radians
    } 
    // Corner
    else if (top && !bottom && left && !right) { // top-left
      selectedStyle = "roadCorner";
      rotation = Math.PI; // 180 degrees
    } else if (top && !bottom && !left && right) { // top-right
      selectedStyle = "roadCorner";
      rotation = Math.PI / 2; // 90 degrees
    } else if (!top && bottom && left && !right) { // bottom-left
      selectedStyle = "roadCorner";
      rotation = (3 * Math.PI) / 2; // 270 degrees
    } else if (!top && bottom && !left && right) { // bottom-right
      selectedStyle = "roadCorner";
      rotation = 0;
    } 
    // Straight
    else if (top && bottom && !left && !right) { // top-bottom
      selectedStyle = "roadStraight";
      rotation = 0;
    } else if (!top && !bottom && left && right) { // left-right
      selectedStyle = "roadStraight";
      rotation = Math.PI / 2; // 90 degrees
    } 
    // Dead end
    else if (top && !bottom && !left && !right) { // top
      selectedStyle = "roadEnd";
      rotation = Math.PI; // 180 degrees
    } else if (!top && bottom && !left && !right) { // bottom
      selectedStyle = "roadEnd";
      rotation = 0;
    } else if (!top && !bottom && left && !right) { // left
      selectedStyle = "roadEnd";
      rotation = (3 * Math.PI) / 2; // 270 degrees
    } else if (!top && !bottom && !left && right) { // right
      selectedStyle = "roadEnd";
      rotation = Math.PI / 2; // 90 degrees
    }

    // Only update if changed
    if (style !== selectedStyle || rotationY !== rotation) {
      setStyle(selectedStyle);
      setRotationY(rotation);
    }
  }, [city, gridX, gridY, isRoad, style, rotationY]);

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