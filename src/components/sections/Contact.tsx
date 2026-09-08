"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfo } from "@/data/portfolio";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { LocationCard } from "@/components/sections/LocationCard";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/3 bottom-0 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="section-container">
        <SectionHeading
          label="Get In Touch"
          title="Let's Build Something Exceptional"
          description="Open to senior frontend engineering roles, AI agent integration contracts, and high-impact web initiatives."
          align="center"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Left Column (5 cols): Interactive Location Map Card + Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:col-span-5"
          >
            {/* Interactive Location Map */}
            <LocationCard />

            {/* Direct Contact Card (Direct Email & Phone only - LinkedIn is dedicated in Footer) */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 backdrop-blur-xl shadow-lg">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">
                Direct Communication
              </span>

              <div className="mt-4 space-y-3">
                {/* Email (Primary contact here) */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  data-cursor="pointer"
                  className="group flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)]/60 p-3.5 transition-all hover:border-[var(--accent)] hover:bg-[var(--surface)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <div>
                      <span className="block font-mono text-[10px] text-[var(--muted)]">EMAIL ADDRESS</span>
                      <span className="text-xs font-medium text-[var(--foreground)] group-hover:text-[var(--accent)]">
                        {personalInfo.email}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-[var(--muted)] group-hover:text-[var(--accent)]">↗</span>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                  data-cursor="pointer"
                  className="group flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)]/60 p-3.5 transition-all hover:border-[var(--accent)] hover:bg-[var(--surface)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    </span>
                    <div>
                      <span className="block font-mono text-[10px] text-[var(--muted)]">PHONE / WHATSAPP</span>
                      <span className="text-xs font-medium text-[var(--foreground)] group-hover:text-emerald-400">
                        {personalInfo.phone}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-[var(--muted)] group-hover:text-emerald-400">↗</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 cols): Interactive Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 p-8 shadow-xl backdrop-blur-xl space-y-5">
              <div className="border-b border-[var(--border)] pb-4">
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Send a Direct Message
                </h3>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Fill out the details below and I will respond within 24 hours.
                </p>
              </div>

              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                  Your Name
                </label>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)] transition-all focus:border-[var(--accent)] focus:outline-none focus:shadow-lg focus:shadow-[var(--accent)]/10 focus:bg-[var(--surface)]"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                  Your Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="e.g. alex@company.com"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)] transition-colors focus:border-[var(--accent)] focus:outline-none"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                  Message / Project Scope
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={4}
                  placeholder="Briefly describe your project, timeline, or position requirements..."
                  className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)] transition-colors focus:border-[var(--accent)] focus:outline-none"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl py-3.5 font-mono text-xs uppercase tracking-wider"
              >
                {status === "loading" ? "Dispatching Message..." : "Send Direct Message"}
              </Button>

              {status === "success" && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-xs font-medium text-emerald-400">
                  ✓ Message sent successfully! I will get back to you shortly.
                </div>
              )}
              {status === "error" && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs font-medium text-red-400">
                  Could not send message automatically. Please reach out directly to {personalInfo.email}.
                </div>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
