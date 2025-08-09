"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

export function DayNightCycle({ speed = 0.1 }) {
  const { scene } = useThree();
  const [timeOfDay, setTimeOfDay] = useState<
    "day" | "night" | "sunrise" | "sunset"
  >("day");
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const moonRef = useRef<THREE.DirectionalLight>(null);

  THREE.ColorManagement.enabled = true;

  const lightColors = {
    day: {
      sun: "#ffffff",
      ambient: "#f5f9ff",
      intensity: 1.0,
    },
    night: {
      sun: "#e8e8e8",
      ambient: "#c8d4e8",
      intensity: 0.5,
    },
    sunrise: {
      sun: "#fff0d8",
      ambient: "#f0e8ff",
      intensity: 0.8,
    },
    sunset: {
      sun: "#ffe0cc",
      ambient: "#ffdde6",
      intensity: 0.75,
    },
  };
  useFrame((state) => {
    if (!sunRef.current || !moonRef.current) return;

    const time = state.clock.getElapsedTime() * speed;
    sunRef.current.position.x = Math.sin(time) * 20;
    sunRef.current.position.y = Math.cos(time) * 20;
    sunRef.current.position.z = Math.cos(time) * 20;

    moonRef.current.position.x = Math.sin(time + Math.PI) * 20;
    moonRef.current.position.y = Math.cos(time + Math.PI) * 20;
    moonRef.current.position.z = Math.cos(time + Math.PI) * 20;

    const sunHeight = sunRef.current.position.y;
    if (sunHeight > 10) {
      setTimeOfDay("day");
    } else if (sunHeight > 0) {
      setTimeOfDay(sunHeight > 5 ? "sunrise" : "sunset");
    } else {
      setTimeOfDay("night");
    }
  });

  useEffect(() => {
    if (!sunRef.current || !ambientRef.current || !moonRef.current) return;

    const colors = lightColors[timeOfDay];

    sunRef.current.color.set(colors.sun).convertSRGBToLinear();
    ambientRef.current.color.set(colors.ambient).convertSRGBToLinear();
    ambientRef.current.intensity = colors.intensity;

    moonRef.current.intensity = timeOfDay === "night" ? 0.3 : 0;
  }, [timeOfDay]);

  return (
    <>
      <directionalLight
        ref={sunRef}
        position={[10, 10, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <directionalLight
        ref={moonRef}
        position={[-10, -10, -10]}
        intensity={0}
        color="#aaccff"
      />

      <ambientLight ref={ambientRef} intensity={0.5} />

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[500, 32, 32]} />
        <meshBasicMaterial
          color={timeOfDay === "night" ? "#0a0a2a" : "#87CEEB"}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}
