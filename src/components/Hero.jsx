import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/content";
import useScrollWobble from "../hooks/useScrollWobble";
import { Scribble } from "./motion";
import { burst, burstFrom } from "../lib/fun";
import { ease } from "./motionTokens";
import resumePdf from "../assets/CV_Full_Stack_Developer_Souhayb_Hadi_V5-DOUc76HB.pdf";
import avatarAvif200 from "../assets/avatar-200.avif";
import avatarAvif400 from "../assets/avatar-400.avif";
import avatarWebp200 from "../assets/avatar-200.webp";
import avatarWebp400 from "../assets/avatar-400.webp";
import avatarFallback from "../assets/avatar-400.jpg";

const rise = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
});

// same entrance as rise(), done in CSS (.rise) so the prerendered text shows before JS loads
const riseDelay = (delay) => ({ animationDelay: `${delay}s` });

const NOTES = [
  "that's me!",
  "200 OK — still here",
  "fully tested, I promise",
  "available for hire, btw",
  "no bugs found (yet)",
  "now try dragging my name",
];

// letters you can grab and fling — they spring back home
function RubberWord({ text }) {
  return (
    <span className="inline-block whitespace-nowrap">
      <span className="sr-only">{text}</span>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          drag
          dragSnapToOrigin
          dragElastic={0.7}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 9 }}
          whileHover={{ y: -12, rotate: i % 2 ? 10 : -10, color: "var(--color-accent)" }}
          whileDrag={{ scale: 1.35, rotate: i % 2 ? 25 : -25, color: "var(--color-accent)" }}
          transition={{ type: "spring", stiffness: 500, damping: 10 }}
          className="inline-block cursor-grab touch-none active:cursor-grabbing"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [spins, setSpins] = useState(0);
  const tickle = (e) => {
    setSpins((s) => s + 1);
    burstFrom(e.currentTarget, 24);
  };

  // floppy spring so the photo overshoots and sways back like it's hanging
  const swing = useScrollWobble(10, { stiffness: 90, damping: 6, mass: 0.8 });

  // as you scroll past, the hero drifts up, shrinks a touch and fades out
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const driftY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [0, -120]);
  const driftScale = useTransform(scrollYProgress, [0, 1], still ? [1, 1] : [1, 0.94]);
  const driftOpacity = useTransform(scrollYProgress, [0, 0.85], still ? [1, 1] : [1, 0]);

  return (
    <section id="hero" ref={ref} className="px-6 pt-32 pb-20 md:pt-40 md:pb-28">
      <motion.div
        style={{ y: driftY, scale: driftScale, opacity: driftOpacity, transformOrigin: "50% 0%" }}
        className="mx-auto max-w-3xl"
      >
        {/* photo, pinned like a print — it swings when you scroll fast */}
        <div className="flex items-end gap-3">
          <motion.div style={{ rotate: swing, transformOrigin: "50% 0%" }} className="relative shrink-0">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          />
          {/* click me: full spin + confetti, and the note gets more exasperated */}
          <motion.div
            animate={{ rotateY: spins * 360, scale: spins ? [1, 1.25, 1] : 1 }}
            transition={{ rotateY: { type: "spring", stiffness: 60, damping: 11 }, scale: { duration: 0.6 } }}
            style={{ transformPerspective: 600 }}
          >
          <motion.figure
            onClick={tickle}
            initial={{ opacity: 0, rotate: -8, y: 20 }}
            animate={{ opacity: 1, rotate: -3, y: 0 }}
            whileHover={{ rotate: [-3, 3, -2, 2, 0], scale: 1.04, transition: { duration: 0.5 } }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.1 }}
            className="w-32 cursor-pointer select-none rounded-sm bg-[#f5f2ea] p-1.5 pb-5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] md:w-36"
          >
            <picture>
              <source type="image/avif" srcSet={`${avatarAvif200} 200w, ${avatarAvif400} 400w`} sizes="144px" />
              <source type="image/webp" srcSet={`${avatarWebp200} 200w, ${avatarWebp400} 400w`} sizes="144px" />
              <img
                src={avatarFallback}
                alt={profile.name}
                width="200"
                height="200"
                fetchPriority="high"
                decoding="async"
                className="aspect-square w-full object-cover object-top"
              />
            </picture>
          </motion.figure>
          </motion.div>
          </motion.div>

          <motion.div {...rise(0.6)} className="mb-6 flex items-center gap-1 text-accent">
            <svg width="44" height="28" viewBox="0 0 44 28" fill="none" aria-hidden="true">
              <motion.path
                d="M42 6 C 30 2, 14 4, 6 18 M6 18 L 4 9 M6 18 L 14 15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeInOut" }}
              />
            </svg>
            <AnimatePresence mode="wait">
              <motion.span
                key={spins}
                initial={{ opacity: 0, y: 10, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -10, rotate: 6 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="font-hand text-2xl leading-none"
              >
                {NOTES[spins % NOTES.length]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        <p
          style={riseDelay(0.15)}
          className="rise mt-10 inline-flex items-center gap-2 rounded-full border border-aurora/30 bg-aurora/10 px-3 py-1 text-[13px] font-medium text-aurora"
        >
          <span aria-hidden="true" className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora" />
          </span>
          Open to full-stack roles
        </p>

        <h1
          style={riseDelay(0.2)}
          className="rise mt-5 font-display text-[2.6rem] font-normal leading-[1.1] tracking-tight text-ink md:text-6xl"
        >
          Hi, I'm <RubberWord text="Souhayb" />. I build web apps with <Scribble onMount delay={1}>Java</Scribble> and React.
        </h1>

        <p style={riseDelay(0.35)} className="rise mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          I'm a full-stack developer from {profile.location}, and I recently completed my Full Stack training at Ahmed El Hansali
          Digital School. Most of what I build sits on the backend: Spring Boot APIs, JWT auth, and
          MySQL or PostgreSQL databases kept in order with Flyway. Then a React front-end on top.
        </p>

        <div style={riseDelay(0.5)} className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
          <motion.a
            href={resumePdf}
            download="Souhayb_Hadi_CV.pdf"
            onClick={(e) => burst(e.clientX, e.clientY, 36)}
            whileHover={{ y: -2, rotate: [0, -3, 3, 0] }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-accent px-5 py-2.5 font-medium text-bg transition-colors hover:bg-ink"
          >
            Download my CV
          </motion.a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="link">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link">LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="link">Email</a>
        </div>
      </motion.div>
    </section>
  );
}
