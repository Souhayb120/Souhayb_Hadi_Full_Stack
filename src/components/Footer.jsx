import { profile } from "../data/content";
import { scrollToTarget } from "../lib/scroll";

export default function Footer() {
  return (
    <footer className="px-6 pb-10 pt-6">
      <div className="mx-auto flex max-w-3xl flex-col justify-between gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Made in {profile.location.split(",")[0]}.
        </p>
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget("top");
          }}
          className="link text-muted"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}
