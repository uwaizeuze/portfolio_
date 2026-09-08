"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap } from "gsap";
import { personalInfo, shortSummary } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { splitName } from "@/lib/utils";

const SceneCanvas = dynamic(
  () => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas),
  { ssr: false }
);

export function Hero() {
  const { first, last } = splitName(personalInfo.name);
  const firstRef = useRef<HTMLSpanElement>(null);
  const lastRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Photo badge entrance
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.7, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, delay: 0.1 }
      );

      // Name lines clip-reveal
      tl.fromTo(
        firstRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.75 },
        "-=0.4"
      );
      tl.fromTo(
        lastRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.75 },
        "-=0.5"
      );

      // Subtitle + summary fade-slide
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.35"
      );
      tl.fromTo(
        summaryRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <SceneCanvas className="h-full w-full" shapeCount={8} />
      </div>

      {/* Gradient vignette overlay */}
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-b from-[var(--background)]/20 via-transparent to-[var(--background)]" />

      {/* Subtle radial glow behind content */}
      <div className="pointer-events-none absolute inset-0 -z-[4]"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, color-mix(in srgb, var(--accent) 5%, transparent), transparent 70%)"
        }}
      />

      <div className="section-container px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* ── LAYOUT: photo left on lg, stacked on mobile ── */}
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">

            {/* ── PHOTO ── */}
            <div ref={badgeRef} style={{ opacity: 0 }} className="relative shrink-0">
              {/* Animated conic gradient ring */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, var(--accent), #b46fff, #34e89e, var(--accent))",
                  filter: "blur(2px)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Breathing glow */}
              <motion.div
                className="absolute -inset-6 rounded-full opacity-30"
                style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)", filter: "blur(20px)" }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.45, 0.2] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Photo frame */}
              <div className="relative h-44 w-44 overflow-hidden rounded-full border-2 border-[var(--accent)]/40 sm:h-52 sm:w-52 animate-glow-pulse">
                <Image
                  src="/avatar.jpg"
                  alt="Owais Ahmad — Software Engineer"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 300 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--surface)]/90 px-3 py-1 backdrop-blur-sm shadow-lg"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">
                  Available for Work
                </span>
              </motion.div>
            </div>

            {/* ── TEXT CONTENT ── */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                <span
                  ref={firstRef}
                  style={{ opacity: 0 }}
                  className="block text-[var(--foreground)]"
                >
                  {first}
                </span>
                {last && (
                  <span
                    ref={lastRef}
                    style={{ opacity: 0 }}
                    className="block text-gradient"
                  >
                    {last}
                  </span>
                )}
              </h1>

              <p
                ref={subtitleRef}
                style={{ opacity: 0 }}
                className="mx-auto mt-5 max-w-2xl font-mono text-sm uppercase tracking-wider text-[var(--accent)] lg:mx-0 sm:text-base"
              >
                {personalInfo.title}
              </p>

              <p
                ref={summaryRef}
                style={{ opacity: 0 }}
                className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] lg:mx-0 sm:text-lg"
              >
                {shortSummary}
              </p>

              <div
                ref={ctaRef}
                style={{ opacity: 0 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
              >
                <MagneticButton strength={0.4}>
                  <Button href="#projects" size="lg">
                    View Projects
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.4}>
                  <Button href="#contact" variant="secondary" size="lg">
                    Get in Touch
                  </Button>
                </MagneticButton>
              </div>

              {/* Tech stack quick-badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
              >
                {["React.js", "Next.js", "TypeScript", "Node.js", "AI/LLM"].map((tech) => (
                  <span
                    key={tech}
                    className="skill-badge rounded-full border border-[var(--border)] bg-[var(--surface)]/70 px-3 py-1 font-mono text-[11px] text-[var(--muted)] backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ── SCROLL HINT ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-20 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
                Scroll
              </span>
              <div className="h-10 w-px bg-gradient-to-b from-[var(--accent)] to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
