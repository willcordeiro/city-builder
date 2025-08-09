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

  // Configuração do gerenciamento de cores (fora do useEffect)
  THREE.ColorManagement.enabled = true;

  // Cores para diferentes momentos do dia
const lightColors = {
  day: {
    sun: '#ffffff',       // Branco puro
    ambient: '#f5f9ff',   // Branco com toque de azul claro
    intensity: 1.0
  },
  night: {
    sun: '#e8e8e8',       // Branco 10% mais escuro (cinza bem claro)
    ambient: '#c8d4e8',   // Azul suave (20% mais escuro que o dia)
    intensity: 0.5        // 50% menos intensidade que o dia
  },
  sunrise: {
    sun: '#fff0d8',       // Branco com leve toque de amarelo
    ambient: '#f0e8ff',   // Lavanda quase branca
    intensity: 0.8
  },
  sunset: {
    sun: '#ffe0cc',       // Branco com toque de pêssego suave
    ambient: '#ffdde6',   // Rosa quase branco
    intensity: 0.75
  }
}
  useFrame((state) => {
    if (!sunRef.current || !moonRef.current) return;

    // Rotação do sol e lua
    const time = state.clock.getElapsedTime() * speed;
    sunRef.current.position.x = Math.sin(time) * 20;
    sunRef.current.position.y = Math.cos(time) * 20;
    sunRef.current.position.z = Math.cos(time) * 20;

    // Lua na posição oposta ao sol
    moonRef.current.position.x = Math.sin(time + Math.PI) * 20;
    moonRef.current.position.y = Math.cos(time + Math.PI) * 20;
    moonRef.current.position.z = Math.cos(time + Math.PI) * 20;

    // Determinar o período do dia
    const sunHeight = sunRef.current.position.y;
    if (sunHeight > 10) {
      setTimeOfDay("day");
    } else if (sunHeight > 0) {
      setTimeOfDay(sunHeight > 5 ? "sunrise" : "sunset");
    } else {
      setTimeOfDay("night");
    }
  });

  // Atualizar iluminação baseada no período do dia
  useEffect(() => {
    if (!sunRef.current || !ambientRef.current || !moonRef.current) return;

    const colors = lightColors[timeOfDay];

    // Configurar cores com gerenciamento linear
    sunRef.current.color.set(colors.sun).convertSRGBToLinear();
    ambientRef.current.color.set(colors.ambient).convertSRGBToLinear();
    ambientRef.current.intensity = colors.intensity;

    // Ajustar intensidade da lua
    moonRef.current.intensity = timeOfDay === "night" ? 0.3 : 0;
  }, [timeOfDay]);

  return (
    <>
      {/* Sol */}
      <directionalLight
        ref={sunRef}
        position={[10, 10, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Lua */}
      <directionalLight
        ref={moonRef}
        position={[-10, -10, -10]}
        intensity={0}
        color="#aaccff"
      />

      {/* Luz ambiente */}
      <ambientLight ref={ambientRef} intensity={0.5} />

      {/* Céu */}
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
