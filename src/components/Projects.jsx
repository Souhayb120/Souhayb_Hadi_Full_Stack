import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Github } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { projects } from "../data/content";

const accentMap = {
  gold: { text: "text-gold", bg: "bg-gold", border: "hover:border-gold/40" },
  violet: { text: "text-violet", bg: "bg-violet", border: "hover:border-violet/40" },
  amber: { text: "text-amber", bg: "bg-amber", border: "hover:border-amber/40" },
};

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);
  const accent = accentMap[project.accent];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
      className={`glass rounded-2xl overflow-hidden transition-colors ${accent.border}`}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-muted mb-2">
              <span className={accent.text}>{project.status}</span>
              <span>·</span>
              <span>{project.tag}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink">
              {project.name}
            </h3>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 p-2.5 rounded-lg text-muted hover:text-ink hover:bg-surface-2 transition-colors"
            aria-label={`${project.name} on GitHub`}
          >
            <Github size={20} />
          </a>
        </div>

        <p className="mt-4 text-muted leading-relaxed max-w-2xl">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] rounded-full border border-line px-3 py-1 text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink transition-colors"
        >
          <motion.span animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDown size={14} />
          </motion.span>
          {open ? "Hide details" : "Show features"}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2 border-t border-line pt-4">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <span className={`mt-1.5 h-1 w-1 rounded-full ${accent.bg} shrink-0`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel status={200} route="/projects" title="Projects" />
        <div className="grid gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
