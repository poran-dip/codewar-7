"use client";

import { Canvas } from "@react-three/fiber";
import { memo, Suspense, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import CameraController from "./3d/CameraController";
import RetroWorld from "./3d/RetroWorld";

function Background3D({ onReady }: { onReady?: () => void }) {
  const pathname = usePathname();
  const [deviceTier, setDeviceTier] = useState<"mobile" | "tablet" | "desktop">(
    "desktop",
  );
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const updateDeviceTier = () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        const width = window.innerWidth;
        const newTier =
          width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";
        setDeviceTier((prev) => (prev !== newTier ? newTier : prev));
      }, 200);
    };

    updateDeviceTier();
    window.addEventListener("resize", updateDeviceTier);
    return () => {
      window.removeEventListener("resize", updateDeviceTier);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        onCreated={() => onReady?.()}
        camera={{ position: [0, 1, 5], fov: 50 }}
        dpr={deviceTier === "mobile" ? 1 : [1, 1.5]}
        shadows={deviceTier === "desktop"}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: true,
        }}
      >
        <CameraController deviceTier={deviceTier} />

        <color attach="background" args={["#67c9ed"]} />
        <fog attach="fog" args={["#67c9ed", 8, 30]} />

        <Suspense fallback={null}>
          <RetroWorld
            deviceTier={deviceTier}
            track={pathname.includes("decode") ? "decode" : "codestellation"}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(Background3D);
