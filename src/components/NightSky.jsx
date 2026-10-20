import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// seeded so the sky is the same on every visit (and every render)
function seeded(i, n) {
  const x = Math.sin(i * 9301 + n * 49297) * 233280;
  return x - Math.floor(x);
}

const makeStars = (count, layer) =>
  Array.from({ length: count }, (_, i) => ({
    x: seeded(i + layer * 100, 1) * 100,
    y: seeded(i + layer * 100, 2) * 140, // taller than the viewport so parallax never shows an edge
    size: layer === 2 ? 2 : layer === 1 ? 1.5 : 1,
    delay: seeded(i + layer * 100, 3) * 6,
    duration: 3 + seeded(i + layer * 100, 4) * 4,
  }));

const LAYERS = [
  { stars: makeStars(70, 0), drift: -60 },
  { stars: makeStars(35, 1), drift: -140 },
  { stars: makeStars(12, 2), drift: -240 },
];

const SHOOTING = [
  { top: "12%", left: "62%", delay: 3, repeatDelay: 11 },
  { top: "30%", left: "20%", delay: 9, repeatDelay: 15 },
];

function StarLayer({ stars, drift, scrollY, still }) {
  const y = useTransform(scrollY, [0, 3000], [0, drift]);
  return (
    <motion.div style={{ y }} className="absolute inset-x-0 top-0 h-[140vh]">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.2 }}
          animate={still ? { opacity: 0.5 } : { opacity: [0.15, 0.85, 0.15] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full bg-ink"
          style={{ left: `${s.x}%`, top: `${s.y / 1.4}%`, width: s.size, height: s.size }}
        />
      ))}
    </motion.div>
  );
}

export default function NightSky() {
  const still = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  // travels across the sky over the whole page: rises top-right, sets bottom-left by the footer
  const moonX = useTransform(scrollYProgress, [0, 1], still ? ["0vw", "0vw"] : ["0vw", "-72vw"]);
  const moonY = useTransform(scrollYProgress, [0, 0.5, 1], still ? ["0vh", "0vh", "0vh"] : ["0vh", "6vh", "52vh"]);

  return (
    <div className="absolute inset-0">
      {/* sky gradient: a touch lighter near the horizon */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-bg) 0%, color-mix(in oklab, var(--color-bg) 85%, #1b2a55) 100%)",
        }}
      />

      {/* aurora haze — radial gradients instead of blur filters to keep it cheap */}
      <motion.div
        animate={still ? undefined : { x: ["-6%", "6%", "-6%"], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-1/4 top-[-10%] h-[70vh] w-[90vw]"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--color-aurora) 13%, transparent), transparent 65%)",
        }}
      />
      <motion.div
        animate={still ? undefined : { x: ["5%", "-5%", "5%"], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-1/4 top-[15%] h-[60vh] w-[80vw]"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--color-accent) 11%, transparent), transparent 65%)",
        }}
      />

      {LAYERS.map((layer, i) => (
        <StarLayer key={i} {...layer} scrollY={scrollY} still={still} />
      ))}

      {/* moon */}
      <motion.div
        style={{ x: moonX, y: moonY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute right-[8%] top-[9%] md:right-[12%]"
      >
        <motion.div
          animate={still ? undefined : { scale: [1, 1.12, 1], opacity: [0.55, 0.8, 0.55] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-16 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 70%)",
          }}
        />
        <div
          className="relative h-14 w-14 rounded-full md:h-20 md:w-20"
          style={{
            background: "radial-gradient(circle at 35% 35%, #f4f6ff, #c9d3f5 60%, #9fadd9)",
            boxShadow: "inset -10px -8px 0 0 rgba(10,14,26,0.18)",
            opacity: 0.85,
          }}
        />
      </motion.div>

      {/* shooting stars */}
      {!still &&
        SHOOTING.map((s, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], x: [0, -260], y: [0, 160] }}
            transition={{ duration: 1.1, delay: s.delay, repeat: Infinity, repeatDelay: s.repeatDelay, ease: "easeOut" }}
            className="absolute h-px w-24 origin-right"
            style={{
              rotate: -32,
              top: s.top,
              left: s.left,
              background: "linear-gradient(to left, transparent, var(--color-ink))",
            }}
          />
        ))}

      {/* fade the bottom so content sections sit on calmer sky */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/70 to-transparent" />
    </div>
  );
}
