import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["var(--color-accent)", "var(--color-aurora)", "var(--color-rose)", "#ffd166"];

function makePieces(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 80 + Math.random() * 170;
    const round = Math.random() > 0.5;
    return {
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed - 130, // bias upward, gravity pulls it back down
      spin: (Math.random() - 0.5) * 900,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 6,
      round,
    };
  });
}

export default function Confetti() {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const onBurst = (e) => {
      const { x, y, count } = e.detail;
      const id = `${Date.now()}-${Math.random()}`;
      setBursts((b) => [...b, { id, x, y, pieces: makePieces(count) }]);
      setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 1700);
    };
    window.addEventListener("fun:confetti", onBurst);
    return () => window.removeEventListener("fun:confetti", onBurst);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {bursts.map((b) =>
        b.pieces.map((p, i) => (
          <motion.span
            key={`${b.id}-${i}`}
            initial={{ x: b.x, y: b.y, rotate: 0, opacity: 1 }}
            animate={{
              x: [b.x, b.x + p.dx * 0.7, b.x + p.dx],
              y: [b.y, b.y + p.dy, b.y + p.dy + 300],
              rotate: p.spin,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 1.5, times: [0, 0.35, 1], ease: ["easeOut", "easeIn"] }}
            className="absolute left-0 top-0"
            style={{
              width: p.size,
              height: p.round ? p.size : p.size * 0.45,
              background: p.color,
              borderRadius: p.round ? 9999 : 2,
            }}
          />
        ))
      )}
    </div>
  );
}
