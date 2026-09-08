"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  isDark: boolean;
}

export function ParticleField({ count = 700, mouse, isDark }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Accent color: cyan in dark, sky-blue in light
    const accent = isDark
      ? new THREE.Color("#00f0ff")
      : new THREE.Color("#0ea5e9");
    const secondary = isDark
      ? new THREE.Color("#6366f1")
      : new THREE.Color("#8b5cf6");
    const tertiary = isDark
      ? new THREE.Color("#34e89e")
      : new THREE.Color("#10b981");

    const palette = [accent, secondary, tertiary];

    for (let i = 0; i < count; i++) {
      // Spread particles across a wide volume
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, colors };
  }, [count, isDark]);

  // Store individual drift velocities
  useMemo(() => {
    const vels = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      vels[i * 3] = (Math.random() - 0.5) * 0.002;
      vels[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    velocitiesRef.current = vels;
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const vels = velocitiesRef.current;
    if (!vels) return;

    const t = clock.elapsedTime;
    const mx = mouse.current.x * 0.8;
    const my = mouse.current.y * 0.8;

    for (let i = 0; i < count; i++) {
      // Drift
      pos[i * 3] += vels[i * 3];
      pos[i * 3 + 1] += vels[i * 3 + 1];
      pos[i * 3 + 2] += vels[i * 3 + 2];

      // Subtle wave
      pos[i * 3 + 1] += Math.sin(t * 0.3 + i * 0.1) * 0.0008;
      pos[i * 3] += Math.cos(t * 0.2 + i * 0.08) * 0.0005;

      // Wrap particles within bounds
      if (pos[i * 3] > 7) pos[i * 3] = -7;
      if (pos[i * 3] < -7) pos[i * 3] = 7;
      if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -5;
      if (pos[i * 3 + 1] < -5) pos[i * 3 + 1] = 5;
    }

    geo.attributes.position.needsUpdate = true;

    // Mouse-follow gentle group rotation
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      mx * 0.15,
      0.03
    );
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      -my * 0.1,
      0.03
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.028 : 0.022}
        vertexColors
        transparent
        opacity={isDark ? 0.65 : 0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
