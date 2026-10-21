import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import App from "./App.jsx";

// Build-time render of the whole page (lazy sections included) so the first paint
// doesn't wait for the JS bundle. See scripts/prerender.js.
export async function render() {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <App />
    </StrictMode>,
    // keep every section inline instead of outlining it into a script-swapped chunk
    { progressiveChunkSize: Infinity }
  );
  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}
