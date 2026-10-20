import { useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

// Maps scroll speed to a springy value in [-max, max].
// A soft spring (low damping) overshoots and wobbles back — that's the "jelly".
export default function useScrollWobble(max, spring = { stiffness: 260, damping: 26, mass: 0.6 }) {
  const still = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const springy = useSpring(velocity, spring);
  const range = still ? [0, 0, 0] : [-max, 0, max];
  return useTransform(springy, [-2500, 0, 2500], range, { clamp: true });
}
