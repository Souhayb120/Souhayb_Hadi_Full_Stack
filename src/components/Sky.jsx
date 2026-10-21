import NightSky from "./NightSky";
import DaySky from "./DaySky";

// Both skies stay mounted; CSS shows the one matching <html data-theme> (see [data-sky] in
// index.css). Switching themes is then a style flip with nothing to build, so the reveal
// starts right away — and the prerendered page is already right for sunny visitors.
export default function Sky() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-0 h-lvh overflow-hidden">
      <div data-sky="night" className="absolute inset-0">
        <NightSky />
      </div>
      <div data-sky="day" className="absolute inset-0">
        <DaySky />
      </div>
    </div>
  );
}
