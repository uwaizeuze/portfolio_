# Owais Ahmad — Portfolio

A cinematic, production-ready personal portfolio built with Next.js 15, Three.js, Framer Motion, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion + Lenis smooth scroll
- **3D:** Three.js + React Three Fiber + Drei
- **Theming:** next-themes (Dark + Light mode)
- **Forms:** React Hook Form + Zod

## Features

- Anti-gravity floating 3D shapes with mouse-reactive physics
- Custom cursor with particle trail
- Elegant 3D loading screen
- Interactive skills constellation
- Project cards with modal detail view
- Fully responsive design
- SEO optimized
- Dark/Light theme with smooth transitions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages & API
├── components/
│   ├── cursor/       # Custom cursor
│   ├── layout/       # Navbar, Footer, ThemeToggle
│   ├── providers/    # Theme, Lenis, App providers
│   ├── sections/     # Hero, About, Skills, etc.
│   ├── three/        # R3F 3D scenes
│   └── ui/           # Reusable UI components
├── data/             # Portfolio content
├── hooks/            # Custom React hooks
└── lib/              # Utilities & schemas
```

## Contact Form

The contact API route validates submissions with Zod. Connect an email service (Resend, SendGrid) in `src/app/api/contact/route.ts` for production delivery.

## License

Private — © Owais Ahmad
