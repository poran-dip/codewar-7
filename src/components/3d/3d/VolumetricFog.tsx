import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function VolumetricFog() {
  const fogRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (fogRef.current) {
      // Slowly drift the fog
      fogRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <>
      {/* Layer 1 - Ground level fog */}
      <mesh ref={fogRef} position={[0, -0.5, 0]}>
        <sphereGeometry args={[18, 16, 8]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Layer 2 - Mid level fog (centered on scene) */}
      <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[20, 16, 8]} />
        <meshBasicMaterial
          color="#40c0e0"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Layer 3 - Upper atmospheric fog */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[25, 16, 8]} />
        <meshBasicMaterial
          color="#80d8f0"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
