"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  scale?: number;
  color: string;
  emissive: string;
  speed?: number;
  distort?: number;
  geometry: "sphere" | "box" | "torus" | "octahedron";
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

function ShapeGeometry({ geometry }: { geometry: FloatingShapeProps["geometry"] }) {
  switch (geometry) {
    case "box":
      return <boxGeometry args={[1, 1, 1]} />;
    case "torus":
      return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
    case "octahedron":
      return <octahedronGeometry args={[0.6, 0]} />;
    default:
      return <icosahedronGeometry args={[0.6, 1]} />;
  }
}

export function FloatingShape({
  position,
  scale = 1,
  color,
  emissive,
  speed = 1,
  distort = 0.3,
  geometry,
  mouse,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;

    targetRotation.current.x = mouse.current.y * 0.3;
    targetRotation.current.y = mouse.current.x * 0.3;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x + state.clock.elapsedTime * 0.1 * speed,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.current.y + state.clock.elapsedTime * 0.15 * speed,
      0.05
    );

    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.15;
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <ShapeGeometry geometry={geometry} />
        <MeshDistortMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

interface FloatingShapesProps {
  isDark: boolean;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  count?: number;
}

const SHAPE_LAYOUT = [
  { position: [-2.8, 1.2, -1.5] as [number, number, number], scale: 0.55, speed: 0.7, distort: 0.28, geometry: "sphere" as const },
  { position: [3.1, -0.8, -2.2] as [number, number, number], scale: 0.42, speed: 1.1, distort: 0.35, geometry: "box" as const },
  { position: [-1.4, -1.6, -0.8] as [number, number, number], scale: 0.48, speed: 0.9, distort: 0.22, geometry: "torus" as const },
  { position: [2.2, 1.8, -1.1] as [number, number, number], scale: 0.38, speed: 1.3, distort: 0.4, geometry: "octahedron" as const },
  { position: [-3.4, -0.3, -2.8] as [number, number, number], scale: 0.5, speed: 0.6, distort: 0.31, geometry: "box" as const },
  { position: [0.6, 2.1, -1.9] as [number, number, number], scale: 0.45, speed: 1.0, distort: 0.26, geometry: "sphere" as const },
  { position: [3.6, 0.5, -0.5] as [number, number, number], scale: 0.52, speed: 0.8, distort: 0.33, geometry: "octahedron" as const },
  { position: [-0.8, -2.0, -2.5] as [number, number, number], scale: 0.4, speed: 1.2, distort: 0.38, geometry: "torus" as const },
];

export function FloatingShapes({ isDark, mouse, count = 6 }: FloatingShapesProps) {
  const accent = isDark ? "#00f0ff" : "#0ea5e9";
  const secondary = isDark ? "#6366f1" : "#8b5cf6";

  const shapes = useMemo(
    () =>
      SHAPE_LAYOUT.slice(0, count).map((layout, i) => ({
        ...layout,
        color: i % 2 === 0 ? accent : secondary,
        emissive: i % 2 === 0 ? accent : secondary,
      })),
    [count, accent, secondary]
  );

  return (
    <>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} mouse={mouse} />
      ))}
    </>
  );
}
