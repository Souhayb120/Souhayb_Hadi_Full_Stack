import { motion } from "framer-motion";
import { Languages, MapPin, GraduationCap, Sparkles } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { profile, languages, certifications } from "../data/content";

const facts = [
  {
    icon: MapPin,
    title: "Based in",
    detail: profile.location,
  },
  {
    icon: GraduationCap,
    title: "Currently",
    detail: "Full Stack Developer training at Ahmed El Hansali Digital School",
  },
  {
    icon: Sparkles,
    title: "Focused on",
    detail: "Secure REST APIs, clean architecture, and AI-assisted tooling",
  },
  {
    icon: Languages,
    title: "Languages",
    detail: languages.map((l) => l.name).join(" · "),
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel status={200} route="/about" title="About" />

        <div className="grid md:grid-cols-[1fr_0.9fr] gap-12 items-start">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl text-muted leading-relaxed"
          >
            I build full-stack applications the way I'd want to receive them as
            an API consumer: predictable, secure, and well-documented. On the
            backend that means Spring Boot services with layered
            architecture, JWT-based auth, and migrations tracked in Flyway. On
            the frontend, React interfaces that stay out of the user's way.
            I'm currently extending that toolkit into applied AI — retrieval,
            embeddings, and agents that call the same REST APIs I already
            build.
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-4">
            {facts.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-xl p-5 hover:border-gold/40 transition-colors group"
              >
                <f.icon
                  size={18}
                  className="text-gold mb-3 group-hover:scale-110 transition-transform"
                />
                <p className="font-mono text-xs text-muted uppercase tracking-wide">
                  {f.title}
                </p>
                <p className="mt-1.5 text-sm text-ink leading-relaxed">
                  {f.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {certifications.map((c) => (
              <span
                key={c.name}
                className="font-mono text-xs glass rounded-full px-4 py-2 text-muted"
              >
                <span className="text-amber">cert:</span> {c.name} · {c.issuer} ·{" "}
                {c.date}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
