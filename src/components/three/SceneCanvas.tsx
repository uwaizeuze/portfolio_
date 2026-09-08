"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { Environment, Stars } from "@react-three/drei";
import * as THREE from "three";
import { FloatingShapes } from "./FloatingShapes";
import { ParticleField } from "./ParticleField";
import { useMounted } from "@/hooks/useMounted";

interface SceneCanvasProps {
  className?: string;
  shapeCount?: number;
}

function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  useFrame(({ camera }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 0.6, 0.025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.current.y * 0.4, 0.025);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function SceneContent({
  isDark,
  mouse,
  shapeCount,
}: {
  isDark: boolean;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  shapeCount: number;
}) {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(clock.elapsedTime * 0.3) * 3;
      lightRef.current.position.z = Math.cos(clock.elapsedTime * 0.3) * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={isDark ? 0.15 : 0.45} />
      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={isDark ? 1.2 : 0.8}
        color={isDark ? "#00f0ff" : "#0ea5e9"}
      />
      <pointLight
        position={[-5, -3, -5]}
        intensity={0.5}
        color={isDark ? "#6366f1" : "#8b5cf6"}
      />
      <pointLight
        position={[4, 2, 2]}
        intensity={0.3}
        color={isDark ? "#34e89e" : "#10b981"}
      />

      {/* Particle field — the main atmospheric element */}
      <ParticleField count={600} mouse={mouse} isDark={isDark} />

      {/* Stars only in dark mode, behind everything */}
      {isDark && (
        <Stars radius={60} depth={60} count={1200} factor={2.2} fade speed={0.4} />
      )}

      <FloatingShapes isDark={isDark} mouse={mouse} count={shapeCount} />
      <Environment preset={isDark ? "night" : "city"} />
      <CameraRig mouse={mouse} />
    </>
  );
}

export function SceneCanvas({ className, shapeCount = 6 }: SceneCanvasProps) {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const isDark = mounted ? resolvedTheme === "dark" : true;
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent isDark={isDark} mouse={mouse} shapeCount={shapeCount} />
        </Suspense>
      </Canvas>
    </div>
  );
}
