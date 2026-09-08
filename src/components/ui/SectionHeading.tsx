"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {/* Label with animated accent line */}
      <div className={cn("mb-4 flex items-center gap-3", align === "center" && "justify-center")}>
        <motion.span
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="block h-px w-8 origin-left bg-[var(--accent)]"
          style={{ display: align === "center" ? "none" : "block" }}
        />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-semibold">
          {label}
        </span>
      </div>

      <h2 className="text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl leading-tight">
        {title}
      </h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
