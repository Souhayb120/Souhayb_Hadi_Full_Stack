import useLenis from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import AISection from "./components/AISection";
import Stats from "./components/Stats";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useLenis();

  return (
    <div className="bg-bg text-ink min-h-screen selection:bg-gold">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Projects />
        <Timeline />
        <AISection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
