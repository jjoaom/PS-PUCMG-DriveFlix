import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Cars from "./Cars";
import LogoText from "./LogoText";
import Lights from "./Lights";

export default function Scene() {
  return (
    <div className="w-100" style={{ height: "280px" }}>
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
        <color attach="background" args={["#07070f"]} />
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