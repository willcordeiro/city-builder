"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { CityGrid } from "@/components/city-grid";
import { ToolbarSidebar } from "@/components/ToolbarSidebar";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib"; // Import type for OrbitControls
import * as THREE from "three"; // Import THREE for Vector3

export default function ThreeScene({ size }: { size: number }) {
  const [selectedToolId, setSelectedToolId] = useState<string | undefined>(
    "residential"
  );
  const [isIsometric, setIsIsometric] = useState(false); // New state for isometric view
  const gridSize = size;
  const controlsRef = useRef<OrbitControlsImpl>(null); // Ref for OrbitControls
  const initialCameraPosition = useRef(new THREE.Vector3()); // To store initial camera position
  const initialCameraTarget = useRef(new THREE.Vector3()); // To store initial camera target

  // Calculate the center of the grid
  const gridCenter = new THREE.Vector3(gridSize / 2 - 0.5, 0, gridSize / 2 - 0.5);

  // Define the desired initial free camera position and target
  const defaultFreeCameraPosition = new THREE.Vector3(
    gridCenter.x + gridSize * 1.2, // X position relative to center
    gridCenter.y + gridSize * 1.5, // Y position (height)
    gridCenter.z + gridSize * 1.2  // Z position relative to center
  );
  const defaultFreeCameraTarget = new THREE.Vector3(
    gridCenter.x,
    gridCenter.y,
    gridCenter.z
  );

  function handleToolSelect(id: string | undefined) {
    setSelectedToolId(id);
  }

  // Function to toggle between normal and isometric view
  const toggleIsometricView = useCallback(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;

      if (!isIsometric) {
        // Switching to isometric view: Save current state, then set isometric
        initialCameraPosition.current.copy(controls.object.position);
        initialCameraTarget.current.copy(controls.target);

        // Set camera directly above the center, looking straight down
        const topDownHeight = gridSize * 2; // Adjust this value to control how "zoomed out" the top-down view is
        controls.object.position.set(gridCenter.x, topDownHeight, gridCenter.z);
        controls.target.set(gridCenter.x, gridCenter.y, gridCenter.z); // Look directly at the center of the grid

        // Disable pan, but enable zoom and rotation (locked to top-down)
        controls.enablePan = false;
        controls.enableZoom = true;
        controls.enableRotate = true; // Enable rotation
        controls.minPolarAngle = 0; // Lock vertical angle to straight down
        controls.maxPolarAngle = 0; // Lock vertical angle to straight down
      } else {
        // Switching back to initial view: Restore saved state
        controls.object.position.copy(initialCameraPosition.current);
        controls.target.copy(initialCameraTarget.current);

        // Re-enable all controls and reset polar angles to default (full range)
        controls.enablePan = true;
        controls.enableZoom = true;
        controls.enableRotate = true;
        controls.minPolarAngle = 0; // Default
        controls.maxPolarAngle = Math.PI; // Default (allows full vertical rotation)
      }
      controls.update(); // Important: Update controls after manual changes
      setIsIsometric((prev) => !prev); // Toggle the isometric state
    }
  }, [isIsometric, gridSize, gridCenter]);

  // Capture initial camera state after OrbitControls has initialized
  // This useEffect runs once after the initial render and OrbitControls setup
  useEffect(() => {
    if (controlsRef.current) {
      // The camera's initial position is set by the Canvas prop.
      // The OrbitControls' initial target is set by its prop.
      // We just need to capture these stable initial values.
      initialCameraPosition.current.copy(controlsRef.current.object.position);
      initialCameraTarget.current.copy(controlsRef.current.target);
    }
  }, []); // Empty dependency array ensures this runs only once on mount


  return (
    <>
      <ToolbarSidebar
        onSelect={handleToolSelect}
        selectedId={selectedToolId}
        onToggleIsometric={toggleIsometricView} // Pass the toggle function
        isIsometricActive={isIsometric} // Pass the current isometric state
      />
      <Canvas
        shadows
        camera={{
          position: defaultFreeCameraPosition.toArray(), // Set initial camera position here
          fov: 60,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "#777777",
        }}
      >
        <Suspense fallback={null}>
          <CityGrid selectedToolId={selectedToolId} />
          {/* Invisible plane that receives shadows */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[gridSize / 2 - 0.5, -0.5, gridSize / 2 - 0.5]} // centralize under the grid
            receiveShadow
          >
            <planeGeometry args={[gridSize * 3, gridSize * 3]} />
            <shadowMaterial opacity={0.4} />
          </mesh>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[gridSize * 0.8, gridSize * 2, gridSize * 0.8]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.1}
            shadow-camera-far={gridSize * 4}
            shadow-camera-left={-gridSize * 1.2}
            shadow-camera-right={gridSize * 1.2}
            shadow-camera-top={gridSize * 1.2}
            shadow-camera-bottom={-gridSize * 1.2}
          />
          <Environment preset="city" />
          <OrbitControls
            ref={controlsRef} // Attach the ref
            enablePan={!isIsometric} // Conditionally enable/disable based on isometric state
            enableZoom={true} // Always enable zoom
            enableRotate={true} // Always enable rotate, but polar angles will restrict it
            minPolarAngle={isIsometric ? 0 : 0} // Lock to 0 for isometric, default for normal
            maxPolarAngle={isIsometric ? 0 : Math.PI} // Lock to 0 for isometric, default for normal
            target={defaultFreeCameraTarget.toArray()} // Set initial target here
          />
        </Suspense>
      </Canvas>
    </>
  );
}
