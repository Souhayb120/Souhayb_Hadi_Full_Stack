import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { scrollToTarget } from "../lib/scroll";

// Little corner companion: fills a ring as you read, spins as you scroll,
// and takes you back up (with enthusiasm) when clicked.
export default function ScrollBuddy({ theme }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [wheee, setWheee] = useState(false);

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const spin = useTransform(scrollY, [0, 3000], [0, 540]);

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > 500);
    if (y < 40) setWheee(false);
  });

  const goUp = () => {
    setWheee(true);
    scrollToTarget("top");
  };

  const Icon = theme === "day" ? Sun : Moon;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, rotate: -120, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
          className="fixed bottom-5 right-5 z-40 md:bottom-8 md:right-8"
        >
          <AnimatePresence>
            {wheee && (
              <motion.span
                initial={{ opacity: 0, y: 10, rotate: -8 }}
                animate={{ opacity: 1, y: -6, rotate: -4 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ type: "spring", stiffness: 300, damping: 14 }}
                className="pointer-events-none absolute -top-9 right-1 whitespace-nowrap font-hand text-2xl text-accent"
              >
                wheee!
              </motion.span>
            )}
          </AnimatePresence>

          <motion.button
            onClick={goUp}
            aria-label="Back to top"
            title="Back to top"
            whileHover={{ scale: 1.12, rotate: [0, -12, 10, -6, 0], transition: { duration: 0.5 } }}
            whileTap={{ scale: 0.85 }}
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface/80 text-accent shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur"
          >
            <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
              <motion.circle
                cx="24"
                cy="24"
                r="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength: progress }}
              />
            </svg>
            <motion.span style={{ rotate: spin }} className="flex">
              <Icon size={18} />
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
