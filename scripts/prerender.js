// Runs after the client + SSR builds: renders the page into dist/index.html,
// inlines the (small) stylesheet and starts the JS only after the first paint,
// so nothing stands between the HTML and the first frame.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const ssrDir = fileURLToPath(new URL("../dist-ssr/", import.meta.url));

const { render } = await import(pathToFileURL(`${ssrDir}entry-server.js`).href);
const appHtml = await render();

let html = readFileSync(`${dist}index.html`, "utf8");
if (!html.includes("<!--app-html-->")) throw new Error("index.html is missing the <!--app-html--> marker");
html = html.replace("<!--app-html-->", () => appHtml);

html = html.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) => {
  const css = readFileSync(`${dist}${href.slice(1)}`, "utf8");
  // the hero's fonts (heading + body); Caveat only shows in small notes, so it loads normally
  const fonts = [...css.matchAll(/url\((\/assets\/(?:fraunces|inter)-latin-[^)]+\.woff2)\)/g)].map((m) => m[1]);
  const preloads = [...new Set(fonts)]
    .map((f) => `<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin>`)
    .join("");
  return `${preloads}<style>${css}</style>`;
});

// pull the entry script + its preloads out of <head> and inject them after the first frame
let entry;
const preloads = [];
html = html.replace(/\s*<script type="module" crossorigin src="([^"]+)"><\/script>/, (_, src) => ((entry = src), ""));
html = html.replace(/\s*<link rel="modulepreload" crossorigin href="([^"]+)">/g, (_, href) => (preloads.push(href), ""));
if (!entry) throw new Error("entry <script type=module> not found in dist/index.html");
const loader = `<script>requestAnimationFrame(function(){setTimeout(function(){${JSON.stringify(preloads)}.forEach(function(h){var l=document.createElement("link");l.rel="modulepreload";l.crossOrigin="";l.href=h;document.head.appendChild(l)});var s=document.createElement("script");s.type="module";s.crossOrigin="";s.src=${JSON.stringify(entry)};document.head.appendChild(s)})})</script>`;
html = html.replace("</body>", () => `${loader}\n  </body>`);

writeFileSync(`${dist}index.html`, html);
rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerendered dist/index.html (${(html.length / 1024).toFixed(1)} kB)`);
