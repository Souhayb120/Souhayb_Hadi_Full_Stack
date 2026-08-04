import { motion } from "framer-motion";

const statusMeta = {
  200: { text: "OK", color: "text-gold" },
  201: { text: "CREATED", color: "text-amber" },
  102: { text: "PROCESSING", color: "text-violet" },
};

export default function SectionLabel({ status = 200, route, title }) {
  const meta = statusMeta[status] ?? statusMeta[200];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-10"
    >
      <div className="flex items-center gap-3 font-mono text-xs text-muted mb-3">
        <span className={`${meta.color} font-semibold`}>{status}</span>
        <span>{meta.text}</span>
        <span className="h-px flex-1 max-w-16 bg-line" />
        <span>{route}</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
    </motion.div>
  );
}
