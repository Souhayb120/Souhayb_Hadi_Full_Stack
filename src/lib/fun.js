// Tiny event bus for the silly stuff, so any component can trigger it without prop drilling.
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function burst(x, y, count = 28) {
  if (reduced()) return;
  window.dispatchEvent(new CustomEvent("fun:confetti", { detail: { x, y, count } }));
}

export function burstFrom(element, count) {
  const rect = element?.getBoundingClientRect();
  if (rect) burst(rect.left + rect.width / 2, rect.top + rect.height / 2, count);
}

export function barrelRoll() {
  if (reduced()) return;
  window.dispatchEvent(new Event("fun:barrel-roll"));
}
