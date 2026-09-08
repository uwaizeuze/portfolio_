import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { AiWorkflow } from "@/components/sections/AiWorkflow";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Persistent ambient glow layers for depth */}
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        {/* Top-left accent glow */}
        <div
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-30 dark:opacity-20"
          style={{
            background: "radial-gradient(circle, #00f0ff22 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Right mid glow */}
        <div
          className="absolute -right-40 top-1/3 h-[600px] w-[600px] rounded-full opacity-20 dark:opacity-15"
          style={{
            background: "radial-gradient(circle, #6366f122 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        {/* Bottom center glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full opacity-25 dark:opacity-15"
          style={{
            background: "radial-gradient(circle, #34e89e18 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <AiWorkflow />
      <Resume />
      <Contact />
    </>
  );
}
