"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 300);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505]"
        >
          <div className="mb-8 flex h-[120px] w-[120px] items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-2 border-[#00f0ff]/20 border-t-[#00f0ff]" />
          </div>

          <p className="mb-6 font-mono text-sm uppercase tracking-[0.3em] text-[#00f0ff]">
            {personalInfo.name}
          </p>

          <div className="relative h-px w-48 overflow-hidden bg-white/10">
            <div
              className="absolute inset-y-0 left-0 bg-[#00f0ff] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="mt-3 font-mono text-xs text-white/40">
            {Math.round(progress)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
