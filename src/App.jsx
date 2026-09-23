import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import useLenis from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";

const About = lazy(() => import("./components/About"));
const Stats = lazy(() => import("./components/Stats"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Timeline = lazy(() => import("./components/Timeline"));
const AISection = lazy(() => import("./components/AISection"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function SectionFallback() {
  return <div className="py-28" aria-hidden="true" />;
}

export default function App() {
  useLenis();

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-bg text-ink min-h-screen selection:bg-gold">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Stats />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Timeline />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <AISection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </MotionConfig>
  );
}