import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const COLORS = ["var(--color-accent)", "var(--color-aurora)", "#ffd166"];

// Little sparkles that fall off the cursor. Mouse/trackpad only.
export default function CursorTrail() {
  const [sparks, setSparks] = useState([]);
  const still = useReducedMotion();

  useEffect(() => {
    if (still || !window.matchMedia("(pointer: fine)").matches) return;

    let last = { x: 0, y: 0, t: 0 };
    let next = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - last.t < 40 || Math.hypot(e.clientX - last.x, e.clientY - last.y) < 16) return;
      last = { x: e.clientX, y: e.clientY, t: now };
      const id = next++;
      const spark = { id, x: e.clientX, y: e.clientY, tilt: Math.random() * 90, color: COLORS[id % COLORS.length] };
      setSparks((s) => [...s.slice(-20), spark]);
      setTimeout(() => setSparks((s) => s.filter((p) => p.id !== id)), 750);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [still]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[75]">
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          initial={{ x: s.x - 6, y: s.y - 6, scale: 1, opacity: 0.9, rotate: s.tilt }}
          animate={{ y: s.y + 22, scale: 0, opacity: 0, rotate: s.tilt + 140 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="absolute left-0 top-0 text-xs leading-none"
          style={{ color: s.color }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}
