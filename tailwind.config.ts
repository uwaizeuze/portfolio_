import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#f8f9fc",
          dark: "#050505",
        },
        foreground: {
          DEFAULT: "#1a1a2e",
          dark: "#f0f0f5",
        },
        accent: {
          DEFAULT: "#0ea5e9",
          dark: "#00f0ff",
        },
        muted: {
          DEFAULT: "#64748b",
          dark: "#94a3b8",
        },
        surface: {
          DEFAULT: "#ffffff",
          dark: "#0a0a0a",
        },
        border: {
          DEFAULT: "#e2e8f0",
          dark: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
