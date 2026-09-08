"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo, navLinks } from "@/data/portfolio";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((link) => link.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const initials = personalInfo.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-2xl shadow-sm shadow-black/10"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#"
          data-cursor="pointer"
          className="group flex items-center gap-2 font-mono text-sm font-medium"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-bold text-[var(--accent)] transition-all group-hover:border-[var(--accent)]/60 group-hover:shadow-sm group-hover:shadow-[var(--accent)]/20">
            {initials}
          </span>
          <span className="hidden sm:inline text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">Owais</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="pointer"
              className={cn(
                "relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
                activeSection === link.href.replace("#", "")
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              )}
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-2 -bottom-0.5 h-px bg-[var(--accent)]"
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            data-cursor="pointer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1">
              <span className={cn("block h-0.5 w-4 bg-[var(--foreground)] transition-transform", mobileOpen && "translate-y-1.5 rotate-45")} />
              <span className={cn("block h-0.5 w-4 bg-[var(--foreground)] transition-opacity", mobileOpen && "opacity-0")} />
              <span className={cn("block h-0.5 w-4 bg-[var(--foreground)] transition-transform", mobileOpen && "-translate-y-1.5 -rotate-45")} />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor="pointer"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 font-mono text-sm uppercase tracking-wider text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
