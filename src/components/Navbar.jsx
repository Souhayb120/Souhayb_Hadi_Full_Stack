import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ease } from "./motionTokens";
import ThemeToggle from "./ThemeToggle";
import { scrollToTarget } from "../lib/scroll";
import { barrelRoll } from "../lib/fun";

const links = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const logoClicks = useRef([]);

  // easter egg: triple-click the name
  const onLogo = () => {
    const now = Date.now();
    logoClicks.current = [...logoClicks.current.filter((t) => now - t < 900), now];
    if (logoClicks.current.length >= 3) {
      logoClicks.current = [];
      barrelRoll();
    }
    go("hero");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToTarget(id);
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-bg/[0.97] md:bg-bg/90 md:backdrop-blur border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <button onClick={onLogo} className="font-display text-lg font-medium text-ink">
          Souhayb Hadi
        </button>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 text-sm sm:flex">
            {links.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => go(link.id)}
                whileHover={{ y: -1 }}
                className="text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <button
            className="text-ink sm:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden sm:hidden"
          >
            <div className="flex flex-col px-6 pb-4">
              {links.map((link) => (
                <button key={link.id} onClick={() => go(link.id)} className="py-2.5 text-left text-muted hover:text-ink">
                  {link.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
