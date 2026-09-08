"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function LoadingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.7;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 4]} />
      <MeshDistortMaterial
        color="#00f0ff"
        emissive="#00f0ff"
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={0.9}
        distort={0.4}
        speed={3}
      />
    </mesh>
  );
}

export function LoadingScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: 120, height: 120 }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00f0ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#6366f1" />
      <LoadingOrb />
    </Canvas>
  );
}
