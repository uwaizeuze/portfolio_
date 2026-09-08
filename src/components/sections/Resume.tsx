"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  experience,
  skills,
  categorizedSkills,
  education,
  projects,
  summary,
  personalInfo,
} from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

type ResumeTab = "experience" | "skills" | "projects" | "education";

/* ── Skill level → bar width ─────────────────────────── */
const levelWidth: Record<string, string> = {
  Expert: "95%",
  Advanced: "80%",
  Proficient: "65%",
};

/* ── Animated Skill Bar ───────────────────────────────── */
function SkillBar({
  name,
  level,
  years,
  color = "var(--accent)",
  delay = 0,
}: {
  name: string;
  level: string;
  years?: string;
  color?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const width = levelWidth[level] ?? "60%";

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <span className="font-medium text-[var(--foreground)]">{name}</span>
        <div className="flex items-center gap-2 font-mono text-xs">
          {years && <span className="text-[var(--muted)]">{years}</span>}
          <span
            className="rounded px-2 py-0.5 font-semibold text-[10px]"
            style={{
              background: `color-mix(in srgb, ${color} 12%, transparent)`,
              color,
            }}
          >
            {level}
          </span>
        </div>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 60%, #6366f1))`,
            transitionDelay: inView ? `${delay}s` : "0s",
          }}
        />
      </div>
    </div>
  );
}

