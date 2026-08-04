import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { experience, education } from "../data/content";

function TimelineList({ items, icon: Icon }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-[9px] top-2 bottom-2 w-px bg-line" />
      <div className="space-y-8">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-8 top-1 flex h-[19px] w-[19px] items-center justify-center rounded-full bg-bg border border-gold">
              <Icon size={10} className="text-gold" />
            </span>
            <div className="glass rounded-xl p-5 hover:border-gold/40 transition-colors">
              <p className="font-mono text-xs text-gold mb-1">{item.period}</p>
              <h4 className="font-display text-lg font-semibold text-ink">
                {item.title}
              </h4>
              <p className="text-sm text-muted mt-1">{item.org}</p>
              {item.description && (
                <p className="text-sm text-muted mt-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel status={200} route="/experience" title="Experience & Education" />
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-mono text-xs text-muted uppercase tracking-wide mb-6 flex items-center gap-2">
              <Briefcase size={14} className="text-gold" /> Experience
            </p>
            <TimelineList items={experience} icon={Briefcase} />
          </div>
          <div>
            <p className="font-mono text-xs text-muted uppercase tracking-wide mb-6 flex items-center gap-2">
              <GraduationCap size={14} className="text-violet" /> Education
            </p>
            <TimelineList items={education} icon={GraduationCap} />
          </div>
        </div>
      </div>
    </section>
  );
}
