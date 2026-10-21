import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SectionTitle } from "./motion";
import { ease, hoverSpring, viewport } from "./motionTokens";
import { projects } from "../data/content";

// spotlight that follows the cursor: just CSS vars, no re-render
const trackPointer = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};

// Each card plays one entrance as it arrives — fade up, then the screenshot opens like a
// curtain — and after that motion is only feedback: lift, spotlight, a slow image zoom.
// On desktop the image alternates sides so the list reads like an editorial spread.
function Project({ project, index }) {
  const [open, setOpen] = useState(false);
  const links = project.links ?? [{ label: "Code on GitHub", href: project.github }];
  const flip = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease }}
      className="mb-8 last:mb-0"
    >
      <motion.div
        initial="rest"
        whileHover="hover"
        variants={{ rest: { y: 0 }, hover: { y: -4 } }}
        transition={hoverSpring}
        onPointerMove={trackPointer}
        className={`group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_48px_-30px_rgba(0,0,0,0.6)] transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.75)] md:grid ${
          flip ? "md:grid-cols-[1fr_40%]" : "md:grid-cols-[40%_1fr]"
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklab, var(--color-accent) 9%, transparent), transparent 70%)",
          }}
        />

        {project.image && (
          <a
            href={links[0].href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.name} on GitHub`}
            className={`relative block aspect-[2/1] overflow-hidden bg-surface-2 md:aspect-auto md:min-h-full ${
              flip ? "md:order-last" : ""
            }`}
          >
            {/* a panel lifts off the screenshot like a curtain (an overlay rather than a clip-path:
                a fully clipped element never counts as in view, so it would never reveal or lazy-load).
                Reduced motion makes these transforms instant. */}
            <motion.span
              aria-hidden="true"
              initial={{ scaleY: 1 }}
              whileInView={{ scaleY: 0 }}
              viewport={viewport}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
              className="absolute inset-0 z-[1] origin-top bg-surface-2"
            />
            <motion.div
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={viewport}
              transition={{ duration: 1.2, ease, delay: 0.15 }}
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
                variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
                transition={{ duration: 0.8, ease }}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </a>
        )}

        <div className="relative flex flex-col p-6 md:p-7">
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
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionTitle index={2} note="a few things I've built">Projects</SectionTitle>
        {projects.map((p, i) => (
          <Project key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
