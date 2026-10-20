// One place for "take me to X" so every jump feels the same.
let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

// ease-out with a small overshoot: glides past the target a touch, then settles back
const bouncyLanding = (t) => {
  const c = 0.5;
  const u = t - 1;
  return 1 + (c + 1) * u * u * u + c * u * u;
};

const HEADER_OFFSET = -72;

export function scrollToTarget(target) {
  const el = typeof target === "string" ? document.getElementById(target) : target;
  const toTop = target === "top" || target === "hero";

  if (lenis) {
    lenis.scrollTo(toTop ? 0 : el, {
      offset: toTop ? 0 : HEADER_OFFSET,
      duration: 1.5,
      easing: bouncyLanding,
    });
    return;
  }

  // touch devices / reduced motion: native smooth scroll
  if (toTop) window.scrollTo({ top: 0, behavior: "smooth" });
  else el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
