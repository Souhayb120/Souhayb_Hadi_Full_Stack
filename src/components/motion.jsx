import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ease, viewport, fadeUp } from "./motionTokens";
import useScrollWobble from "../hooks/useScrollWobble";

// Section wrapper whose motion is tied to scroll position (not a one-off reveal):
// it tilts/rises in as it enters and sinks back as it leaves the top — both directions.
export function ScrollSection({ id, className, children }) {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.55"] });
  const { scrollYProgress: leave } = useScroll({ target: ref, offset: ["end 0.45", "end start"] });

  const y = useTransform(enter, [0, 1], still ? [0, 0] : [90, 0]);
  const rotateX = useTransform(enter, [0, 1], still ? [0, 0] : [10, 0]);
  const scale = useTransform([enter, leave], ([a, b]) => (still ? 1 : (0.92 + 0.08 * a) * (1 - 0.06 * b)));
  const opacity = useTransform([enter, leave], ([a, b]) => (still ? 1 : Math.min(1, 0.15 + a) * (1 - 0.75 * b)));

  return (
    <section id={id} ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div style={{ y, rotateX, scale, opacity, transformOrigin: "50% 0%" }}>{children}</motion.div>
    </section>
  );
}

export function Reveal({ as = "div", delay = 0, y = 16, className, children, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function Stagger({ as = "div", gap = 0.07, delay = 0, className, children, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function Item({ as = "div", variants = fadeUp, className, children, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp variants={variants} className={className} {...rest}>
      {children}
    </Comp>
  );
}

// A wobbly marker underline that draws itself in, like it was done by hand.
export function Scribble({ children, delay = 0.4, onMount = false }) {
  const trigger = onMount ? { animate: { pathLength: 1 } } : { whileInView: { pathLength: 1 }, viewport };
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.18em] left-[-2%] h-[0.32em] w-[104%] overflow-visible text-accent"
      >
        <motion.path
          d="M2 9 C 30 4, 55 12, 85 7 S 140 3, 165 8 S 192 10, 198 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          {...trigger}
          transition={{ duration: 0.9, ease: "easeInOut", delay }}
        />
      </svg>
    </span>
  );
}

// letters do a stadium wave when the parent is hovered; words stay together so lines can wrap
function WavyText({ text }) {
  let n = 0;
  return (
    <span>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, w) => (
        <Fragment key={w}>
          {/* the space sits between the word blocks: a trailing space inside an inline-block gets collapsed */}
          {w > 0 && <span aria-hidden="true"> </span>}
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            {word.split("").map((ch) => {
              const i = n++;
              return (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{
                    rest: { y: 0, rotate: 0 },
                    wave: {
                      y: [0, -10, 0],
                      rotate: [0, i % 2 ? 8 : -8, 0],
                      transition: { duration: 0.45, delay: i * 0.03 },
                    },
                  }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        </Fragment>
      ))}
    </span>
  );
}

export function SectionTitle({ children, note, index }) {
  const skewY = useScrollWobble(2.5);
  return (
    <Reveal className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
      {index && (
        <span aria-hidden="true" className="flex basis-full items-center gap-3 text-xs font-medium tracking-[0.2em] text-accent">
          {String(index).padStart(2, "0")}
          <span className="h-px w-10 bg-accent/40" />
        </span>
      )}
      <motion.h2
        initial="rest"
        whileHover="wave"
        style={{ skewY, transformOrigin: "left center" }}
        className="cursor-default font-display text-3xl font-medium tracking-tight text-ink md:text-4xl"
      >
        {typeof children === "string" ? <WavyText text={children} /> : children}
      </motion.h2>
      {note && <span className="font-hand text-xl text-muted">{note}</span>}
    </Reveal>
  );
}
