# Souhayb Hadi — Developer Portfolio

A single-page portfolio built with React, Vite, Tailwind CSS v4, and Framer Motion. Design direction: dark, glassmorphic, and built around an "HTTP request/response" motif — the hero renders a live `GET /souhayb-hadi` request resolving to a `200 OK`, and every section is labeled like a status line (`200 OK · /skills`, `102 PROCESSING · /ai-roadmap`) to tie the visual language to REST APIs, JWT and status codes.

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build       # production build -> dist/
npm run preview     # preview the production build
```

Requires Node 18+.

## Stack

- **React 19 + Vite** — app shell and build tooling
- **Tailwind CSS v4** — styling, using the CSS-first `@theme` config in `src/index.css`
- **Framer Motion** — scroll reveals, stagger, tilt-hover, layout animations, scroll progress bar
- **Lenis** — smooth-scroll (`src/hooks/useLenis.js`)
- **lucide-react** — icons
- A small hand-rolled `<canvas>` particle network powers the background in the AI section (`src/components/AISection.jsx`) — no extra 3D library needed for that effect.

All animations respect `prefers-reduced-motion`.

## Project structure

```
src/
  data/content.js       # ALL resume content lives here — edit this file to update copy
  components/           # one component per section
  hooks/                # useLenis (smooth scroll), useCountUp (animated stats)
  index.css             # design tokens (colors, fonts) + small utility classes
```

## Customizing

- **Content** (name, projects, skills, experience, etc.) — edit `src/data/content.js` only. Nothing else needs to change for a copy update.
- **Colors / fonts** — edit the `@theme` block at the top of `src/index.css`.
- **Resume download** — the hero's "Resume" button links to `/Souhayb_Hadi_Resume.pdf`. Drop your PDF into `public/` with that filename (or update the `href` in `src/components/Hero.jsx`) to make the download work.
- **Contact form** — it's client-side only (validates and shows a confirmation state) with no backend wired up. To actually receive messages, connect it to a form service (e.g. Formspree, Resend) or your own API endpoint inside `src/components/Contact.jsx`'s `handleSubmit`.

## Deploying

The build output in `dist/` is fully static — drag-and-drop it onto Vercel, Netlify, GitHub Pages, or any static host. On Vercel/Netlify, the default settings (`npm run build`, output directory `dist`) work with no extra config.

## Notes on scope

This implements the design brief's direction (dark glassmorphism, heavy scroll-triggered motion, interactive skill/project cards, animated counters, timeline, AI section) using Framer Motion + CSS rather than Three.js/GSAP/R3F, to keep the bundle lean and the animations reliable across devices. If you want true 3D (e.g. a WebGL hero background), that's a natural next addition on top of this structure.
