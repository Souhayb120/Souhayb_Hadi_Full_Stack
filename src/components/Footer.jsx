import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-6 py-10">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with React & Tailwind.
        </p>

        <div className="flex items-center gap-1">
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
              <Icon size={16} />
            </a>
          ))}
        </div>

        <a
          href="#hero"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-ink transition-colors"
        >
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
