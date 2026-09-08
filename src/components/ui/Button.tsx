"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface BaseProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
}

type Props = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

const variants = {
  primary:
    "relative overflow-hidden bg-[var(--accent)] text-black font-semibold hover:shadow-xl hover:shadow-[var(--accent)]/30 after:absolute after:inset-0 after:bg-white/0 hover:after:bg-white/10 after:transition-colors after:duration-300",
  secondary:
    "border border-[var(--border)] bg-[var(--surface)]/60 text-[var(--foreground)] backdrop-blur-sm hover:border-[var(--accent)]/60 hover:bg-[var(--surface)] hover:shadow-lg hover:shadow-[var(--accent)]/10",
  ghost: "text-[var(--muted)] hover:text-[var(--foreground)]",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  disabled,
  onClick,
  type = "button",
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-mono font-medium uppercase tracking-wider transition-all duration-300",
    variants[variant],
    sizes[size],
    disabled && "pointer-events-none opacity-60",
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        data-cursor="pointer"
        className={classes}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      data-cursor="pointer"
      className={classes}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
