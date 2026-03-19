import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { useLoader, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

const models = [
  "/models/car_1.obj",
  "/models/car_2.obj",
  "/models/car_3.obj",
];

export default function Cars({ color = "#4c00ff" }) {
  const ref = useRef();
  const [modelPath] = useState(
    () => models[Math.floor(Math.random() * models.length)]
  );

  const obj = useLoader(OBJLoader, modelPath);

  useEffect(() => {
    const mat = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.7,
      roughness: 0.25,
    });
    obj.traverse((child) => {
      if (!child.isMesh) return;
      child.material = mat;
      child.castShadow = true;
    });
  }, [obj, color]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.9;
    }
  });

  return <primitive ref={ref} object={obj} scale={2.0} position={[0, -1.4, 0]} />;
}