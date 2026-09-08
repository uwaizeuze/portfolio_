"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { skills } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Split 19 skills into 3 concentric orbital rings designed to fit within viewport height
const ring1Skills = ["React.js", "Next.js", "TypeScript", "Tailwind CSS"];
const ring2Skills = ["Redux Toolkit", "Zustand", "React Query", "Context API", "JavaScript", "HTML5", "CSS3"];
const ring3Skills = ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth", "Axios", "Git", "Bootstrap"];

function OrbitBadge({
  skill,
  index,
  total,
  radius,
  offsetAngle = 0,
}: {
  skill: string;
  index: number;
  total: number;
  radius: number;
  offsetAngle?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const angle = (index / total) * Math.PI * 2 + offsetAngle;
  const baseX = Math.cos(angle) * radius;
  const baseY = Math.sin(angle) * radius;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 + index * 0.03, duration: 0.4, type: "spring" }}
      style={{
        x: springX,
        y: springY,
        left: `calc(50% + ${baseX.toFixed(2)}px)`,
        top: `calc(50% + ${baseY.toFixed(2)}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3 + (index % 3),
          ease: "easeInOut",
          delay: index * 0.2,
        }}
        whileHover={{ scale: 1.15, zIndex: 30 }}
        data-cursor="pointer"
        className="skill-badge group flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--surface)]/95 px-2.5 py-1 shadow-sm backdrop-blur-md transition-all hover:shadow-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] transition-transform group-hover:scale-125" />
        <span className="font-mono text-[11px] font-medium text-[var(--foreground)] group-hover:text-[var(--accent)]">
          {skill}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const [viewMode, setViewMode] = useState<"constellation" | "grid">("constellation");

  return (
    <section id="skills" className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden py-10 sm:py-14">
      {/* Background radial ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[450px] w-[450px] rounded-full bg-[var(--accent)]/5 blur-[100px]" />

      <div className="section-container flex w-full flex-col items-center justify-center text-center">
        {/* Compact Centered Heading */}
        <SectionHeading
          label="Skills"
          title="Technology Constellation"
          description="A production-tested frontend and full-stack toolkit engineered for scalability and clean architecture."
          align="center"
          className="mb-4 sm:mb-5 max-w-xl mx-auto"
        />

        {/* View Mode Switcher */}
        <div className="hidden items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 p-1 md:inline-flex mb-2">
          <button
            onClick={() => setViewMode("constellation")}
            data-cursor="pointer"
            className={`rounded-lg px-3 py-1 font-mono text-[11px] transition-all ${
              viewMode === "constellation"
                ? "bg-[var(--accent)] text-black font-semibold shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Constellation View
          </button>
          <button
            onClick={() => setViewMode("grid")}
            data-cursor="pointer"
            className={`rounded-lg px-3 py-1 font-mono text-[11px] transition-all ${
              viewMode === "grid"
                ? "bg-[var(--accent)] text-black font-semibold shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Grid Matrix
          </button>
        </div>

        {/* ── Constellation View (Desktop & Tablet) ── */}
        <div className="w-full flex justify-center items-center">
          {viewMode === "constellation" ? (
            <div className="relative hidden h-[450px] w-full max-w-[520px] items-center justify-center md:flex">
              
              {/* Concentric SVG Guide Circles */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-25">
                <circle cx="50%" cy="50%" r="85" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="50%" cy="50%" r="145" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="50%" cy="50%" r="205" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
              </svg>

              {/* Center Core Nucleus */}
              <div className="relative z-20 flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-[var(--accent)]/50 bg-[var(--surface)] shadow-lg shadow-[var(--accent)]/15 backdrop-blur-xl">
                <div className="absolute -inset-1 rounded-full border border-[var(--accent)]/30 animate-ping opacity-25" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">CORE</span>
                <span className="font-mono text-xs font-bold text-[var(--accent)]">STACK</span>
                <span className="font-mono text-[8px] text-[var(--muted)]">4+ Yrs</span>
              </div>

              {/* Ring 1 (Core - 4 items: React, Next, TS, Tailwind) */}
              {ring1Skills.map((skill, i) => (
                <OrbitBadge
                  key={skill}
                  skill={skill}
                  index={i}
                  total={ring1Skills.length}
                  radius={85}
                  offsetAngle={0.4}
                />
              ))}

              {/* Ring 2 (State & Architecture - 7 items) */}
              {ring2Skills.map((skill, i) => (
                <OrbitBadge
                  key={skill}
                  skill={skill}
                  index={i}
                  total={ring2Skills.length}
                  radius={145}
                  offsetAngle={0.2}
                />
              ))}

              {/* Ring 3 (Backend & Full-Stack - 8 items) */}
              {ring3Skills.map((skill, i) => (
                <OrbitBadge
                  key={skill}
                  skill={skill}
                  index={i}
                  total={ring3Skills.length}
                  radius={205}
                  offsetAngle={0.1}
                />
              ))}
            </div>
          ) : (
            /* Grid View */
            <div className="mx-auto hidden max-w-2xl flex-wrap justify-center gap-2.5 py-6 md:flex">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="skill-badge rounded-xl border border-[var(--border)] bg-[var(--surface)]/90 px-3.5 py-2 font-mono text-xs font-medium text-[var(--foreground)] shadow-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          )}

          {/* ── Responsive Mobile Grid ── */}
          <div className="flex flex-wrap justify-center gap-2 px-4 py-4 md:hidden">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)]/90 px-3 py-1 font-mono text-xs text-[var(--foreground)] shadow-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
