"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  LayoutGroup,
  type MotionValue,
} from "framer-motion";
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { projects } from "@/data/portfolio";

/* ════════════════════════════════════════════════════════
   ①  PER-PROJECT METADATA
   ════════════════════════════════════════════════════════ */
const META = {
  cersai: {
    accent: "#00d4ff",
    accentDark: "#00d4ff",
    accentLight: "#0284c7",
    cat: "Enterprise Platform",
    num: "01",
    year: "2024",
    gradient: ["#00d4ff22", "#006eff11", "transparent"],
    iconEl: IconShield,
  },
  "legacy-assurance": {
    accent: "#b46fff",
    accentDark: "#b46fff",
    accentLight: "#7c3aed",
    cat: "AI Automation",
    num: "02",
    year: "2024",
    gradient: ["#b46fff22", "#6d28d911", "transparent"],
    iconEl: IconBrain,
  },
  cryptofunds: {
    accent: "#ffb020",
    accentDark: "#ffb020",
    accentLight: "#d97706",
    cat: "Web Platform",
    num: "03",
    year: "2023",
    gradient: ["#ffb02022", "#f5920011", "transparent"],
    iconEl: IconCoin,
  },
  "developer-buddy": {
    accent: "#34e89e",
    accentDark: "#34e89e",
    accentLight: "#059669",
    cat: "Chrome Extension",
    num: "04",
    year: "2023",
    gradient: ["#34e89e22", "#10b98111", "transparent"],
    iconEl: IconPuzzle,
  },
} as const;

type ProjectId = keyof typeof META;
type Project = (typeof projects)[number];

/* ════════════════════════════════════════════════════════
   ②  ANIMATED SVG ICONS
   ════════════════════════════════════════════════════════ */
function IconShield({ color, size = 72 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <motion.path
        d="M36 6 L62 18 L62 38 C62 52 50 63 36 66 C22 63 10 52 10 38 L10 18 Z"
        stroke={color} strokeWidth="1.8" fill={`${color}18`}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* inner ring */}
      <motion.path
        d="M36 14 L54 23 L54 38 C54 48 46 56 36 58 C26 56 18 48 18 38 L18 23 Z"
        stroke={color} strokeWidth="1" fill="none" opacity={0.4}
        animate={{ scale: [1.02, 0.98, 1.02] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* checkmark */}
      <motion.path
        d="M26 37 L33 44 L47 30"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      />
      {/* orbit dots */}
      {[0, 1, 2].map((i) => {
        const angle = (i * 120 * Math.PI) / 180;
        return (
          <motion.circle
            key={i} r="2.5"
            cx={36 + 30 * Math.cos(angle)} cy={36 + 30 * Math.sin(angle)}
            fill={color}
            animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, delay: i * 0.6, repeat: Infinity }}
          />
        );
      })}
    </svg>
  );
}

