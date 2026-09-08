"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

function ExperienceCard({
  job,
  index,
}: {
  job: (typeof experience)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative md:pl-20"
    >
      {/* Timeline dot with glow */}
      <div className="absolute left-2.5 top-6 hidden md:left-[26px] md:block">
        <motion.div
          animate={inView ? { scale: [0, 1.3, 1] } : {}}
          transition={{ delay: index * 0.12 + 0.25, duration: 0.45, type: "spring" }}
          className="h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--background)]"
          style={{ boxShadow: "0 0 10px color-mix(in srgb, var(--accent) 50%, transparent)" }}
        >
          <div className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-20" />
        </motion.div>
      </div>

      {/* Company + Period badge */}
      <div className="glass-card group p-6 transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-xl hover:shadow-[var(--accent)]/5 md:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
              {job.role}
            </h3>
            <p className="mt-1 font-semibold text-[var(--accent)]">{job.company}</p>
            <p className="mt-0.5 text-sm text-[var(--muted)]">{job.location}</p>
          </div>
          <span className="mt-2 inline-flex shrink-0 items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-xs text-[var(--muted)] sm:mt-0">
            {job.period}
          </span>
        </div>

        <ul className="mt-6 space-y-3">
          {job.highlights.map((highlight, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.12 + 0.2 + i * 0.05 }}
              className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              {highlight}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="Experience"
          title="Professional journey"
          description="Four years of building production-grade React applications across fintech, enterprise, and government sectors."
        />

        <div className="relative">
          {/* Timeline track */}
          <div
            className="absolute left-4 top-0 hidden h-full w-px md:left-8 md:block"
            style={{
              background: "linear-gradient(to bottom, var(--accent), color-mix(in srgb, var(--accent) 5%, transparent))",
            }}
          />

          <div className="space-y-10">
            {experience.map((job, index) => (
              <ExperienceCard key={job.id} job={job} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
