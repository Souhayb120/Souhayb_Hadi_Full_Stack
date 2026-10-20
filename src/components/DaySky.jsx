import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const CLOUDS = [
  { top: "8%", left: "6%", scale: 1.1, sway: 70, duration: 48, depth: -80 },
  { top: "22%", left: "58%", scale: 0.8, sway: 90, duration: 62, depth: -140 },
  { top: "46%", left: "-4%", scale: 1.4, sway: 60, duration: 75, depth: -220 },
  { top: "64%", left: "70%", scale: 1, sway: 80, duration: 55, depth: -160 },
  { top: "84%", left: "28%", scale: 0.7, sway: 100, duration: 68, depth: -260 },
];

function Cloud({ top, left, scale, sway, duration, depth, scrollY, still }) {
  const y = useTransform(scrollY, [0, 3000], [0, depth]);
  return (
    <motion.div style={{ top, left, y, scale }} className="absolute">
      <motion.div
        animate={still ? undefined : { x: [0, sway, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-14 w-48 opacity-55"
      >
        {/* three puffs on a flat base */}
        <span className="absolute bottom-0 left-0 h-9 w-48 rounded-full bg-[#eef3f9]" />
        <span className="absolute bottom-3 left-8 h-14 w-16 rounded-full bg-[#eef3f9]" />
        <span className="absolute bottom-2 left-20 h-[4.5rem] w-20 rounded-full bg-[#eef3f9]" />
      </motion.div>
    </motion.div>
  );
}

function Birds() {
  return (
    <motion.div
      initial={{ x: "-10vw" }}
      animate={{ x: "110vw" }}
      transition={{ duration: 22, repeat: Infinity, repeatDelay: 14, ease: "linear", delay: 4 }}
      className="absolute left-0 top-[18%] flex gap-3 text-ink/40"
    >
      {[0, 1, 2].map((i) => (
        <motion.svg
          key={i}
          width="18"
          height="8"
          viewBox="0 0 18 8"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          style={{ marginTop: i === 1 ? -8 : 0 }}
        >
          <path d="M1 6 Q 5 1, 9 5 Q 13 1, 17 6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </motion.svg>
      ))}
    </motion.div>
  );
}

export default function DaySky() {
  const still = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  // travels across the sky over the whole page: rises top-right, sets bottom-left by the footer
  const sunX = useTransform(scrollYProgress, [0, 1], still ? ["0vw", "0vw"] : ["0vw", "-72vw"]);
  const sunY = useTransform(scrollYProgress, [0, 0.5, 1], still ? ["0vh", "0vh", "0vh"] : ["0vh", "6vh", "52vh"]);

  return (
    <div className="absolute inset-0">
      {/* sky: hazy blue overhead, fading into the page color */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #a8c2e0 0%, #c4d5ea 35%, var(--color-bg) 80%)" }}
      />

      {/* sun */}
      <motion.div style={{ x: sunX, y: sunY }} className="absolute right-[8%] top-[8%] md:right-[12%]">
        <motion.div
          animate={still ? undefined : { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-24 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,214,120,0.28), transparent 70%)" }}
        />
        <motion.svg
          viewBox="0 0 100 100"
          animate={still ? undefined : { rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-8 text-[#f0c45a]"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <line
              key={i}
              x1="50"
              y1="4"
              x2="50"
              y2="14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${i * 30} 50 50)`}
              opacity="0.7"
            />
          ))}
        </motion.svg>
        <div
          className="relative h-16 w-16 rounded-full md:h-20 md:w-20"
          style={{ background: "radial-gradient(circle at 40% 38%, #fbf3d2, #f3d98a 55%, #e9c25e)" }}
        />
      </motion.div>

      {CLOUDS.map((c, i) => (
        <Cloud key={i} {...c} scrollY={scrollY} still={still} />
      ))}

      {!still && <Birds />}
    </div>
  );
}
