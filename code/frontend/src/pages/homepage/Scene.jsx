import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Cars from "./Cars";
import LogoText from "./LogoText";
import Lights from "./Lights";

export default function Scene() {
  return (
    <div className="w-100 scene-wrapper">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        gl={{ alpha: true }}
        className="bg-transparent"
      >
        <Lights />

        <Suspense fallback={null}>
          <LogoText text="DRIVEFLIX" position={[0, 1.5, 0]} />
        </Suspense>

        <Suspense fallback={null}>
          <Cars color="#4c00ff" />
        </Suspense>
      </Canvas>
    </div>
  );
}