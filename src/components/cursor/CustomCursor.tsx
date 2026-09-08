"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const cursorX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const ringX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.8 });

  const addParticle = useCallback((x: number, y: number) => {
    const id = particleId.current++;
    const particle: Particle = {
      id,
      x,
      y,
      opacity: 0.6,
      size: Math.random() * 4 + 2,
    };
    setParticles((prev) => [...prev.slice(-20), particle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    document.body.classList.add("interactive");

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      if (Math.random() > 0.6) {
        addParticle(e.clientX, e.clientY);
      }
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor='pointer'], input, textarea, select, label");
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.body.classList.remove("interactive");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
    };
  }, [isTouch, cursorX, cursorY, ringX, ringY, addParticle]);

  if (isTouch) return null;

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed z-[9998] rounded-full bg-[var(--accent)]"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: particle.opacity, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovering ? 56 : isClicking ? 32 : 40,
          height: isHovering ? 56 : isClicking ? 32 : 40,
          borderRadius: isHovering ? "12px" : "50%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div
          className="h-full w-full border border-white/80"
          style={{ borderRadius: "inherit" }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-[var(--accent)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 6 : isClicking ? 4 : 8,
          height: isHovering ? 6 : isClicking ? 4 : 8,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </>
  );
}
