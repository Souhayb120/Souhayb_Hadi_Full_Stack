import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ theme, onToggle }) {
  const day = theme === "day";

  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.92 }}
      role="switch"
      aria-checked={day}
      aria-label={day ? "Switch to night mode" : "Switch to sunny mode"}
      title={day ? "Night mode" : "Sunny mode"}
      className={`relative flex h-8 w-[3.75rem] shrink-0 items-center rounded-full border border-line p-1 transition-colors ${
        day ? "justify-end bg-[#b7cbe3]" : "justify-start bg-surface-2"
      }`}
    >
      {/* knob slides via layout animation when justify flips */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`flex h-6 w-6 items-center justify-center rounded-full shadow-sm ${
          day ? "bg-[#f1d98f] text-[#6b4c06]" : "bg-[#dfe5ff] text-[#26325c]"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            {day ? <Sun size={14} strokeWidth={2.4} /> : <Moon size={13} strokeWidth={2.4} />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
}
