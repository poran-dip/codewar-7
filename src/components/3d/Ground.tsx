"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type DeviceTier = "mobile" | "tablet" | "desktop";

export default function Ground({ deviceTier }: { deviceTier: DeviceTier }) {
  const gridRef = useRef<THREE.GridHelper>(null!);
  const gridMatsRef = useRef<THREE.LineBasicMaterial[]>([]);

  useEffect(() => {
    if (gridRef.current) {
      const mat = gridRef.current.material;
      gridMatsRef.current = (
        Array.isArray(mat) ? mat : [mat]
      ) as THREE.LineBasicMaterial[];
    }
  }, []);

  useFrame(({ clock }) => {
    if (
      deviceTier === "mobile" ||
      !gridMatsRef.current ||
      gridMatsRef.current.length === 0
    )
      return;
    const opacity = 0.4 + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    gridMatsRef.current.forEach((mat) => {
      mat.opacity = opacity;
    });
  });

  const gridSize =
    deviceTier === "mobile" ? 20 : deviceTier === "tablet" ? 25 : 30;
  const gridDivisions = deviceTier === "mobile" ? 20 : 30;

  return (
    <>
      {/* Main floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.2, 0]}
        receiveShadow
      >
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial
          color="#0d0025"
          metalness={0.0}
          roughness={1.0}
          emissive="#1a0040"
          emissiveIntensity={0.2}
          envMapIntensity={0}
        />
      </mesh>

      {/* Animated grid overlay */}
      <gridHelper
        ref={gridRef}
        args={[gridSize, gridDivisions, "#00e5ff", "#7b2cbf"]}
        position={[0, -1.19, 0]}
      />

      {/* Subtle underglow effect (desktop only) */}
      {deviceTier === "desktop" && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]}>
          <planeGeometry args={[gridSize * 0.8, gridSize * 0.8]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </>
  );
}
