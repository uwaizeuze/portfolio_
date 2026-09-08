"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

export function LocationCard() {
  const [srinagarTime, setSrinagarTime] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  // Live IST Clock
  useEffect(() => {
    setIsClient(true);
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: personalInfo.coordinates.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setSrinagarTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${personalInfo.coordinates.lat},${personalInfo.coordinates.lng}`;
  const embedMapUrl = `https://maps.google.com/maps?q=${personalInfo.coordinates.lat},${personalInfo.coordinates.lng}&hl=en&z=13&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5"
    >
      {/* Top Details */}
      <div>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center border-b border-[var(--border)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] font-semibold">
                Location & Timezone
              </span>
            </div>
            <h3 className="mt-1 text-lg font-bold text-[var(--foreground)]">
              {personalInfo.location}
            </h3>
            <p className="font-mono text-xs text-[var(--muted)]">
              {personalInfo.coordinates.city}, {personalInfo.coordinates.region} • {personalInfo.coordinates.country}
            </p>
          </div>

          {/* Live IST Clock */}
          <motion.div
            animate={{ opacity: isClient ? 1 : 0.5 }}
            className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 py-2 text-left sm:text-right"
          >
            <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
              Local Time (IST)
            </span>
            <span className="font-mono text-sm sm:text-base font-bold text-[var(--accent)]">
              {isClient ? srinagarTime : "—:—:— AM"}
            </span>
            <span className="block font-mono text-[9px] text-[var(--muted)]">
              UTC {personalInfo.coordinates.utcOffset}
            </span>
          </motion.div>
        </div>

        {/* Map Container */}
        <div className="relative mt-4 h-48 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]">
          <iframe
            title="Srinagar Location Map"
            src={embedMapUrl}
            className="h-full w-full border-0 opacity-90 transition-opacity hover:opacity-100"
            style={{ filter: "grayscale(80%) contrast(1.1) brightness(0.9)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Pin overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] shadow-lg shadow-[var(--accent)]/40">
              <div className="h-2.5 w-2.5 rounded-full bg-black" />
            </div>
          </div>

          {/* Open Maps link */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)]/95 px-2.5 py-1 font-mono text-[10px] text-[var(--foreground)] shadow-sm backdrop-blur-md transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span>Open in Maps</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Availability Highlights */}
      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3 border-t border-[var(--border)] pt-4 text-xs">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]/60 p-2.5">
          <span className="block font-mono text-[9px] text-[var(--muted)]">WORK PREFERENCE</span>
          <span className="font-medium text-[var(--foreground)]">Remote Worldwide</span>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]/60 p-2.5">
          <span className="block font-mono text-[9px] text-[var(--muted)]">TIMEZONE ALIGNMENT</span>
          <span className="font-medium text-[var(--accent)]">US / EU / APAC</span>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]/60 p-2.5">
          <span className="block font-mono text-[9px] text-[var(--muted)]">RELOCATION</span>
          <span className="font-medium text-emerald-500">Open to Relocation</span>
        </div>
      </div>
    </motion.div>
  );
}
