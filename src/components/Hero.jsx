import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/content";
import profileImg from "../assets/profile.jpg";

const REQUEST_LINE = "GET /souhayb-hadi HTTP/1.1";

const RESPONSE_LINES = [
  '{',
  `  "role": "Full Stack Developer",`,
  `  "stack": ["Java", "Spring Boot", "React"],`,
  `  "location": "Béni Mellal, MA",`,
  `  "status": "${profile.status}"`,
  '}',
];

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(REQUEST_LINE.slice(0, i));
      if (i >= REQUEST_LINE.length) {
        clearInterval(interval);
        setTimeout(() => setShowResponse(true), 300);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-grid"
      style={{ "--mx": "50%", "--my": "40%" }}
    >
      {/* parallax portrait, blended into the background */}
      <motion.div
        aria-hidden="true"
        style={{ y: imgY, scale: imgScale }}
        className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[62%] will-change-transform"
      >
        <img
          src={profileImg}
          alt=""
          className="h-full w-full object-cover object-[75%_20%] opacity-30 md:opacity-45"
          style={{
            filter: "grayscale(1) contrast(1.1) brightness(0.75)",
            maskImage:
              "linear-gradient(to left, black 35%, transparent 92%), linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to top, black 85%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to left, black 35%, transparent 92%), linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to top, black 85%, transparent 100%)",
            WebkitMaskComposite: "source-in",
          }}
        />
        {/* duotone wash to keep it on-palette */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-violet/30 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      </motion.div>

      {/* ambient gradient mesh */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-gold) 12%, transparent), transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl animate-drift-slow" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-violet/10 blur-3xl animate-drift" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/40 to-transparent md:from-bg md:via-bg/10 md:to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-6xl w-full px-6 pt-28 pb-16 grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-center"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            {/* profile avatar — glowing ring */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="shrink-0 rounded-full bg-gradient-to-br from-gold to-violet p-[2.5px] gold-glow"
            >
              <img
                src={profileImg}
                alt={profile.name}
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover object-top border-2 border-bg"
              />
            </motion.div>

            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 font-mono text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              {profile.status}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02] text-glow"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 text-xl sm:text-2xl text-muted font-display"
          >
            {profile.role} <span className="text-gold">·</span> {profile.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 max-w-lg text-muted leading-relaxed"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-medium text-[#231a06] hover:bg-gold-dim transition-colors gold-glow"
            >
              View projects
            </a>
            <a
              href="/Souhayb_Hadi_Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg glass px-5 py-3 text-sm font-medium text-ink hover:border-gold/40 transition-colors"
            >
              <Download size={16} /> Resume
            </a>
            <div className="flex items-center gap-1 ml-1">
              {[
                { icon: Github, href: profile.github, label: "GitHub" },
                { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-lg text-muted hover:text-gold hover:bg-surface-2 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* terminal / API card — signature element */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass rounded-2xl overflow-hidden gold-glow"
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-muted">request.http</span>
          </div>
          <div className="p-5 font-mono text-sm leading-relaxed">
            <p className="text-ink">
              <span className="text-violet">{typed}</span>
              {!showResponse && <span className="caret" />}
            </p>
            {showResponse && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-muted mt-3">
                  HTTP/1.1 <span className="text-gold">200 OK</span>
                </p>
                <p className="text-muted">Content-Type: application/json</p>
                <div className="mt-3 space-y-0.5">
                  {RESPONSE_LINES.map((line, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                      className="text-ink whitespace-pre-wrap break-words"
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-gold transition-colors"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
