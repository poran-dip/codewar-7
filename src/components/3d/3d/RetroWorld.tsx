"use client";

import { Float, Sparkles } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type V3 = [number, number, number];

/* ------------------------------------------------------------------ */
/* Pixel-style textures drawn on a canvas (no image files needed)      */
/* ------------------------------------------------------------------ */

function makeTexture(
  size: number,
  draw: (ctx: CanvasRenderingContext2D, s: number) => void,
  repeat?: [number, number],
): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.NearestFilter; // crisp retro pixels
  tex.anisotropy = 4;
  if (repeat) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat[0], repeat[1]);
  }
  return tex;
}

let _question: THREE.CanvasTexture | null | undefined;
let _brick: THREE.CanvasTexture | null | undefined;
let _dirt: THREE.CanvasTexture | null | undefined;

function getQuestionTexture() {
  if (_question === undefined) {
    _question = makeTexture(64, (ctx, s) => {
      ctx.fillStyle = "#f4a62a";
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = "#7a3a12";
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, s - 4, s - 4);
      ctx.fillStyle = "#7a3a12";
      [8, s - 8].forEach((x) =>
        [8, s - 8].forEach((y) => ctx.fillRect(x - 2, y - 2, 4, 4)),
      );
      ctx.font = "bold 44px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#7a3a12";
      ctx.fillText("?", s / 2 + 2, s / 2 + 4);
      ctx.fillStyle = "#fff0a0";
      ctx.fillText("?", s / 2, s / 2 + 2);
    });
  }
  return _question;
}

function getBrickTexture() {
  if (_brick === undefined) {
    _brick = makeTexture(64, (ctx, s) => {
      ctx.fillStyle = "#c2623a";
      ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = "#3a1a0c";
      const rows = 4;
      const h = s / rows;
      for (let r = 0; r < rows; r++) {
        ctx.fillRect(0, r * h, s, 2);
        const off = r % 2 === 0 ? 0 : s / 4;
        for (let x = off; x < s; x += s / 2) ctx.fillRect(x, r * h, 2, h);
      }
      ctx.fillStyle = "#d9784a";
      for (let r = 0; r < rows; r++) ctx.fillRect(2, r * h + 2, s - 4, 2);
    });
  }
  return _brick;
}

function getDirtTexture() {
  if (_dirt === undefined) {
    _dirt = makeTexture(
      64,
      (ctx, s) => {
        ctx.fillStyle = "#b86a35";
        ctx.fillRect(0, 0, s, s);
        ctx.fillStyle = "#8a4a22";
        for (let i = 0; i < 28; i++) {
          ctx.fillRect(
            Math.floor(Math.random() * 16) * 4,
            Math.floor(Math.random() * 16) * 4,
            4,
            4,
          );
        }
        ctx.fillStyle = "#d28a4c";
        for (let i = 0; i < 14; i++) {
          ctx.fillRect(
            Math.floor(Math.random() * 16) * 4,
            Math.floor(Math.random() * 16) * 4,
            4,
            4,
          );
        }
      },
      [4, 1],
    );
  }
  return _dirt;
}

/* ------------------------------------------------------------------ */
/* Collectibles                                                        */
/* ------------------------------------------------------------------ */

