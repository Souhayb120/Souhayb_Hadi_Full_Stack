import { AnimatePresence, motion } from "framer-motion";
import NightSky from "./NightSky";
import DaySky from "./DaySky";
import { supportsViewTransition } from "../hooks/useTheme";

// With view transitions the reveal already blends the skies, so swap instantly.
// Otherwise the new sky fades in *over* the old one (which stays opaque until it's
// covered), so there's no half-transparent dip in the middle of the switch.
const FADE = supportsViewTransition ? 0 : 0.8;

export default function Sky({ theme }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0, zIndex: 1 }}
          animate={{ opacity: 1, zIndex: 1 }}
          exit={{ opacity: 1, zIndex: 0, transition: { duration: FADE } }}
          transition={{ duration: FADE, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {theme === "day" ? <DaySky /> : <NightSky />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
