"use client";
import { useState, useEffect, useRef } from "react";
import { RainSystem } from "./RainSystem";

export function RainController() {
  const [isRaining, setIsRaining] = useState(false);
  const [intensity, setIntensity] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkRain = () => {
    const shouldRain = Math.random() > 0.5;
    const newIntensity = shouldRain ? 0.5 + Math.random() * 0.5 : 0;

    setIsRaining(shouldRain);
    setIntensity(newIntensity);

    timeoutRef.current = setTimeout(checkRain, 60000);
  };

  useEffect(() => {
    checkRain();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <RainSystem intensity={intensity} />;
}