function IconBrain({ color, size = 72 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <motion.ellipse cx="30" cy="36" rx="14" ry="18" stroke={color} strokeWidth="1.8" fill={`${color}15`}
        animate={{ scaleY: [1, 1.06, 1] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.ellipse cx="44" cy="36" rx="13" ry="17" stroke={color} strokeWidth="1.8" fill={`${color}10`}
        animate={{ scaleY: [1.06, 1, 1.06] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.line x1="37" y1="20" x2="37" y2="52" stroke={color} strokeWidth="1.5" strokeDasharray="3 3"
        animate={{ strokeDashoffset: [0, -12] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
      {/* synapse dots */}
      {[[24, 28], [36, 24], [48, 30], [26, 44], [44, 46]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="2"
          fill={color}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 1.8, delay: i * 0.35, repeat: Infinity }} />
      ))}
      {/* signal lines */}
      <motion.path d="M28 36 Q37 30 46 36" stroke={color} strokeWidth="1" fill="none" opacity={0.5}
        animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
    </svg>
  );
}

function IconCoin({ color, size = 72 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* shadow */}
      <motion.ellipse cx="36" cy="55" rx="18" ry="5" fill={`${color}20`}
        animate={{ scaleX: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
      {/* coin body */}
      <motion.rect x="18" y="28" width="36" height="18" rx="4" fill={`${color}15`} stroke={color} strokeWidth="1.8"
        animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
      <motion.ellipse cx="36" cy="28" rx="18" ry="7" fill={`${color}25`} stroke={color} strokeWidth="1.8"
        animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
      {/* ₿ symbol */}
      <motion.text x="36" y="33" textAnchor="middle" fontSize="12" fill={color} fontWeight="800"
        animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>₿</motion.text>
      {/* sparkles */}
      {[[56, 18], [16, 22], [58, 42]].map(([x, y], i) => (
        <motion.text key={i} x={x} y={y} fontSize="8" fill={color} textAnchor="middle"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }}
          transition={{ duration: 2, delay: i * 0.6, repeat: Infinity }}>✦</motion.text>
      ))}
    </svg>
  );
}

function IconPuzzle({ color, size = 72 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <motion.rect x="14" y="14" width="20" height="20" rx="5" stroke={color} strokeWidth="1.8" fill={`${color}20`}
        animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.2, repeat: Infinity }} />
      <motion.rect x="38" y="14" width="20" height="20" rx="5" stroke={color} strokeWidth="1.8" fill={`${color}15`}
        animate={{ scale: [1.08, 1, 1.08] }} transition={{ duration: 2.2, repeat: Infinity }} />
      <motion.rect x="14" y="38" width="20" height="20" rx="5" stroke={color} strokeWidth="1.8" fill={`${color}15`}
        animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.4, delay: 0.4, repeat: Infinity }} />
      <motion.rect x="38" y="38" width="20" height="20" rx="5" stroke={color} strokeWidth="1.8" fill={`${color}25`}
        animate={{ scale: [1.06, 1, 1.06] }} transition={{ duration: 2.4, delay: 0.4, repeat: Infinity }} />
      {/* connector lines */}
      <motion.line x1="34" y1="24" x2="38" y2="24" stroke={color} strokeWidth="3" strokeLinecap="round"
        animate={{ scaleX: [1, 0.6, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.line x1="24" y1="34" x2="24" y2="38" stroke={color} strokeWidth="3" strokeLinecap="round"
        animate={{ scaleY: [1, 0.6, 1] }} transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }} />
      <motion.line x1="48" y1="34" x2="48" y2="38" stroke={color} strokeWidth="3" strokeLinecap="round"
        animate={{ scaleY: [1, 0.6, 1] }} transition={{ duration: 1.5, delay: 0.6, repeat: Infinity }} />
      <motion.line x1="34" y1="48" x2="38" y2="48" stroke={color} strokeWidth="3" strokeLinecap="round"
        animate={{ scaleX: [1, 0.6, 1] }} transition={{ duration: 1.5, delay: 0.9, repeat: Infinity }} />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════
   ③  UTILITY HOOKS
   ════════════════════════════════════════════════════════ */
function useTilt(strength = 14) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sRx = useSpring(rx, { stiffness: 180, damping: 22 });
  const sRy = useSpring(ry, { stiffness: 180, damping: 22 });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-dy * strength * 2);
    ry.set(dx * strength * 2);
    scale.set(1.025);
  }, [rx, ry, scale, strength]);

  const onLeave = useCallback(() => {
    rx.set(0); ry.set(0); scale.set(1);
  }, [rx, ry, scale]);

  return { ref, sRx, sRy, scale, onMove, onLeave };
}

/* ════════════════════════════════════════════════════════
   ④  FLOATING PARTICLES
   ════════════════════════════════════════════════════════ */
