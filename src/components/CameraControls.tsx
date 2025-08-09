import { useToolbar } from "@/hooks/useTollbar";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";

export interface CameraControlsHandle {
  resetCamera: () => void;
}

interface CameraControlsProps {
  center: THREE.Vector3;
}

const CameraControls = forwardRef<CameraControlsHandle, CameraControlsProps>(
  ({ center }, ref) => {
    const { isIsometric } = useToolbar();
    const { camera, gl } = useThree();
    const keysPressed = useRef<{ [key: string]: boolean }>({});
    const moveSpeed = useRef(0.2);
    const previousCameraPosition = useRef(camera.position.clone());
    const previousCameraQuaternion = useRef(camera.quaternion.clone());
    const direction = new THREE.Vector3();
    const front = new THREE.Vector3();
    const side = new THREE.Vector3();

    const isDragging = useRef(false);
    const previousMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const rotationSpeed = 0.005;
    const target = useRef<THREE.Vector3>(center);

    // Expor função para resetar a câmera
    useImperativeHandle(ref, () => ({
      resetCamera: () => {
        if (!isIsometric) {
          camera.position.set(center.x + 20, center.y + 30, center.z + 20);
          camera.lookAt(center);
        }
      },
    }));

    useEffect(() => {
      if (isIsometric) {
        previousCameraPosition.current.copy(camera.position);
        previousCameraQuaternion.current.copy(camera.quaternion);
        camera.position.set(center.x, center.y + 40, center.z);
        camera.lookAt(center);
      } else {
        camera.position.copy(previousCameraPosition.current);
        camera.quaternion.copy(previousCameraQuaternion.current);
      }
    }, [isIsometric]);

    useEffect(() => {
      target.current.copy(center);
    }, [center]);

    useEffect(() => {
      const canvas = gl.domElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        keysPressed.current[e.key.toLowerCase()] = true;
      };

      const handleKeyUp = (e: KeyboardEvent) => {
        keysPressed.current[e.key.toLowerCase()] = false;
      };

      const handleMouseScroll = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -2 : 2;
        camera.position.addScaledVector(
          camera.getWorldDirection(new THREE.Vector3()),
          delta
        );
      };

      const handleMouseDown = (e: MouseEvent) => {
        if (e.button === 2) {
          isDragging.current = true;
          previousMouse.current = { x: e.clientX, y: e.clientY };
        }
      };

      const handleMouseUp = (e: MouseEvent) => {
        if (e.button === 2) {
          isDragging.current = false;
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (isIsometric) return;
        if (!isDragging.current) return;

        const deltaX = e.clientX - previousMouse.current.x;
        const deltaY = e.clientY - previousMouse.current.y;

        const offset = new THREE.Vector3()
          .copy(camera.position)
          .sub(target.current);
        const spherical = new THREE.Spherical().setFromVector3(offset);

        spherical.theta -= deltaX * rotationSpeed;
        spherical.phi -= deltaY * rotationSpeed;

        const EPS = 0.000001;
        spherical.phi = Math.max(EPS, Math.min(Math.PI - EPS, spherical.phi));

        offset.setFromSpherical(spherical);
        camera.position.copy(target.current).add(offset);
        camera.lookAt(target.current);

        previousMouse.current = { x: e.clientX, y: e.clientY };
      };

      canvas.addEventListener("contextmenu", (e) => e.preventDefault());
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      window.addEventListener("wheel", handleMouseScroll, { passive: false });

      return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
        window.removeEventListener("wheel", handleMouseScroll);
      };
    }, [camera, gl, isIsometric]);

    useFrame(() => {
      front
        .set(0, 0, -1)
        .applyQuaternion(camera.quaternion)
        .setY(0)
        .normalize();
      side.set(1, 0, 0).applyQuaternion(camera.quaternion).setY(0).normalize();

      direction.set(0, 0, 0);
      if (keysPressed.current["w"]) direction.add(front);
      if (keysPressed.current["s"]) direction.sub(front);
      if (keysPressed.current["a"]) direction.sub(side);
      if (keysPressed.current["d"]) direction.add(side);

      direction.normalize();

      if (keysPressed.current["q"] || keysPressed.current["e"]) {
        if (isIsometric) return;
        const offset = new THREE.Vector3()
          .copy(camera.position)
          .sub(target.current);
        const spherical = new THREE.Spherical().setFromVector3(offset);

        if (keysPressed.current["e"]) spherical.theta += rotationSpeed * 3;
        if (keysPressed.current["q"]) spherical.theta -= rotationSpeed * 3;

        offset.setFromSpherical(spherical);
        camera.position.copy(target.current).add(offset);
        camera.lookAt(target.current);
      }

      if (keysPressed.current["w"]) {
        moveSpeed.current = Math.min(moveSpeed.current + 0.01, 1.0);
      } else {
        moveSpeed.current = 0.2;
      }

      camera.position.add(direction.multiplyScalar(moveSpeed.current));
    });

    return null;
  }
);

export default CameraControls;
