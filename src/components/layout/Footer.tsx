"use client";

import { motion } from "framer-motion";
import { personalInfo, navLinks } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const initials = personalInfo.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--surface)]/40 backdrop-blur-md">
      {/* Subtle top ambient glow line */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />

      <div className="section-container px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:gap-12">
          
          {/* ── Brand & Identity (5 cols) ── */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] font-mono text-sm font-bold text-[var(--accent)] shadow-sm">
                {initials}
              </span>
              <div>
                <span className="block font-semibold tracking-tight text-[var(--foreground)]">
                  {personalInfo.name}
                </span>
                <span className="block font-mono text-xs text-[var(--muted)]">
                  Software Engineer — AI & Frontend Systems
                </span>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)]">
              Architecting high-performance web applications, enterprise RAG pipelines, and responsive frontend systems with clean code and intuitive user experiences.
            </p>

            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-3 py-1 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] text-[var(--muted)]">
                Available for high-impact opportunities
              </span>
            </div>
          </div>

          {/* ── Quick Navigation (3 cols) ── */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--foreground)]">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-cursor="pointer"
                    className="group inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    <span className="h-1 w-1 rounded-full bg-transparent transition-all group-hover:w-2 group-hover:bg-[var(--accent)]" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 transition-colors hover:underline"
                >
                  <span className="h-1 w-1 rounded-full bg-cyan-400 transition-all group-hover:w-2" />
                  Resume (PDF) ↗
                </a>
              </li>
            </ul>
          </div>

          {/* ── Connect & Professional Profile (4 cols) ── */}
          <div className="space-y-3 md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--foreground)]">
              Professional Network
            </h4>
            <div className="space-y-2.5">
              {/* Official LinkedIn Button */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="group flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 px-3.5 py-2.5 transition-all duration-300 hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10 hover:shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0077b5]/15 text-[#0077b5] transition-transform duration-200 group-hover:scale-110">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-[var(--foreground)]">
                      Official LinkedIn Profile
                    </span>
                    <span className="block font-mono text-[10px] text-[var(--muted)]">
                      {personalInfo.linkedinHandle}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0077b5]">
                  ↗
                </span>
              </a>

              {/* Location indicator */}
              <div className="flex items-center gap-2 px-1 text-xs text-[var(--muted)]">
                <svg
                  className="h-3.5 w-3.5 shrink-0 text-[var(--muted)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="font-mono text-[11px]">{personalInfo.location}</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Divider & Copyright ── */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-[var(--muted)]">
            © {year} {personalInfo.name}. All rights reserved.
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
            className="group flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--foreground)]"
          >
            <span>Back to top</span>
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
