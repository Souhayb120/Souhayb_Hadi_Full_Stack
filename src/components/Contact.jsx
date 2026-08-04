import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Phone,
} from "lucide-react";
import SectionLabel from "./SectionLabel";
import { profile } from "../data/content";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyeggnrn";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const validate = () => {
    const e = {};

    if (!form.name.trim()) {
      e.name = "Your name is required";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = "Enter a valid email";
    }

    if (form.message.trim().length < 10) {
      e.message = "Message should be at least 10 characters";
    }

    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (status === "sending") return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || data.errors) {
        throw new Error("Request failed");
      }

      setStatus("sent");
      setForm(initialForm);
      setErrors({});

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel
          status={200}
          route="/contact"
          title="Let's build something"
        />

        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 font-mono text-xs text-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              {profile.status}
            </div>

            <p className="max-w-sm leading-relaxed text-muted">
              Have a role, project, or idea in mind? I'd love to hear about it.
              Reach out directly or send me a message.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm text-ink transition-colors hover:text-gold"
              >
                <Mail size={16} className="text-gold" />
                {profile.email}
              </a>

              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm text-ink transition-colors hover:text-gold"
              >
                <Phone size={16} className="text-gold" />
                {profile.phone}
              </a>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg glass p-2.5 text-muted transition-colors hover:text-ink"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg glass p-2.5 text-muted transition-colors hover:text-ink"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass space-y-5 rounded-2xl p-6 md:p-8"
          >
            <div>
              <label htmlFor="name" className="font-mono text-xs text-muted">
                Name
              </label>

              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });

                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: "" }));
                  }
                }}
                className="mt-1.5 w-full rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                placeholder="Your name"
              />

              {errors.name && (
                <p className="mt-1 text-xs text-amber">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="font-mono text-xs text-muted">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });

                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }
                }}
                className="mt-1.5 w-full rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                placeholder="you@example.com"
              />

              {errors.email && (
                <p className="mt-1 text-xs text-amber">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="font-mono text-xs text-muted">
                Message
              </label>

              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => {
                  setForm({ ...form, message: e.target.value });

                  if (errors.message) {
                    setErrors((prev) => ({ ...prev, message: "" }));
                  }
                }}
                className="mt-1.5 w-full resize-none rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                placeholder="Tell me about the role or project..."
              />

              {errors.message && (
                <p className="mt-1 text-xs text-amber">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3 text-sm font-medium text-[#231a06] transition-colors hover:bg-gold-dim disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" && (
                <Loader2 size={16} className="animate-spin" />
              )}

              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            <AnimatePresence mode="wait">
              {status === "sent" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 font-mono text-sm text-gold"
                >
                  <CheckCircle2 size={16} />
                  Message sent successfully. I'll get back to you soon.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 font-mono text-sm text-amber"
                >
                  <AlertCircle size={16} />
                  Something went wrong. Please email me directly at{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="underline hover:text-gold"
                  >
                    {profile.email}
                  </a>
                  .
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}