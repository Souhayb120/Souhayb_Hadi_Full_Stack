import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ScrollSection, SectionTitle } from "./motion";
import { skillCategories, skills } from "../data/content";

const groups = skillCategories
  .filter((c) => c !== "All")
  .map((category) => ({ category, items: skills.filter((s) => s.category === category) }))
  .filter((g) => g.items.length > 0);

// each row slides in from alternating sides, tied to where it sits in the viewport
function SkillRow({ group, index }) {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.65"] });
  const from = index % 2 === 0 ? -80 : 80;
  const x = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [from, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], still ? [1, 1] : [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [from / 40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity, rotate }}
      className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6"
    >
      <dt className="font-medium text-ink sm:pt-1">{group.category}</dt>
      <dd>
        <ul className="flex flex-wrap gap-2">
          {group.items.map((s) => (
            <li
              key={s.name}
              className="rounded-full border border-line bg-surface/60 px-3 py-1 text-sm text-muted transition-colors duration-200 hover:border-accent/50 hover:text-ink"
            >
              {s.name}
            </li>
          ))}
        </ul>
      </dd>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <ScrollSection id="skills" className="overflow-x-clip px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionTitle index={3}>What I work with</SectionTitle>
        <dl className="divide-y divide-line border-y border-line">
          {groups.map((g, i) => (
            <SkillRow key={g.category} group={g} index={i} />
          ))}
        </dl>
      </div>
    </ScrollSection>
  );
}
