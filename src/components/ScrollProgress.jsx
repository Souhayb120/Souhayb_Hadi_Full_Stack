import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    mass: 0.3,
  });

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="
          fixed
          top-0
          left-0
          right-0
          h-[3px]
          origin-left
          z-[9999]
          bg-gradient-to-r
          from-cyan-400
          via-violet-500
          to-amber-400
          shadow-[0_0_18px_rgba(59,130,246,.8)]
        "
      />
    </>
  );
}