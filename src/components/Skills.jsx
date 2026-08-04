import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { skillCategories, skills } from "../data/content";

function SkillCard({ skill, index }) {
  const handleMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--rx", `${y * -10}deg`);
    card.style.setProperty("--ry", `${x * 10}deg`);
  };
  const reset = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: index * 0.02 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        transform: "perspective(600px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
        transformStyle: "preserve-3d",
      }}
      className="glass rounded-xl p-4 group transition-[border-color,box-shadow] hover:border-gold/40 hover:shadow-[0_0_30px_-10px_rgba(244,201,93,0.4)] will-change-transform"
    >
      <div className="flex items-center justify-between">
        <p className="font-display font-medium text-ink">{skill.name}</p>
        <span className="font-mono text-[10px] text-muted group-hover:text-gold transition-colors">
          {skill.category}
        </span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-surface-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-gold to-violet"
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () =>
      category === "All"
        ? skills
        : skills.filter((s) => s.category === category),
    [category]
  );

  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel status={200} route="/skills" title="Skills" />

        <div className="flex flex-wrap gap-2 mb-10">
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-colors ${
                category === cat
                  ? "bg-gold text-[#231a06] border-gold"
                  : "border-line text-muted hover:text-ink hover:border-gold/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
