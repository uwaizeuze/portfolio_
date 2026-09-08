"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aiAutomationPillars } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Animated flow icons ─────────────────────────────── */
function IconAI() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
      <path d="M13 20 L20 13 L27 20 L20 27 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      <circle cx="20" cy="13" r="1.5" fill="currentColor" />
      <circle cx="20" cy="27" r="1.5" fill="currentColor" />
      <circle cx="13" cy="20" r="1.5" fill="currentColor" />
      <circle cx="27" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconRAG() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <ellipse cx="20" cy="12" rx="12" ry="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12 L8 22 C8 24.76 13.37 27 20 27 C26.63 27 32 24.76 32 22 L32 12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 17 C8 19.76 13.37 22 20 22 C26.63 22 32 19.76 32 17" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 20 L24 20 M18 23 L22 23" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconAutomation() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="22" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6" y="22" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="22" y="22" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 12 L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 18 L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 18 L28 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 28 L22 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── AI Flow Node ─────────────────────────────────────── */
function FlowNode({
  label,
  sublabel,
  color,
  delay,
  icon,
  inView,
}: {
  label: string;
  sublabel: string;
  color: string;
  delay: number;
  icon: React.ReactNode;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 24 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center gap-3 text-center"
    >
      {/* Node circle */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 backdrop-blur-sm shadow-lg"
        style={{
          borderColor: color,
          color,
          background: `color-mix(in srgb, ${color} 8%, var(--surface))`,
          boxShadow: `0 0 24px color-mix(in srgb, ${color} 20%, transparent)`,
        }}
      >
        {/* Outer ring pulse */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${color}` }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
        />
        {icon}
      </motion.div>

      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color }}>
          {label}
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-[var(--muted)]">{sublabel}</p>
      </div>
    </motion.div>
  );
}

/* ── Animated connector beam ─────────────────────────── */
function BeamConnector({
  color,
  delay,
  inView,
}: {
  color: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: delay + 0.3, duration: 0.5 }}
      className="relative hidden flex-1 md:flex items-center mx-3"
    >
      {/* Track line */}
      <div
        className="h-px w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }}
      />
      {/* Traveling dot */}
      {inView && (
        <motion.div
          className="absolute h-2.5 w-2.5 rounded-full shadow-lg"
          style={{
            background: color,
            boxShadow: `0 0 8px ${color}`,
            top: "50%",
            translateY: "-50%",
          }}
          animate={{ left: ["0%", "100%"] }}
          transition={{
            duration: 2.2,
            delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
      {/* Arrow tip */}
      <svg
        className="absolute right-0 -translate-y-1/2 top-1/2"
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        style={{ color }}
      >
        <path d="M1 1 L7 6 L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

/* ── Pillar card icons ─────────────────────────────────── */
function getIcon(iconName: string) {
  switch (iconName) {
    case "sparkles":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case "database":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "bot":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16" />
          <line x1="16" y1="16" x2="16" y2="16" />
        </svg>
      );
    case "cpu":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
        </svg>
      );
    default:
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
  }
}

export function AiWorkflow() {
  const [activePillar, setActivePillar] = useState<string>(aiAutomationPillars[0].id);
  const flowRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const flowInView = useInView(flowRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!pillarsRef.current) return;
    const cards = pillarsRef.current.querySelectorAll(".pillar-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 36, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pillarsRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  const flowNodes = [
    {
      label: "AI",
      sublabel: "Agents & LLMs",
      color: "#00f0ff",
      delay: 0.1,
      icon: <IconAI />,
    },
    {
      label: "RAG",
      sublabel: "Vector Retrieval",
      color: "#b46fff",
      delay: 0.35,
      icon: <IconRAG />,
    },
    {
      label: "Automation",
      sublabel: "API Pipelines",
      color: "#34e89e",
      delay: 0.6,
      icon: <IconAutomation />,
    },
  ];

  return (
    <section id="ai-automation" className="relative section-padding overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[120px]" />

      <div className="section-container">
        <SectionHeading
          label="AI & Automation"
          title="Pragmatic AI & Workflow Engineering"
          description="Integrating intelligent capabilities, RAG pipelines, and automated workflows directly into production React and Next.js applications."
          align="center"
        />

        {/* ── 3-Node Flow: AI → RAG → Automation ── */}
        <div
          ref={flowRef}
          className="mx-auto mt-12 max-w-2xl"
        >
          <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 px-6 py-8 backdrop-blur-sm">
            {/* Label */}
            <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
              Production Workflow
            </p>

            {/* Nodes + Connectors */}
            <div className="flex items-center justify-between">
              <FlowNode {...flowNodes[0]} inView={flowInView} />
              <BeamConnector color="#00f0ff" delay={0.5} inView={flowInView} />
              <FlowNode {...flowNodes[1]} inView={flowInView} />
              <BeamConnector color="#b46fff" delay={1.1} inView={flowInView} />
              <FlowNode {...flowNodes[2]} inView={flowInView} />
            </div>

            {/* Mobile vertical flow */}
            <div className="mt-6 flex flex-col items-center gap-1 md:hidden">
              {flowNodes.map((n, i) => (
                <div key={n.label} className="flex flex-col items-center">
                  <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)]/60 px-4 py-3 w-52 justify-center">
                    <span style={{ color: n.color }}>{n.icon}</span>
                    <div>
                      <p className="font-mono text-xs font-bold" style={{ color: n.color }}>{n.label}</p>
                      <p className="font-mono text-[10px] text-[var(--muted)]">{n.sublabel}</p>
                    </div>
                  </div>
                  {i < flowNodes.length - 1 && (
                    <div className="h-6 w-px bg-gradient-to-b from-[var(--accent)] to-purple-400 opacity-50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 5 Pillars Grid ── */}
        <div
          ref={pillarsRef}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {aiAutomationPillars.map((pillar, idx) => {
            const isSelected = activePillar === pillar.id;
            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                data-cursor="pointer"
                className={`pillar-card gradient-border-card relative flex flex-col justify-between cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
                  isSelected
                    ? "border-[var(--accent)] bg-[var(--surface)] shadow-lg shadow-[var(--accent)]/10"
                    : "border-[var(--border)] bg-[var(--surface)]/70 hover:border-[var(--accent)]/40 hover:bg-[var(--surface)]"
                } ${idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                style={{ opacity: 0 }} // GSAP will animate in
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 hover:scale-110"
                      style={{
                        background: `color-mix(in srgb, var(--accent) 10%, transparent)`,
                        color: "var(--accent)",
                      }}
                    >
                      {getIcon(pillar.icon)}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                      Pillar 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-[var(--foreground)]">
                    {pillar.title}
                  </h3>
                  <div className="mt-0.5 font-mono text-xs font-medium text-[var(--accent)]">
                    {pillar.tagline}
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--border)]/60 pt-3.5">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-0.5 font-mono text-[10px] text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="pillar-selected"
                    className="absolute inset-0 rounded-2xl"
                    style={{ boxShadow: "inset 0 0 0 1px var(--accent)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Production Highlight */}
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-4 text-center">
          <p className="text-xs text-[var(--muted)]">
            <span className="font-semibold text-[var(--foreground)]">Production Proven:</span>{" "}
            Implemented AI-driven placeholder extraction and automated variable generation in production for the{" "}
            <a href="#projects" className="font-medium text-[var(--accent)] hover:underline">
              Legacy Assurance
            </a>{" "}
            document platform.
          </p>
        </div>
      </div>
    </section>
  );
}
