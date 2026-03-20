import { Center } from "@react-three/drei";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { extend, useLoader } from "@react-three/fiber";
extend({ TextGeometry });

export default function LogoText({ text = "DRIVEFLIX", position = [0, 0, 0] }) {
  const font = useLoader(
    FontLoader,
    "https://threejs.org/examples/fonts/optimer_bold.typeface.json"
  );

  return (
    <Center position={position}>
      <mesh position={[0.05, -0.06, -0.42]}>
        <textGeometry
          args={[text, { font, size: 1.7, depth: 0.4, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.03, bevelSegments: 3 }]}
        />
        <meshStandardMaterial color="#3c0a6b" metalness={0.3} roughness={0.7} />
      </mesh>

      <mesh>
        <textGeometry
          args={[text, { font, size: 1.7, depth: 0.38, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.03, bevelSegments: 3 }]}
        />
        <meshStandardMaterial
          color="#4c00ff"
          emissive="#3f0bb8"
          emissiveIntensity={0.25}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
    </Center>
  );
}