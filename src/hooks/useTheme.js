import { useCallback, useEffect, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

const THEME_COLOR = { night: "#0a0e1a", day: "#dce5f0" };
const DURATION = 800;

// Browsers with the View Transitions API get a circular reveal from the toggle;
// the others fall back to a color + sky crossfade.
export const supportsViewTransition =
  typeof document !== "undefined" && typeof document.startViewTransition === "function";

function readStored() {
  try {
    return localStorage.getItem("theme") === "day" ? "day" : "night";
  } catch {
    return "night";
  }
}

// Tiny store so the prerendered HTML (always night) hydrates cleanly and then
// switches to the stored theme without a hydration mismatch.
let current = typeof window === "undefined" ? "night" : readStored();
const listeners = new Set();
const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const setTheme = (next) => {
  current = next;
  listeners.forEach((fn) => fn());
};

export default function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => current, () => "night");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // storage blocked (private mode) — the toggle still works for this visit
    }
  }, [theme]);

  const toggle = useCallback((event) => {
    const root = document.documentElement;
    const next = current === "night" ? "day" : "night";
    const apply = () => {
      root.dataset.theme = next;
      flushSync(() => setTheme(next));
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsViewTransition || reduceMotion) {
      // fade every color for the switch only, so normal hovers stay snappy
      root.classList.add("theme-switching");
      apply();
      setTimeout(() => root.classList.remove("theme-switching"), DURATION);
      return;
    }

    // grow the new theme out of the toggle button
    const rect = event?.currentTarget?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 32;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: DURATION,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }, []);

  return { theme, toggle };
}
