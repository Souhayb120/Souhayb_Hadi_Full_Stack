// Shared motion vocabulary — kept deliberately calm.
export const ease = [0.25, 0.8, 0.3, 1];
export const viewport = { once: true, margin: "-10% 0px" };

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const hoverSpring = { type: "spring", stiffness: 300, damping: 24 };
