import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "ai", label: "AI" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavigation = (id) => {
    setOpen(false);

    const section = document.getElementById(id);

    if (section) {
      setTimeout(() => {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
            scrolled
              ? "glass"
              : "bg-transparent border border-transparent"
          }`}
        >
          <button
            onClick={() => handleNavigation("hero")}
            className="font-display font-semibold text-ink flex items-center gap-2"
          >
            <span className="text-gold font-mono">~/</span>
            souhayb
          </button>

          <nav className="hidden md:flex items-center gap-1 font-mono text-sm">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link.id)}
                className="relative px-3 py-2 text-muted hover:text-ink transition-colors"
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-surface-2 border border-line"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}

                <span
                  className={`relative ${
                    active === link.id ? "text-gold" : ""
                  }`}
                >
                  {link.label}
                </span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => handleNavigation("contact")}
            className="hidden md:inline-flex items-center rounded-lg bg-gold px-4 py-2 text-sm font-medium text-[#231a06] hover:bg-gold-dim transition-colors"
          >
            Let's talk
          </button>

          <button
            className="md:hidden text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden glass rounded-2xl mt-2"
            >
              <nav className="flex flex-col p-4 gap-1 font-mono text-sm">
                {links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavigation(link.id)}
                    className={`text-left px-3 py-3 rounded-lg transition-all hover:bg-surface-2 ${
                      active === link.id ? "text-gold" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}

                <button
                  onClick={() => handleNavigation("contact")}
                  className="mt-3 rounded-lg bg-gold px-4 py-3 text-[#231a06] font-medium"
                >
                  Let's talk
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}