function Coin({ position, scale = 1 }: { position: V3; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 3;
    ref.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.1;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 24]} />
        <meshStandardMaterial
          color="#ffd34e"
          emissive="#e99419"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
      {/* raised slot on both faces */}
      {[0.035, -0.035].map((z) => (
        <mesh key={z} position={[0, 0, z]}>
          <boxGeometry args={[0.07, 0.24, 0.02]} />
          <meshStandardMaterial color="#e8a21a" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/** Spotted power-up mushroom: round cap, white spots, cream stem with eyes */
const SPOTS: [number, number, number][] = [
  // [angle from top, angle around, size]
  [0, 0, 0.13],
  [0.85, 0, 0.14],
  [0.85, 2.09, 0.14],
  [0.85, 4.19, 0.14],
  [1.25, 1.05, 0.1],
  [1.25, 3.15, 0.1],
  [1.25, 5.24, 0.1],
];

function Mushroom({
  position,
  scale = 1,
  capColor = "#e52521",
  rotationY = 0,
}: {
  position: V3;
  scale?: number;
  capColor?: string;
  rotationY?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const R = 0.42;
  const spots = useMemo(() => {
    const up = new THREE.Vector3(0, 1, 0);
    return SPOTS.map(([theta, phi, size]) => {
      const dir = new THREE.Vector3(
        Math.sin(theta) * Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta) * Math.sin(phi),
      );
      const pos = new THREE.Vector3(dir.x * R, dir.y * R * 0.82, dir.z * R).multiplyScalar(1.01);
      const quat = new THREE.Quaternion().setFromUnitVectors(up, dir);
      return { pos: pos.toArray() as V3, quat, size };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() + position[0] * 2;
    ref.current.position.y = position[1] + Math.abs(Math.sin(t * 2)) * 0.06 * scale;
    ref.current.rotation.y = rotationY + Math.sin(t * 0.8) * 0.2;
  });

  return (
    <group ref={ref} position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* stem */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.23, 0.4, 20]} />
        <meshStandardMaterial color="#f8e8c8" roughness={0.8} />
      </mesh>
      {/* eyes */}
      {[-0.075, 0.075].map((x) => (
        <group key={x} position={[x, 0.22, 0.2]}>
          <mesh scale={[0.55, 1.4, 0.4]}>
            <sphereGeometry args={[0.06, 10, 10]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0, 0.03, 0.02]} scale={[0.5, 0.7, 0.3]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
      {/* underside lip */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.41, 0.36, 0.06, 24]} />
        <meshStandardMaterial color="#f3dfb4" roughness={0.85} />
      </mesh>
      {/* cap */}
      <group position={[0, 0.4, 0]}>
        <mesh scale={[1, 0.82, 1]} castShadow>
          <sphereGeometry args={[R, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
          <meshStandardMaterial color={capColor} roughness={0.55} side={THREE.DoubleSide} />
        </mesh>
        {spots.map((s, i) => (
          <mesh key={i} position={s.pos} quaternion={s.quat} scale={[1, 0.3, 1]}>
            <sphereGeometry args={[s.size, 16, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Blocks, pipes, scenery                                              */
/* ------------------------------------------------------------------ */

function QuestionBlock({ position }: { position: V3 }) {
  const ref = useRef<THREE.Mesh>(null);
  const tex = useMemo(() => getQuestionTexture(), []);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 1.6 + position[0]) * 0.06;
    }
  });
  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[0.72, 0.72, 0.72]} />
      <meshStandardMaterial
        map={tex ?? undefined}
        color={tex ? "#ffffff" : "#ef9f32"}
        emissive="#9b4b16"
        emissiveIntensity={0.25}
        roughness={0.6}
      />
    </mesh>
  );
}

function BrickBlock({ position }: { position: V3 }) {
  const tex = useMemo(() => getBrickTexture(), []);
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.64, 0.64, 0.64]} />
      <meshStandardMaterial map={tex ?? undefined} color={tex ? "#ffffff" : "#b95d32"} roughness={0.9} />
    </mesh>
  );
}

function Pipe({ position, height = 1.25 }: { position: V3; height?: number }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.42, 0.42, height, 24]} />
        <meshStandardMaterial color="#1fa24a" roughness={0.45} metalness={0.1} />
      </mesh>
      {/* highlight stripe */}
      <mesh position={[-0.2, 0, 0.36]}>
        <boxGeometry args={[0.06, height * 0.92, 0.02]} />
        <meshBasicMaterial color="#7be08f" />
      </mesh>
      {/* rim */}
      <mesh position={[0, height / 2 + 0.11, 0]} castShadow>
        <cylinderGeometry args={[0.52, 0.52, 0.26, 24]} />
        <meshStandardMaterial color="#2cc25a" roughness={0.4} />
      </mesh>
      <mesh position={[0, height / 2 + 0.11, 0]}>
        <cylinderGeometry args={[0.53, 0.53, 0.02, 24]} />
        <meshBasicMaterial color="#0e5a2a" />
      </mesh>
    </group>
  );
}

function Cloud({ position, scale }: { position: V3; scale: number }) {
  return (
    <Float speed={0.4} floatIntensity={0.3} rotationIntensity={0}>
      <group position={position} scale={scale}>
        <mesh position={[-0.55, 0, 0]}>
          <sphereGeometry args={[0.5, 16, 12]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.66, 16, 12]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.58, 0, 0]}>
          <sphereGeometry args={[0.44, 16, 12]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, -0.12, 0.1]} scale={[1.9, 0.5, 0.8]}>
          <sphereGeometry args={[0.5, 16, 12]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </Float>
  );
}

function Hill({ position, scale, color }: { position: V3; scale: V3; color: string }) {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} roughness={1} />
      </mesh>
      {/* little eyes on the hill */}
      {[-0.16, 0.16].map((x) => (
        <mesh key={x} position={[x, 0.5, 0.82]} scale={[0.5, 1.4, 0.3]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
      ))}
    </group>
  );
}