function Particles({ color, count = 8 }: { color: string; count?: number }) {
  const ps = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 10 + (i * 79) % 80,
      y: 10 + (i * 67) % 80,
      size: 2 + (i % 3),
      dur: 3 + (i % 4),
      del: (i * 0.4) % 2.5,
    })), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {ps.map((p) => (
        <motion.div key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: color }}
          animate={{ y: [0, -14, 0], opacity: [0.15, 0.7, 0.15], scale: [1, 1.4, 1] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ⑤  BENTO CARD  (flip on hover, expand on click)
   ════════════════════════════════════════════════════════ */
function BentoCard({
  project, index, onOpen, span,
}: {
  project: Project; index: number; onOpen: (p: Project) => void; span?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const { ref, sRx, sRy, scale, onMove, onLeave } = useTilt(10);
  const meta = META[project.id as ProjectId];
  const Icon = meta.iconEl;

  /* accent resolved from CSS var */
  const accent = meta.accent;

  return (
    <motion.div
      className={`group relative ${span ?? ""}`}
      initial={{ opacity: 0, y: 64, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 80, damping: 18, delay: index * 0.11 }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        style={{ rotateX: sRx, rotateY: sRy, scale, transformStyle: "preserve-3d" } as unknown as React.CSSProperties}
        onMouseMove={onMove}
        onMouseLeave={() => { onLeave(); setFlipped(false); }}
        className="relative h-full cursor-pointer"
        onClick={() => flipped ? onOpen(project) : setFlipped(true)}
        data-cursor="pointer"
      >
        {/* ── FRONT ── */}
        <div
          className="relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-2xl border p-6"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderColor: `${accent}30`,
            background: `linear-gradient(145deg, color-mix(in srgb,${accent} 10%, var(--surface)) 0%, var(--surface) 55%)`,
            boxShadow: `0 0 0 0 ${accent}00`,
            transition: "box-shadow .3s",
          } as React.CSSProperties}
        >
          {/* radial glow */}
          <motion.div
            className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full"
            style={{ background: accent, filter: "blur(60px)" }}
            animate={{ opacity: [0.08, 0.22, 0.08], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <Particles color={accent} />

          {/* floating 3-D icon */}
          <motion.div
            className="pointer-events-none absolute right-4 top-4"
            animate={{ y: [0, -7, 0], rotateY: [0, 18, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: `drop-shadow(0 6px 16px ${accent}55)` }}
          >
            <Icon color={accent} size={64} />
          </motion.div>

          {/* meta row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] font-bold tracking-[0.25em]" style={{ color: accent }}>{meta.num}</span>
            <div className="h-px w-6" style={{ background: `${accent}50` }} />
            <span className="rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider"
              style={{ color: accent, borderColor: `${accent}40`, background: `${accent}12` }}>
              {meta.cat}
            </span>
            <span className="ml-auto font-mono text-[9px] text-[var(--muted)]">{meta.year}</span>
          </div>

          {/* title */}
          <h3 className="mt-4 text-lg font-bold leading-snug text-[var(--foreground)] sm:text-xl"
            style={{ textShadow: `0 0 30px ${accent}22` }}>
            {project.shortTitle}
          </h3>

          {/* desc */}
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] line-clamp-3">{project.description}</p>

          {/* tags */}
          <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full px-2.5 py-0.5 font-mono text-[9px]"
                style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}25` }}>
                {t}
              </span>
            ))}
          </div>

          {/* flip hint */}
          <motion.div
            className="mt-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em]"
            style={{ color: accent }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Hover → flip</span>
            <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1, repeat: Infinity }}>›</motion.span>
          </motion.div>

          {/* live links */}
          {(project as any).links?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {(project as any).links.map((link: { label: string; url: string }) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[9px] transition-opacity hover:opacity-80"
                  style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}35` }}
                >
                  <span>{link.label}</span>
                  <span>↗</span>
                </a>
              ))}
            </div>
          )}

          {/* bottom line sweep */}
          <motion.div className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl"
            style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }}
            initial={{ scaleX: 0, transformOrigin: "left" }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: index * 0.15 + 0.5 }}
          />
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border p-6"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `${accent}50`,
            background: `linear-gradient(145deg, color-mix(in srgb,${accent} 16%, var(--surface)) 0%, var(--surface) 60%)`,
          } as React.CSSProperties}
        >
          <motion.div className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ background: `radial-gradient(ellipse at 80% 0%, ${accent}25, transparent 60%)` }} />

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: accent }}>{meta.cat}</span>
            <span className="rounded-full px-2.5 py-1 font-mono text-[9px]"
              style={{ color: accent, background: `${accent}20`, border: `1px solid ${accent}40` }}>
              Click to expand ↗
            </span>
          </div>

          <h3 className="mt-3 text-base font-bold text-[var(--foreground)]">{project.shortTitle}</h3>

          <ul className="mt-3 space-y-2 flex-1">
            {project.highlights.slice(0, 3).map((h, i) => (
              <motion.li key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: flipped ? 1 : 0, x: flipped ? 0 : -12 }}
                transition={{ delay: i * 0.09 + 0.15, type: "spring", stiffness: 200 }}
                className="flex gap-2 text-xs leading-relaxed text-[var(--muted)]"
              >
                <motion.span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }}
                  animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }} />
                {h}
              </motion.li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="rounded-full px-2 py-0.5 font-mono text-[8px] uppercase"
                style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}35` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   ⑥  HORIZONTAL CAROUSEL CARD
   ════════════════════════════════════════════════════════ */
function CarouselCard({ project, active, onClick }: { project: Project; active: boolean; onClick: () => void }) {
  const meta = META[project.id as ProjectId];
  const Icon = meta.iconEl;
  const accent = meta.accent;

  return (
    <motion.div
      onClick={onClick}
      data-cursor="pointer"
      animate={{
        scale: active ? 1 : 0.88,
        rotateY: active ? 0 : -8,
        opacity: active ? 1 : 0.6,
        z: active ? 0 : -60,
      }}
      transition={{ type: "spring", stiffness: 140, damping: 22 }}
      className="relative w-[280px] sm:w-[340px] md:w-[400px] shrink-0 cursor-pointer"
      style={{ transformStyle: "preserve-3d" } as React.CSSProperties}
    >
      <div className="relative h-[480px] overflow-hidden rounded-3xl border"
        style={{
          borderColor: active ? `${accent}60` : `${accent}20`,
          background: `linear-gradient(160deg, color-mix(in srgb,${accent} 12%, var(--surface)) 0%, var(--surface) 55%)`,
          boxShadow: active ? `0 0 60px ${accent}30, 0 30px 60px rgba(0,0,0,0.3)` : "none",
        }}
      >
        {/* glow */}
        <motion.div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full"
          style={{ background: accent, filter: "blur(50px)" }}
          animate={{ opacity: active ? [0.12, 0.28, 0.12] : 0.04 }}
          transition={{ duration: 3.5, repeat: Infinity }} />

        <Particles color={accent} count={6} />

        {/* icon */}
        <motion.div className="absolute right-5 top-5"
          animate={{ y: [0, -8, 0], rotateZ: [0, 4, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ filter: `drop-shadow(0 8px 24px ${accent}60)` }}
        >
          <Icon color={accent} size={72} />
        </motion.div>

        <div className="flex h-full flex-col p-7">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold tracking-[0.25em]" style={{ color: accent }}>{meta.num}</span>
            <div className="h-px flex-1" style={{ background: `${accent}30` }} />
            <span className="rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase"
              style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}35` }}>{meta.cat}</span>
          </div>

          <div className="mt-auto">
            <h3 className="text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-3xl">{project.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="rounded-full px-2.5 py-1 font-mono text-[10px]"
                  style={{ color: accent, background: `${accent}15`, border: `1px solid ${accent}30` }}>
                  {t}
                </span>
              ))}
            </div>

            <motion.div className="mt-6 flex items-center gap-2 font-mono text-xs"
              style={{ color: accent }}
              animate={{ x: active ? [0, 4, 0] : 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}>
              <span className="uppercase tracking-widest">View project</span>
              <span>→</span>
            </motion.div>
          </div>
        </div>

        {/* active indicator bottom line */}
        <motion.div className="absolute bottom-0 left-0 h-1 rounded-b-3xl"
          style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 0.5 }} />
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   ⑦  MODAL
   ════════════════════════════════════════════════════════ */
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (() => {
        const meta = META[project.id as ProjectId];
        const Icon = meta.iconEl;
        const accent = meta.accent;
        return (
          <motion.div key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-8"
            onClick={onClose}
          >
            {/* backdrop */}
            <motion.div className="absolute inset-0"
              style={{ backdropFilter: "blur(14px)", background: `radial-gradient(ellipse at 50% 30%, ${accent}18 0%, rgba(0,0,0,0.78) 65%)` }} />

            {/* modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 48 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 24 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border"
              style={{
                borderColor: `${accent}45`,
                background: `linear-gradient(155deg, color-mix(in srgb,${accent} 10%, var(--surface)) 0%, var(--surface) 55%)`,
                boxShadow: `0 0 100px ${accent}35, 0 40px 100px rgba(0,0,0,0.45)`,
              }}
            >
              {/* header glow */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-56 rounded-t-3xl"
                style={{ background: `linear-gradient(180deg, ${accent}20 0%, transparent 100%)` }} />

              {/* top section */}
              <div className="relative px-7 pt-9 sm:px-10 sm:pt-11">
                <div className="flex gap-6 items-start">
                  <motion.div
                    animate={{ y: [0, -10, 0], rotateY: [0, 22, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ filter: `drop-shadow(0 10px 28px ${accent}60)`, flexShrink: 0 }}
                  >
                    <Icon color={accent} size={76} />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
                        style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}35` }}>
                        {meta.cat}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--muted)]">{meta.year}</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-3xl">
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* divider */}
                <motion.div className="mt-7 h-px"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  style={{ transformOrigin: "left", background: `linear-gradient(90deg, ${accent}70, transparent)` } as React.CSSProperties}
                />
              </div>

              {/* body */}
              <div className="px-7 pb-9 pt-6 sm:px-10">
                <p className="text-sm leading-loose text-[var(--muted)] sm:text-base">{project.description}</p>

                {/* tech stack */}
                <div className="mt-7">
                  <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: accent }}>
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((t, i) => (
                      <motion.span key={t}
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.06 + 0.3, type: "spring", stiffness: 250 }}
                        className="rounded-full px-3 py-1 font-mono text-xs font-semibold"
                        style={{ color: accent, background: `${accent}16`, border: `1px solid ${accent}38` }}>
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* achievements */}
                <div className="mt-7">
                  <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: accent }}>
                    Key Achievements
                  </h4>
                  <ul className="space-y-3.5">
                    {project.highlights.map((h, i) => (
                      <motion.li key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.09 + 0.38, type: "spring", stiffness: 200, damping: 20 }}
                        className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]"
                      >
                        <motion.span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: accent }}
                          animate={{ boxShadow: [`0 0 0 0 ${accent}00`, `0 0 0 5px ${accent}30`, `0 0 0 0 ${accent}00`] }}
                          transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity }}
                        />
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* live project links */}
                {(project as any).links?.length > 0 && (
                  <div className="mt-7">
                    <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: accent }}>
                      Live Links
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {(project as any).links.map((link: { label: string; url: string }, i: number) => (
                        <motion.a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 + 0.5 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold transition-all"
                          style={{
                            color: accent,
                            background: `${accent}18`,
                            border: `1.5px solid ${accent}50`,
                            boxShadow: `0 0 12px ${accent}20`,
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>{link.label}</span>
                          <span style={{ fontSize: 11 }}>↗</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* corner close */}
              <motion.button
                onClick={onClose}
                data-cursor="pointer"
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full font-mono text-sm text-[var(--muted)]"
                style={{ background: `${accent}18`, border: `1px solid ${accent}35` }}
                aria-label="Close"
              >
                ✕
              </motion.button>

              {/* bottom fade */}
              <div className="pointer-events-none absolute bottom-0 inset-x-0 h-16 rounded-b-3xl"
                style={{ background: `linear-gradient(0deg, ${accent}12, transparent)` }} />
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════════════
   ⑧  VIEW TOGGLE
   ════════════════════════════════════════════════════════ */
type ViewMode = "grid" | "carousel";

function ViewToggle({ mode, onChange }: { mode: ViewMode; onChange: (v: ViewMode) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
      {(["grid", "carousel"] as ViewMode[]).map((v) => (
        <motion.button
          key={v}
          onClick={() => onChange(v)}
          className="relative rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors"
          style={{ color: mode === v ? "var(--background)" : "var(--muted)", zIndex: 1 }}
          data-cursor="pointer"
        >
          {mode === v && (
            <motion.span
              layoutId="toggle-pill"
              className="absolute inset-0 rounded-full bg-[var(--accent)]"
              style={{ zIndex: -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            />
          )}
          {v === "grid" ? "⊞ Grid" : "⟷ Slide"}
        </motion.button>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ⑨  SECTION HEADER
   ════════════════════════════════════════════════════════ */
function SectionHeader({ mode, onModeChange }: { mode: ViewMode; onModeChange: (v: ViewMode) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-14 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
      <div>
        <motion.span
          className="inline-block font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--accent)]"
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Selected work
        </motion.span>

        <motion.h2
          className="mt-3 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Projects
          <motion.span
            className="ml-2 inline-block text-[var(--accent)]"
            animate={{ rotate: [0, 12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >.</motion.span>
        </motion.h2>

        <motion.p
          className="mt-3 max-w-lg text-base text-[var(--muted)]"
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Enterprise platforms · AI automation · Developer tools
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <LayoutGroup>
          <ViewToggle mode={mode} onChange={onModeChange} />
        </LayoutGroup>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ⑩  BENTO GRID VIEW
   ════════════════════════════════════════════════════════ */
function BentoGrid({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {/* project 0 — full width on lg */}
      <div className="sm:col-span-2 lg:col-span-2">
        <BentoCard project={projects[0]} index={0} onOpen={onOpen} />
      </div>
      {/* project 1 */}
      <BentoCard project={projects[1]} index={1} onOpen={onOpen} />
      {/* project 2 */}
      <BentoCard project={projects[2]} index={2} onOpen={onOpen} />
      {/* project 3 — span 2 on sm */}
      <div className="sm:col-span-1 lg:col-span-1">
        <BentoCard project={projects[3]} index={3} onOpen={onOpen} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ⑪  CAROUSEL VIEW
   ════════════════════════════════════════════════════════ */
function CarouselView({ onOpen }: { onOpen: (p: Project) => void }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 28 });

  const CARD_W = 340;
  const GAP = 24;

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, projects.length - 1));
    setActive(clamped);
    const container = trackRef.current?.parentElement;
    const cw = container?.clientWidth ?? 600;
    const offset = -(clamped * (CARD_W + GAP)) + (cw / 2 - CARD_W / 2);
    x.set(offset);
  }, [x]);

  useEffect(() => { goTo(0); }, [goTo]);

  const meta = META[projects[active].id as ProjectId];

  return (
    <div className="relative">
      {/* bg gradient that changes with active project */}
      <motion.div
        className="pointer-events-none absolute -inset-16 rounded-3xl opacity-30"
        animate={{ background: `radial-gradient(ellipse at 50% 50%, ${meta.accent}18 0%, transparent 65%)` }}
        transition={{ duration: 0.7 }}
      />

      {/* track */}
      <div className="overflow-hidden py-10">
        <motion.div
          ref={trackRef}
          style={{ x: springX }}
          className="flex gap-6"
          drag="x"
          dragConstraints={{ left: -((projects.length - 1) * (CARD_W + GAP)), right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) goTo(active + 1);
            else if (info.offset.x > 50) goTo(active - 1);
          }}
        >
          {projects.map((p, i) => (
            <CarouselCard key={p.id} project={p} active={i === active}
              onClick={() => i === active ? onOpen(p) : goTo(i)} />
          ))}
        </motion.div>
      </div>

      {/* dots nav */}
      <div className="mt-2 flex items-center justify-center gap-6">
        {/* prev */}
        <motion.button
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors disabled:opacity-30"
          data-cursor="pointer"
        >←</motion.button>

        <div className="flex gap-2">
          {projects.map((_, i) => (
            <motion.button key={i} onClick={() => goTo(i)}
              animate={{
                width: i === active ? 24 : 8,
                background: i === active ? meta.accent : "var(--border)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="h-2 rounded-full"
              data-cursor="pointer"
            />
          ))}
        </div>

        {/* next */}
        <motion.button
          onClick={() => goTo(active + 1)}
          disabled={active === projects.length - 1}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors disabled:opacity-30"
          data-cursor="pointer"
        >→</motion.button>
      </div>

      {/* label */}
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] opacity-60">
        Drag or click arrows to explore · Click active card to expand
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ⑫  BACKGROUND DECORATION
   ════════════════════════════════════════════════════════ */
function SectionBg({ scrollY }: { scrollY: MotionValue<number> }) {
  const y1 = useTransform(scrollY, [0, 1], ["0%", "25%"]);
  const y2 = useTransform(scrollY, [0, 1], ["0%", "-20%"]);
  const op = useTransform(scrollY, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity: op }}>
      <motion.div
        className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full"
        style={{ y: y1, background: "var(--accent)", filter: "blur(120px)" } as unknown as React.CSSProperties}
        animate={{ opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full"
        style={{ y: y2, background: "#b46fff", filter: "blur(100px)" } as unknown as React.CSSProperties}
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />
      {/* grid overlay */}
      <div className="absolute inset-0 opacity-[0.018] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--accent) 1px,transparent 1px),linear-gradient(90deg,var(--accent) 1px,transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   ⑬  MAIN EXPORT
   ════════════════════════════════════════════════════════ */
export function Projects() {
  const [view, setView] = useState<ViewMode>("grid");
  const [modal, setModal] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-24 sm:px-6 md:py-36 lg:px-8"
    >
      <SectionBg scrollY={scrollYProgress} />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader mode={view} onModeChange={setView} />

        <AnimatePresence mode="wait">
          {view === "grid" ? (
            <motion.div key="grid"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, type: "spring", stiffness: 120 }}
            >
              <BentoGrid onOpen={setModal} />
            </motion.div>
          ) : (
            <motion.div key="carousel"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, type: "spring", stiffness: 120 }}
            >
              <CarouselView onOpen={setModal} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ProjectModal project={modal} onClose={() => setModal(null)} />
    </section>
  );
}
