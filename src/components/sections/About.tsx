"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo, summary, education } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { label: "Years Experience", value: "4+", numeric: 4, suffix: "+" },
  { label: "Stack Depth", value: "Full", numeric: null, suffix: "" },
  { label: "Primary Focus", value: "Frontend", numeric: null, suffix: "" },
  { label: "Based In", value: "India", numeric: null, suffix: "" },
];

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="glass-card flex flex-col items-center justify-center p-6 text-center cursor-default"
    >
      <motion.span
        className="text-3xl font-bold text-gradient"
        animate={inView ? { scale: [0.85, 1.05, 1] } : {}}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
      >
        {stat.value}
      </motion.span>
      <span className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
        {stat.label}
      </span>
    </motion.div>
  );
}

export function About() {
  const textRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        educationRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: educationRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="About"
          title="Engineering experiences that scale"
          description="Passionate about crafting performant, accessible web applications with modern tooling."
        />

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left — summary text */}
          <div ref={textRef} style={{ opacity: 0 }} className="lg:col-span-3">
            <div className="glass-card p-8 md:p-10">
              <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                {summary}
              </p>
              <p className="mt-6 text-base leading-relaxed text-[var(--muted)]">
                Strong background integrating RESTful APIs and optimizing application performance.
                From secure authentication systems to role-based CMS platforms — I bring full-stack
                perspective to every frontend challenge.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                    Location
                  </span>
                  <p className="mt-1 text-sm text-[var(--foreground)]">{personalInfo.location}</p>
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                    Focus Area
                  </span>
                  <p className="mt-1 text-sm text-[var(--foreground)]">React.js, Next.js & Frontend Architecture</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — stats + education */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>

            <div ref={educationRef} style={{ opacity: 0 }} className="glass-card mt-4 p-6">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                Education
              </span>
              <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                {education.degree}
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {education.institution}, {education.location}
              </p>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">{education.period}</p>

              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] text-emerald-400">{education.grade}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