function Bush({ position, scale = 1 }: { position: V3; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {([[-0.4, 0.28], [0, 0.4], [0.42, 0.28]] as [number, number][]).map(([x, r], i) => (
        <mesh key={i} position={[x, r * 0.6, 0]} castShadow>
          <sphereGeometry args={[r, 14, 10]} />
          <meshStandardMaterial color="#3fae4c" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function Platform({
  position,
  size,
  dirt = false,
}: {
  position: V3;
  size: V3;
  dirt?: boolean;
}) {
  const tex = useMemo(() => (dirt ? getDirtTexture() : null), [dirt]);
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          map={tex ?? undefined}
          color={tex ? "#ffffff" : "#b86a35"}
          roughness={0.95}
        />
      </mesh>
      {/* grass top */}
      <mesh position={[0, size[1] / 2 + 0.07, 0]} castShadow receiveShadow>
        <boxGeometry args={[size[0] + 0.04, 0.14, size[2] + 0.04]} />
        <meshStandardMaterial color="#5cc84a" roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* The plumber hero                                                    */
/* ------------------------------------------------------------------ */

const SKIN = "#f5b48a";

/* ---- Two plumber heroes: typing on a laptop + thumbs up ---- */

const geoCache = new Map<string, THREE.BufferGeometry>();
function geo(kind: "s" | "b" | "c", ...a: number[]) {
  const k = kind + a.join(",");
  let g = geoCache.get(k);
  if (!g) {
    g =
      kind === "s"
        ? new THREE.SphereGeometry(a[0], a[1] ?? 16, a[2] ?? 12)
        : kind === "b"
          ? new THREE.BoxGeometry(a[0], a[1], a[2])
          : new THREE.CylinderGeometry(a[0], a[1], a[2], a[3] ?? 20);
    geoCache.set(k, g);
  }
  return g;
}

function P({ g, m, p, s, r, shadow = true }: { g: THREE.BufferGeometry; m: THREE.Material; p?: V3; s?: V3; r?: V3; shadow?: boolean }) {
  return <mesh geometry={g} material={m} position={p} scale={s} rotation={r} castShadow={shadow} receiveShadow />;
}

const mat = (c: string, o: THREE.MeshStandardMaterialParameters = {}) =>
  new THREE.MeshStandardMaterial({ color: c, roughness: 0.8, ...o });

const SK = mat(SKIN);
const NOSE = mat("#f2a27a");
const WHITE = mat("#ffffff", { roughness: 0.6 });
const SHOE = mat("#5a3218", { roughness: 0.7 });
const GOLD = mat("#ffd34e", { metalness: 0.6, roughness: 0.3 });
const MUST = mat("#3a1d0f", { roughness: 1 });
const WOOD = mat("#8a5a2b", { roughness: 0.7 });
const WOODD = mat("#6b4220");
const LAP = mat("#4b4f5c", { metalness: 0.4, roughness: 0.4 });
const KEYS = mat("#2a2d38");
const MOUTH = mat("#7a2a22");
const CHEEK = mat("#f6a183");
const SMILE = new THREE.TorusGeometry(0.07, 0.013, 8, 24, Math.PI);
const EYEW = new THREE.MeshBasicMaterial({ color: "#ffffff" });
const EYEB = new THREE.MeshBasicMaterial({ color: "#1c3d9c" });
const SCREEN = new THREE.MeshBasicMaterial({ color: "#0e1a2b" });
const CAP_DOME = new THREE.SphereGeometry(0.28, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2);
const PLANE_SCREEN = new THREE.PlaneGeometry(0.52, 0.32);
const PLANE_BACK = new THREE.PlaneGeometry(0.5, 0.34);

let _lid: THREE.CanvasTexture | null | undefined;
function getLidTexture() {
  if (_lid === undefined) {
    _lid = makeTexture(64, (ctx, s) => {
      ctx.fillStyle = "#3b3f4c";
      ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = "#7ee8ff";
      ctx.font = "bold 30px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("</>", s / 2, s / 2 + 2);
    });
  }
  return _lid;
}

const REACH_DOWN = new THREE.Vector3(0, -1, 0);
const _dir = new THREE.Vector3();
const _shoulder = new THREE.Vector3(-0.36, 1.12, 0);

function CodeHero({
  x, shirt, over, hair, ry, yaw, active,
}: { x: number; shirt: string; over: string; hair: string; ry: number; yaw: number; active: boolean }) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  const thumb = useRef<THREE.Mesh>(null);

  const m = useMemo(() => {
    const lidTex = getLidTexture();
    return {
      shirt: mat(shirt),
      over: mat(over),
      cap: mat(shirt, { roughness: 0.75, side: THREE.DoubleSide }),
      hair: mat(hair, { roughness: 1 }),
      lid: new THREE.MeshBasicMaterial({ color: lidTex ? "#ffffff" : "#3b3f4c", map: lidTex ?? undefined }),
    };
  }, [shirt, over, hair]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + x;
    if (root.current) root.current.position.y = -0.41 + Math.abs(Math.sin(t * 2.2)) * 0.04 * (active ? 1.8 : 1);
    if (head.current) head.current.rotation.y = Math.sin(t * 0.8) * 0.25;
    if (armL.current) {
      // left hand "types": aim the arm at the keyboard with tiny jitter
      _dir
        .set(-0.14 + Math.sin(t * 12) * 0.015, 0.79 + Math.abs(Math.sin(t * 14)) * 0.02, 0.52)
        .sub(_shoulder)
        .normalize();
      armL.current.quaternion.setFromUnitVectors(REACH_DOWN, _dir);
    }
    if (elbow.current) elbow.current.rotation.x = -1.9 + Math.sin(t * 3) * 0.08 * (active ? 2 : 1);
    if (thumb.current) thumb.current.scale.y = 1 + Math.max(0, Math.sin(t * 4)) * 0.25;
  });

  return (
    <group ref={root} position={[x, -0.41, 0]} scale={1.15} rotation={[0, ry, 0]}>
      {/* legs + shoes */}
      {[-0.17, 0.17].map((px) => <P key={px} g={geo("s", 0.16, 14, 10)} m={SHOE} p={[px, 0.1, 0.07]} s={[1, 0.62, 1.55]} />)}
      {[-0.15, 0.15].map((px) => <P key={px} g={geo("c", 0.12, 0.13, 0.42, 14)} m={m.over} p={[px, 0.38, 0]} />)}
      {/* body */}
      <P g={geo("s", 0.36, 20, 14)} m={m.over} p={[0, 0.78, 0]} s={[1, 0.9, 0.86]} />
      <P g={geo("c", 0.28, 0.31, 0.3, 18)} m={m.shirt} p={[0, 1.02, 0]} />
      {[-0.15, 0.15].map((px) => (
        <group key={px}>
          <P g={geo("b", 0.09, 0.34, 0.07)} m={m.over} p={[px, 1.03, 0.25]} r={[0.12, 0, 0]} />
          <P g={geo("s", 0.05, 10, 10)} m={GOLD} p={[px, 0.95, 0.3]} />
        </group>
      ))}

      {/* left arm: typing */}
      <group ref={armL} position={[-0.36, 1.12, 0]}>
        <P g={geo("c", 0.09, 0.09, 0.62, 10)} m={m.shirt} p={[0, -0.31, 0]} />
        <P g={geo("s", 0.09, 10, 10)} m={m.shirt} />
        <P g={geo("s", 0.12, 14, 12)} m={WHITE} p={[0, -0.66, 0]} />
        <P g={geo("c", 0.1, 0.1, 0.06, 14)} m={WHITE} p={[0, -0.58, 0]} />
      </group>

      {/* right arm: thumbs up (upper arm forward-down, forearm bent up) */}
      <group position={[0.36, 1.12, 0]} rotation={[-0.6, 0, 0]}>
        <P g={geo("c", 0.09, 0.09, 0.3, 10)} m={m.shirt} p={[0, -0.15, 0]} />
        <P g={geo("s", 0.09, 10, 10)} m={m.shirt} />
        <group ref={elbow} position={[0, -0.3, 0]} rotation={[-1.9, 0, 0]}>
          <P g={geo("c", 0.085, 0.085, 0.26, 10)} m={m.shirt} p={[0, -0.13, 0]} />
          <P g={geo("s", 0.1, 10, 10)} m={m.shirt} />
          <P g={geo("s", 0.12, 14, 12)} m={WHITE} p={[0, -0.32, 0]} />
          <mesh ref={thumb} geometry={geo("c", 0.04, 0.045, 0.14, 8)} material={WHITE} position={[0, -0.45, 0]} castShadow />
        </group>
      </group>

      {/* head */}
      <group ref={head} position={[0, 1.5, 0]}>
        <P g={geo("s", 0.27, 24, 18)} m={SK} s={[1.05, 0.95, 1]} />
        <P g={geo("s", 0.1, 14, 12)} m={NOSE} p={[0, -0.04, 0.27]} shadow={false} />
        {[-1, 1].map((sg) => <P key={sg} g={geo("s", 0.09, 14, 10)} m={MUST} p={[sg * 0.1, -0.13, 0.24]} s={[1.5, 0.55, 0.7]} r={[0, 0, sg * -0.25]} shadow={false} />)}
        <P g={SMILE} m={MOUTH} p={[0, -0.19, 0.175]} s={[1, 0.4, 1]} r={[0, 0, Math.PI]} shadow={false} />
        {[-1, 1].map((sg) => (
          <group key={sg}>
            <P g={geo("s", 0.06, 10, 8)} m={CHEEK} p={[sg * 0.16, -0.09, 0.2]} s={[1, 0.8, 0.6]} r={[0, sg * 0.5, 0]} shadow={false} />
            <P g={geo("s", 0.04, 8, 8)} m={MUST} p={[sg * 0.1, 0.165, 0.2]} s={[1.6, 0.4, 0.5]} r={[0, 0, sg * -0.2]} shadow={false} />
          </group>
        ))}
        {[-0.095, 0.095].map((px) => (
          <group key={px}>
            <P g={geo("s", 0.06, 12, 12)} m={EYEW} p={[px, 0.07, 0.235]} s={[0.8, 1.3, 0.5]} shadow={false} />
            <P g={geo("s", 0.032, 10, 10)} m={EYEB} p={[px, 0.065, 0.265]} s={[0.8, 1.2, 0.5]} shadow={false} />
          </group>
        ))}
        {[-0.27, 0.27].map((px) => <P key={px} g={geo("s", 0.07, 10, 10)} m={SK} p={[px, -0.03, 0]} shadow={false} />)}
        <P g={geo("s", 0.265, 18, 12)} m={m.hair} p={[0, 0, -0.08]} s={[1.02, 0.95, 0.9]} shadow={false} />
        {[-0.235, 0.235].map((px) => <P key={px} g={geo("s", 0.05, 8, 8)} m={m.hair} p={[px, 0, 0.1]} s={[0.5, 1.5, 0.8]} shadow={false} />)}
        <P g={CAP_DOME} m={m.cap} p={[0, 0.07, 0]} s={[1.07, 1.02, 1.08]} />
        <P g={geo("s", 0.26, 20, 10)} m={m.cap} p={[0, 0.1, 0.24]} s={[1, 0.2, 1]} r={[-0.15, 0, 0]} />
        <group position={[0, 0.22, 0.285]} rotation={[0.9, 0, 0]}>
          <P g={geo("c", 0.085, 0.085, 0.015, 20)} m={WHITE} shadow={false} />
          <P g={geo("c", 0.035, 0.035, 0.01, 4)} m={m.cap} p={[0, 0.009, 0]} shadow={false} />
        </group>
      </group>

      {/* desk + laptop (we see the glowing lid, hero faces the screen) */}
      <group position={[0, 0, 0.65]}>
        <P g={geo("b", 0.95, 0.06, 0.6)} m={WOOD} p={[0, 0.72, 0]} />
        {([[-0.42, -0.25], [0.42, -0.25], [-0.42, 0.25], [0.42, 0.25]] as [number, number][]).map(([a, b]) => (
          <P key={`${a}${b}`} g={geo("b", 0.06, 0.7, 0.06)} m={WOODD} p={[a, 0.35, b]} />
        ))}
        <group position={[0, 0.75, 0.02]} rotation={[0, Math.PI + yaw, 0]}>
          <P g={geo("b", 0.6, 0.03, 0.42)} m={LAP} p={[0, 0.015, 0]} />
          <P g={geo("b", 0.5, 0.006, 0.24)} m={KEYS} p={[0, 0.032, 0.04]} shadow={false} />
          <group position={[0, 0.03, -0.2]} rotation={[-0.35, 0, 0]}>
            <P g={geo("b", 0.6, 0.4, 0.025)} m={LAP} p={[0, 0.2, 0]} />
            <P g={PLANE_SCREEN} m={SCREEN} p={[0, 0.2, 0.014]} shadow={false} />
            <P g={PLANE_BACK} m={m.lid} p={[0, 0.2, -0.014]} r={[0, Math.PI, 0]} shadow={false} />
          </group>
        </group>
      </group>
    </group>
  );
}

/* ---- Chaos extras: day/night sky, power star, rainbow, coin rain, fireworks, click ripples ---- */
/* eslint-disable react-hooks/immutability */

let _glow: THREE.CanvasTexture | null | undefined;
function getGlow() {
  if (_glow === undefined) {
    _glow = makeTexture(64, (ctx, s) => {
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.35, "rgba(255,255,255,0.55)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
    });
    if (_glow) _glow.magFilter = THREE.LinearFilter;
  }
  return _glow;
}

const _o = new THREE.Object3D();
const _sky = new THREE.Color();
const _fc = new THREE.Color();
const SKY_COLS = ["#67c9ed", "#ff9a6b", "#14123a", "#f7b0d0"].map((c) => new THREE.Color(c));
const SKY_L = [1, 0.8, 0.3, 0.75];
const CAPS = ["#e52521", "#3fb24a", "#ffd34e", "#a24ad8", "#2876c7"];

/** Lights + stars + sky colour: day -> sunset -> night -> dawn (about 50s loop) */
function SkyCycle({ shadow, shadowMap }: { shadow: boolean; shadowMap: number }) {
  const { scene } = useThree();
  const amb = useRef<THREE.AmbientLight>(null);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const sun = useRef<THREE.DirectionalLight>(null);
  const starsMat = useRef<THREE.PointsMaterial>(null);
  const starPos = useMemo(() => {
    const a = new Float32Array(900);
    for (let i = 0; i < 300; i++) {
      const az = Math.random() * 6.28;
      const el = Math.random() * 1.3 + 0.1;
      a[i * 3] = Math.cos(az) * Math.cos(el) * 45;
      a[i * 3 + 1] = Math.sin(el) * 45;
      a[i * 3 + 2] = -Math.abs(Math.sin(az) * Math.cos(el) * 45) - 5;
    }
    return a;
  }, []);

  useFrame(({ clock }) => {
    const u = ((clock.getElapsedTime() * 0.02) % 1) * 4;
    const i = Math.floor(u);
    const f = u - i;
    const k = (i + 1) % 4;
    _sky.copy(SKY_COLS[i]).lerp(SKY_COLS[k], f);
    if (scene.background instanceof THREE.Color) scene.background.copy(_sky);
    if (scene.fog) scene.fog.color.copy(_sky);
    const L = SKY_L[i] + (SKY_L[k] - SKY_L[i]) * f;
    if (amb.current) amb.current.intensity = 1.4 * L;
    if (hemi.current) hemi.current.intensity = 1.2 * L;
    if (sun.current) sun.current.intensity = 3.2 * L;
    if (starsMat.current) starsMat.current.opacity = Math.max(0, (0.6 - L) / 0.4);
  });

  return (
    <>
      <ambientLight ref={amb} intensity={1.4} color="#fff3d0" />
      <hemisphereLight ref={hemi} color="#66c8f0" groundColor="#466b59" intensity={1.2} />
      <directionalLight
        ref={sun}
        position={[-4, 8, 5]}
        intensity={3.2}
        color="#fff1c2"
        castShadow={shadow}
        shadow-mapSize={[shadowMap, shadowMap]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={8}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0004}
      />
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPos, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={starsMat} color="#ffffff" size={0.4} map={getGlow() ?? undefined} transparent opacity={0} fog={false} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </>
  );
}

const STAR_GEO = (() => {
  const sh = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 0.42 : 0.95;
    const a = (i * Math.PI) / 5 + Math.PI / 2;
    if (i) sh.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    else sh.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  sh.closePath();
  return new THREE.ExtrudeGeometry(sh, { depth: 0.3, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 2 });
})();

function PowerStar() {
  const g = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Sprite>(null);
  const light = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (g.current) {
      g.current.position.y = 4 + Math.sin(t * 1.5) * 0.3;
      g.current.rotation.y = Math.sin(t * 0.9) * 0.7;
    }
    if (halo.current) halo.current.material.opacity = 0.6 + Math.sin(t * 5) * 0.25;
    if (light.current) light.current.intensity = 25 + Math.sin(t * 5) * 8;
  });
  return (
    <group ref={g} position={[0, 4, -3.5]} scale={1.3}>
      <mesh geometry={STAR_GEO} position={[0, 0, -0.15]}>
        <meshStandardMaterial color="#ffd34e" emissive="#ffb000" emissiveIntensity={0.9} metalness={0.4} roughness={0.25} />
      </mesh>
      {[-0.17, 0.17].map((x) => (
        <mesh key={x} position={[x, 0.05, 0.2]} scale={[0.7, 1.5, 0.5]}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
      ))}
      <sprite ref={halo} scale={[6, 6, 1]}>
        <spriteMaterial map={getGlow() ?? undefined} color="#ffe066" blending={THREE.AdditiveBlending} transparent depthWrite={false} fog={false} />
      </sprite>
      <pointLight ref={light} color="#ffd34e" intensity={25} distance={14} />
    </group>
  );
}

const RB = ["#ff3b30", "#ff9500", "#ffd60a", "#34c759", "#00c7ff", "#5856d6", "#bf5af2"];

function RainbowRoad() {
  const ref = useRef<THREE.Group>(null);
  const geos = useMemo(
    () =>
      RB.map((_, i) => {
        const pts = ([[-14, -1.5, -13], [-7, 3.8, -11], [0, 6, -10], [7, 3.8, -11], [14, -1.5, -13]] as V3[]).map(
          (p) => new THREE.Vector3(p[0], p[1] + i * 0.2, p[2]),
        );
        return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 80, 0.13, 8);
      }),
    [],
  );
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.6) * 0.2;
  });
  return (
    <group ref={ref}>
      {geos.map((geom, i) => (
        <mesh key={i} geometry={geom}>
          <meshBasicMaterial color={RB[i]} />
        </mesh>
      ))}
    </group>
  );
}