/* ── Timeline Experience Card ─────────────────────────── */
function ExperienceCard({
  item,
  index,
  isLast,
}: {
  item: (typeof experience)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-12"
    >
      {/* Timeline vertical line */}
      {!isLast && (
        <div
          className="absolute left-5 top-12 bottom-0 w-px"
          style={{
            background: "linear-gradient(to bottom, var(--accent), color-mix(in srgb, var(--accent) 10%, transparent))",
          }}
        />
      )}

      {/* Timeline dot */}
      <div className="absolute left-3 top-6 flex h-4 w-4 items-center justify-center">
        <motion.div
          animate={inView ? { scale: [0, 1.3, 1] } : {}}
          transition={{ delay: index * 0.12 + 0.2, duration: 0.4, type: "spring" }}
          className="h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--background)] shadow-md"
          style={{ boxShadow: "0 0 8px color-mix(in srgb, var(--accent) 40%, transparent)" }}
        />
      </div>

      {/* Card */}
      <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-lg hover:shadow-[var(--accent)]/5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
          <div>
            <h3 className="text-base font-bold text-[var(--foreground)] sm:text-lg">
              {item.role}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="font-semibold text-[var(--accent)]">{item.company}</span>
              <span className="text-[var(--muted)]">•</span>
              <span className="text-[var(--muted)]">{item.location}</span>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 font-mono text-xs text-[var(--muted)]">
            {item.period}
          </span>
        </div>

        <ul className="mt-4 space-y-2 border-t border-[var(--border)]/60 pt-4">
          {item.highlights.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ── Use SkillBar with inView-triggered CSS class ─────── */
function AnimatedSkillBar({
  name,
  level,
  years,
  color,
  delay,
}: {
  name: string;
  level: string;
  years?: string;
  color?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!ref.current) return;
    const bar = ref.current.querySelector(".skill-bar-fill") as HTMLDivElement | null;
    if (bar && inView) {
      setTimeout(() => bar.classList.add("animate"), (delay ?? 0) * 1000);
    }
  }, [inView, delay]);

  return (
    <div ref={ref}>
      <SkillBar name={name} level={level} years={years} color={color} delay={delay} />
    </div>
  );
}

export function Resume() {
  const [activeTab, setActiveTab] = useState<ResumeTab>("experience");

  const tabs: { id: ResumeTab; label: string; count?: number }[] = [
    { id: "experience", label: "Work Experience", count: experience.length },
    { id: "skills", label: "Technical Skills", count: skills.length },
    { id: "projects", label: "Key Projects", count: projects.length },
    { id: "education", label: "Education" },
  ];

  return (
    <section id="resume" className="relative section-padding overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/4 -z-10 h-72 w-72 rounded-full bg-[var(--accent)]/5 blur-[100px]" />

      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label="Verified Resume"
            title="Curriculum Vitae"
            description="Recruiter-ready profile based on verified production experience, technical competencies, and academic background."
          />

          <MagneticButton strength={0.3}>
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="group inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-black shadow-md transition-all hover:opacity-90 hover:shadow-xl hover:shadow-[var(--accent)]/25"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Resume</span>
            </a>
          </MagneticButton>
        </div>

        {/* Professional Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
            <span>●</span>
            <span className="font-semibold">Professional Summary</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)] sm:text-base">
            {summary}
          </p>
        </motion.div>

        {/* Tabs Bar */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-[var(--border)] pb-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-cursor="pointer"
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-[var(--surface)] text-[var(--accent)] border border-[var(--border)] shadow-sm"
                    : "text-[var(--muted)] hover:bg-[var(--surface)]/40 hover:text-[var(--foreground)]"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="rounded-full bg-[var(--background)] px-1.5 py-0.5 text-[10px] text-[var(--muted)]">
                    {tab.count}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="resume-tab-indicator"
                    className="absolute -bottom-[13px] left-0 right-0 h-0.5 bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {/* 1. WORK EXPERIENCE — Timeline */}
            {activeTab === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {experience.map((item, idx) => (
                  <ExperienceCard
                    key={item.id}
                    item={item}
                    index={idx}
                    isLast={idx === experience.length - 1}
                  />
                ))}
              </motion.div>
            )}

            {/* 2. TECHNICAL SKILLS — Animated Bars */}
            {activeTab === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
              >
                {/* Frontend */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 backdrop-blur-sm">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                    Frontend Engineering
                  </h4>
                  <div className="mt-4 space-y-4">
                    {categorizedSkills.frontend.map((skill, i) => (
                      <AnimatedSkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        years={skill.years}
                        color="var(--accent)"
                        delay={i * 0.1}
                      />
                    ))}
                  </div>
                </div>

                {/* AI & Automation */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 backdrop-blur-sm">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold">
                    AI & Automation
                  </h4>
                  <div className="mt-4 space-y-4">
                    {categorizedSkills.aiAndAutomation.map((skill, i) => (
                      <AnimatedSkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color="#b46fff"
                        delay={i * 0.1}
                      />
                    ))}
                  </div>
                </div>

                {/* Backend */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 backdrop-blur-sm">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                    Backend, APIs & Auth
                  </h4>
                  <div className="mt-4 space-y-4">
                    {categorizedSkills.backend.map((skill, i) => (
                      <AnimatedSkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        years={skill.years}
                        color="#34e89e"
                        delay={i * 0.1}
                      />
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 backdrop-blur-sm">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
                    Tooling & Workflow
                  </h4>
                  <div className="mt-4 space-y-4">
                    {categorizedSkills.toolsAndWorkflow.map((skill, i) => (
                      <AnimatedSkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color="#64748b"
                        delay={i * 0.1}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. KEY PROJECTS */}
            {activeTab === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
              >
                {projects.map((proj, i) => (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    whileHover={{ y: -3 }}
                    className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-base font-bold text-[var(--foreground)]">
                          {proj.title}
                        </h4>
                        {proj.links.length > 0 && proj.links[0]?.url && (
                          <a
                            href={proj.links[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 font-mono text-xs text-[var(--accent)] hover:underline"
                          >
                            Live ↗
                          </a>
                        )}
                      </div>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--muted)]">
                        {proj.description}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[var(--border)]/60 pt-3">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-0.5 font-mono text-[10px] text-[var(--muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* 4. EDUCATION */}
            {activeTab === "education" && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="max-w-2xl"
              >
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] font-mono font-bold text-sm border border-[var(--accent)]/20"
                    >
                      BCA
                    </motion.div>
                    <div>
                      <h4 className="text-base font-bold text-[var(--foreground)] sm:text-lg">
                        {education.degree}
                      </h4>
                      <p className="font-mono text-xs text-[var(--accent)]">
                        {education.institution}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 border-t border-[var(--border)] pt-4 sm:grid-cols-2">
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-[var(--muted)]">Location</span>
                      <span className="text-xs sm:text-sm text-[var(--foreground)]">{education.location}</span>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-[var(--muted)]">Timeline & Standing</span>
                      <span className="text-xs sm:text-sm text-[var(--foreground)]">
                        {education.period} • {education.grade}
                      </span>
                    </div>
                  </div>

                  {/* Certifications placeholder row */}
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--border)] pt-4">
                    {["React.js Specialist", "Full Stack Development", "AI & LLM Integration"].map((cert) => (
                      <span
                        key={cert}
                        className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1 font-mono text-[10px] text-[var(--muted)]"
                      >
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
