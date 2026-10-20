import { lazy, Suspense, useEffect } from "react";
import { MotionConfig, useAnimate } from "framer-motion";
import useLenis from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sky from "./components/Sky";
import ScrollBuddy from "./components/ScrollBuddy";
import useTheme from "./hooks/useTheme";
import Confetti from "./components/fun/Confetti";
import CursorTrail from "./components/fun/CursorTrail";

const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const Timeline = lazy(() => import("./components/Timeline"));
const AISection = lazy(() => import("./components/AISection"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function SectionFallback() {
  return <div className="py-20" aria-hidden="true" />;
}

export default function App() {
  useLenis();
  const { theme, toggle } = useTheme();
  const [pageRef, animate] = useAnimate();

  // "do a barrel roll" — spins the page around the middle of whatever is on screen
  useEffect(() => {
    const roll = async () => {
      const el = pageRef.current;
      el.style.transformOrigin = `50% ${window.scrollY + window.innerHeight / 2}px`;
      await animate(el, { rotate: [0, 360] }, { duration: 1.2, ease: [0.65, 0, 0.35, 1] });
      el.style.transform = "";
    };
    window.addEventListener("fun:barrel-roll", roll);
    return () => window.removeEventListener("fun:barrel-roll", roll);
  }, [animate, pageRef]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-bg text-ink min-h-screen">
        <Sky theme={theme} />
        <Navbar theme={theme} onToggleTheme={toggle} />
        <ScrollBuddy theme={theme} />
        <Confetti />
        <CursorTrail />
        <div ref={pageRef}>
          <main className="relative z-10">
            <Hero />
            <Suspense fallback={<SectionFallback />}>
              <About />
              <Projects />
              <Skills />
              <Timeline />
              <AISection />
              <Contact />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <div className="relative z-10">
              <Footer />
            </div>
          </Suspense>
        </div>
      </div>
    </MotionConfig>
  );
}