function CoinRain({ count }: { count: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geom = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.13, 0.13, 0.035, 14);
    g.rotateX(Math.PI / 2);
    return g;
  }, []);
  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 16,
        y: Math.random() * 9,
        z: (Math.random() - 0.5) * 5 - 1.5,
        v: 1 + Math.random() * 1.5,
        r: Math.random() * 6,
      })),
    [count],
  );
  useFrame(({ clock }, delta) => {
    const m = ref.current;
    if (!m) return;
    const t = clock.getElapsedTime();
    const dt = Math.min(delta, 0.05);
    data.forEach((c, i) => {
      c.y -= c.v * dt;
      if (c.y < -0.3) {
        c.y = 9;
        c.x = (Math.random() - 0.5) * 16;
      }
      _o.position.set(c.x, c.y, c.z);
      _o.rotation.set(0, t * 3 + c.r, 0);
      _o.updateMatrix();
      m.setMatrixAt(i, _o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[geom, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial color="#ffd34e" emissive="#e99419" emissiveIntensity={0.5} metalness={0.6} roughness={0.25} />
    </instancedMesh>
  );
}

/** Auto fireworks in the sky (click does NOT trigger these) */
function Fireworks({ count }: { count: number }) {
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const d = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) pos[i * 3 + 1] = -999;
    return {
      pos,
      col: new Float32Array(count * 3),
      base: new Float32Array(count * 3),
      vel: new Float32Array(count * 3),
      life: new Float32Array(count),
      next: 0,
      timer: 1,
    };
  }, [count]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const { pos, col, base, vel, life } = d;
    d.timer -= dt;
    if (d.timer <= 0) {
      d.timer = 0.6 + Math.random() * 0.9;
      const cx = (Math.random() - 0.5) * 14;
      const cy = 2.5 + Math.random() * 4;
      const cz = -3 - Math.random() * 5;
      const hue = Math.random();
      for (let n = 0; n < 140; n++) {
        const i = d.next++ % count;
        const a = Math.random() * 6.283;
        const b = Math.acos(2 * Math.random() - 1);
        const s = 2 + Math.random() * 3.2;
        pos[i * 3] = cx;
        pos[i * 3 + 1] = cy;
        pos[i * 3 + 2] = cz;
        vel[i * 3] = Math.sin(b) * Math.cos(a) * s;
        vel[i * 3 + 1] = Math.cos(b) * s;
        vel[i * 3 + 2] = Math.sin(b) * Math.sin(a) * s;
        _fc.setHSL(n % 3 ? hue : (hue + 0.5) % 1, 1, 0.6);
        base[i * 3] = _fc.r;
        base[i * 3 + 1] = _fc.g;
        base[i * 3 + 2] = _fc.b;
        life[i] = 1.3 + Math.random() * 0.9;
      }
    }
    for (let i = 0; i < count; i++) {
      if (life[i] <= 0) continue;
      life[i] -= dt;
      if (life[i] <= 0) {
        pos[i * 3 + 1] = -999;
        continue;
      }
      vel[i * 3 + 1] -= 2.6 * dt;
      for (let k = 0; k < 3; k++) {
        pos[i * 3 + k] += vel[i * 3 + k] * dt;
        vel[i * 3 + k] *= 0.985;
      }
      const f = Math.min(1, life[i]);
      col[i * 3] = base[i * 3] * f;
      col[i * 3 + 1] = base[i * 3 + 1] * f;
      col[i * 3 + 2] = base[i * 3 + 2] * f;
    }
    const g = geoRef.current;
    if (g) {
      g.attributes.position.needsUpdate = true;
      g.attributes.color.needsUpdate = true;
    }
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[d.pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[d.col, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.28} map={getGlow() ?? undefined} vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} fog={false} />
    </points>
  );
}

/** Click anywhere on the page -> golden shockwave ring on the platform (no jumping) */
function Ripples() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const age = useRef<number[]>([9, 9, 9]);
  const next = useRef(0);

  useEffect(() => {
    const onDown = () => {
      age.current[next.current] = 0;
      next.current = (next.current + 1) % 3;
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    refs.current.forEach((m, i) => {
      if (!m) return;
      age.current[i] += dt;
      const a = age.current[i];
      m.visible = a < 1.25;
      if (m.visible) {
        m.scale.setScalar(1 + a * 9);
        (m.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - a * 0.8);
      }
    });
  });

  return (
    <>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.38, 0]} visible={false}>
          <ringGeometry args={[0.9, 1, 64]} />
          <meshBasicMaterial color="#ffe066" transparent side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* World                                                               */
/* ------------------------------------------------------------------ */

export default function RetroWorld({
  deviceTier,
  track,
}: {
  deviceTier: "mobile" | "tablet" | "desktop";
  track: "codestellation" | "decode";
}) {
  const detail = deviceTier === "mobile" ? 0 : deviceTier === "tablet" ? 1 : 2;
  const shadowMap = deviceTier === "desktop" ? 2048 : 512;

  return (
    <group>
      <SkyCycle shadow={deviceTier === "desktop"} shadowMap={shadowMap} />

      {/* sky-colored floor far below */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, -2]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#8fd7eb" roughness={1} />
      </mesh>

      {/* background hills */}
      <Hill position={[-6, -1.25, -7]} scale={[3.2, 2.2, 2]} color="#4fb54a" />
      <Hill position={[5.5, -1.25, -8]} scale={[4, 3, 2.5]} color="#3fa046" />
      {detail > 0 && <Hill position={[-1, -1.25, -10]} scale={[3, 1.8, 2]} color="#5cc455" />}

      {/* floating island */}
      <Float speed={0.2} rotationIntensity={0} floatIntensity={0.1}>
        <group position={[-4.4, 2.9, -6.5]}>
          <mesh>
            <sphereGeometry args={[1.8, 16, 10]} />
            <meshStandardMaterial color="#86c65e" />
          </mesh>
          <mesh position={[1.5, -0.35, 0]}>
            <sphereGeometry args={[1.25, 16, 10]} />
            <meshStandardMaterial color="#70ad58" />
          </mesh>
        </group>
      </Float>

      {/* ground + platforms */}
      <Platform position={[0, -0.9, 0]} size={[14, 0.7, 6]} dirt />
      <Platform position={[-4, 0.5, -1.8]} size={[2.8, 0.45, 1.8]} dirt />
      <Platform position={[3.7, 1.15, -2.6]} size={[3.2, 0.45, 1.8]} dirt />

      {/* blocks */}
      <QuestionBlock position={[-2.5, 1.65, -1.6]} />
      <QuestionBlock position={[1.8, 2.15, -2.5]} />
      <BrickBlock position={[-1.45, 1.55, -1.8]} />
      {detail > 0 && (
        <>
          <BrickBlock position={[-0.8, 1.55, -1.8]} />
          <BrickBlock position={[-0.15, 1.55, -1.8]} />
        </>
      )}

      {/* pipes */}
      <Pipe position={[5, -0.2, -2.3]} />
      {detail > 0 && <Pipe position={[-5.6, -0.1, -2.6]} height={1.5} />}

      {/* coins */}
      <Coin position={[-3.5, 1.65, -1.7]} />
      <Coin position={[-2.9, 1.65, -1.7]} />
      <Coin position={[3.2, 2.2, -2.5]} />
      <Coin position={[4.2, 2.2, -2.5]} />

      {/* power-up mushrooms */}
      <Mushroom position={[0.1, -0.41, 1.1]} scale={0.9} rotationY={0.2} />
      <Mushroom position={[-4, 0.87, -1.8]} scale={0.75} rotationY={0.1} />
      <Mushroom position={[3.7, 1.52, -2.6]} scale={0.7} capColor="#3fb24a" rotationY={-0.2} />
      {detail > 0 && <Mushroom position={[4.4, -0.41, 1.0]} scale={0.7} rotationY={-0.4} />}
      {detail > 0 &&
        Array.from({ length: 9 }, (_, i) => (
          <Mushroom key={i} position={[-6 + i * 1.5, -0.41, 2.3 + Math.sin(i * 0.7) * 0.4]} scale={0.55} capColor={CAPS[i % 5]} rotationY={Math.sin(i) * 0.4} />
        ))}
      {detail > 1 && (
        <>
          <Mushroom position={[-11, -1.3, -6]} scale={5} rotationY={0.4} />
          <Mushroom position={[11, -1.3, -9]} scale={7} capColor="#3fb24a" rotationY={-0.4} />
        </>
      )}

      {/* the hero */}
      <CodeHero x={-2.4} shirt="#e52521" over="#2a56d0" hair="#4a2511" ry={0.3} yaw={0.2} active={track === "codestellation"} />
      <CodeHero x={2.4} shirt="#2876c7" over="#c8302a" hair="#1d1208" ry={-0.3} yaw={-0.2} active={track === "decode"} />

      {/* greenery */}
      <Bush position={[-3.2, -0.41, -1.8]} scale={1.1} />
      {detail > 0 && <Bush position={[5.8, -0.41, -0.6]} scale={1.2} />}

      {/* clouds */}
      <Cloud position={[-5, 3.9, -5]} scale={1.3} />
      {detail > 0 && <Cloud position={[5.2, 4.4, -7]} scale={1.6} />}
      {detail > 1 && <Cloud position={[0.5, 5.2, -9]} scale={1.8} />}

      <PowerStar />
      <RainbowRoad />
      {detail > 0 && <CoinRain count={detail === 1 ? 40 : 90} />}
      {detail > 0 && <Fireworks count={detail === 1 ? 800 : 1600} />}
      <Ripples />

      <Sparkles
        count={detail === 0 ? 16 : detail === 1 ? 36 : 70}
        scale={[14, 6, 12]}
        size={detail === 0 ? 1 : 1.5}
        color="#fff6b7"
        speed={0.25}
      />
    </group>
  );
}