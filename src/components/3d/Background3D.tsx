"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { memo, Suspense, useEffect, useRef, useState } from "react";
import CameraController from "./CameraController";
import Ground from "./Ground";
import Particles from "./Particles";
import Pedestal from "./Pedestal";
import Sky from "./Sky";
import VolumetricFog from "./VolumetricFog";

function Background3D({ onReady }: { onReady?: () => void }) {
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

  const xOffset =
    deviceTier === "mobile" ? 2.5 : deviceTier === "tablet" ? 3.5 : 5;

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
        <Environment preset="night" resolution={128} />
        <CameraController deviceTier={deviceTier} />

        <color attach="background" args={["#0a0118"]} />
        <fog attach="fog" args={["#0d4d6e", 3, 30]} />
        <VolumetricFog />

        <ambientLight intensity={0.2} />
        <hemisphereLight
          color="#4fc3f7"
          groundColor="#1a0033"
          intensity={0.4}
        />
        <directionalLight
          position={[0, 10, -1]}
          intensity={0.4}
          color="#b0c4ff"
        />

        <Suspense fallback={null}>
          <Sky />
          <Ground deviceTier={deviceTier} />

          {/* Left Pedestal - Codestellation (Purple) */}
          <Pedestal
            position={[-xOffset, -0.3, -2]}
            color="#9c27b0"
            track="codestellation"
            deviceTier={deviceTier}
          />

          {/* Right Pedestal - Decode (Cyan) */}
          <Pedestal
            position={[xOffset, -0.3, -2]}
            color="#00e5ff"
            track="decode"
            deviceTier={deviceTier}
          />

          <Particles deviceTier={deviceTier} />
        </Suspense>

        {deviceTier === "desktop" && (
          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.4}
              luminanceSmoothing={0.3}
              mipmapBlur
              resolutionScale={0.5}
            />
            <Vignette eskil={false} offset={0.15} darkness={0.8} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}

export default memo(Background3D);
