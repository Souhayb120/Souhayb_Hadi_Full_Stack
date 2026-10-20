import { useEffect } from "react";
import { setLenis } from "../lib/scroll";

export default function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReduced || coarsePointer) return;

    let cancelled = false;
    let lenis;
    let raf;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        lerp: 0.085, // lower = silkier glide
        smoothWheel: true,
        wheelMultiplier: 0.95,
        anchors: { offset: -72 },
      });
      setLenis(lenis);

      const loop = (time) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };

      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      setLenis(null);
      lenis?.destroy();
    };
  }, []);
}
