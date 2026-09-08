"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import type { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <SmoothScrollProvider>
        <CustomCursor />
        <Navbar />
        {children}
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
