import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SectionTitle, Reveal } from "./motion";
import { ease, hoverSpring, viewport } from "./motionTokens";
import { projects } from "../data/content";

function useIsDesktop() {
  const query = "(min-width: 768px)";
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return matches;
}

// On desktop the cards form a deck: each sticks near the top, the next slides over it,
// and the ones underneath shrink and dim as the pile grows.
function Project({ project, index, total, progress, deck }) {
  const [open, setOpen] = useState(false);
  const links = project.links ?? [{ label: "Code on GitHub", href: project.github }];
  const below = total - 1 - index;
  const scale = useTransform(progress, [index / total, 1], [1, 1 - below * 0.05]);
  const dim = useTransform(progress, [index / total, 1], [0, below * 0.12]);

  return (
    <div
      className={deck ? "sticky mb-[22vh] last:mb-0" : "mb-6 last:mb-0"}
      style={deck ? { top: `calc(5.5rem + ${index * 18}px)` } : undefined}
    >
      <Reveal as="article">
        <motion.div
          initial="rest"
          whileHover="hover"
          variants={{ rest: { y: 0 }, hover: { y: -4 } }}
          transition={hoverSpring}
          style={deck ? { scale, transformOrigin: "50% 0%" } : undefined}
          className="group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_48px_-30px_rgba(0,0,0,0.6)] transition-[border-color] duration-300 hover:border-accent/40 md:grid md:grid-cols-[40%_1fr]"
        >
          {project.image && (
            <a
              href={links[0].href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="relative block aspect-[2/1] overflow-hidden bg-surface-2 md:aspect-auto md:min-h-full"
            >
              {/* outer settles in on scroll, inner zooms with the card's hover */}
              <motion.div
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={viewport}
                transition={{ duration: 1.1, ease }}
                className="absolute inset-0"
              >
                <motion.img
                  src={`${project.image}-800.webp`}
                  srcSet={`${project.image}-800.webp 800w, ${project.image}-1400.webp 1400w`}
                  sizes="(min-width: 768px) 320px, 100vw"
                  alt={`${project.name}, ${project.tag}`}
                  width="800"
                  height="450"
                  loading="lazy"
                  decoding="async"
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                  transition={{ duration: 0.7, ease }}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </a>
          )}

          <div className="flex flex-col p-6 md:p-7">
            <p className="text-xs font-medium text-accent">{project.tag}</p>
            <h3 className="mt-1 font-display text-2xl font-medium text-ink">{project.name}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.description}</p>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <li key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-sm">
              <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="inline-flex items-center gap-1 text-muted transition-colors hover:text-ink"
              >
                {open ? "Hide details" : "What it does"}
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={hoverSpring} className="inline-flex">
                  <ChevronDown size={15} />
                </motion.span>
              </button>
              {links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  initial="rest"
                  whileHover="hover"
                  className="inline-flex items-center gap-1 text-accent"
                >
                  {l.label}
                  <motion.span variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: -2 } }} transition={hoverSpring}>
                    <ArrowUpRight size={15} />
                  </motion.span>
                </motion.a>
              ))}
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="overflow-hidden"
                >
                  {project.features.map((f) => (
                    <li key={f} className="mt-2 flex gap-3 text-sm text-muted first:mt-4">
                      <span className="text-accent">–</span>
                      {f}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* shade that deepens as later cards pile on top */}
          {deck && (
            <motion.span
              aria-hidden="true"
              style={{ opacity: dim }}
              className="pointer-events-none absolute inset-0 bg-bg"
            />
          )}
        </motion.div>
      </Reveal>
    </div>
  );
}

export default function Projects() {
  const listRef = useRef(null);
  const isDesktop = useIsDesktop();
  const still = useReducedMotion();
  const deck = isDesktop && !still;
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionTitle note="a few things I've built">Projects</SectionTitle>
        <div ref={listRef}>
          {projects.map((p, i) => (
            <Project
              key={p.id}
              project={p}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
              deck={deck}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
