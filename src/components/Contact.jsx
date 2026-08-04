import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Github, Linkedin, Mail, Phone } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { profile } from "../data/content";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Your name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.message.trim().length < 10)
      e.message = "Message should be at least 10 characters";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSent(true);
      setForm(initialForm);
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel status={200} route="/contact" title="Let's build something" />

        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 mb-6 font-mono text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              {profile.status}
            </div>
            <p className="text-muted leading-relaxed max-w-sm">
              Have a role, project, or idea in mind? I'd like to hear about
              it — reach out directly or send a message.
            </p>
            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm text-ink hover:text-gold transition-colors"
              >
                <Mail size={16} className="text-gold" /> {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm text-ink hover:text-gold transition-colors"
              >
                <Phone size={16} className="text-gold" /> {profile.phone}
              </a>
              <div className="flex items-center gap-2 pt-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg glass text-muted hover:text-ink transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg glass text-muted hover:text-ink transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="glass rounded-2xl p-6 md:p-8 space-y-5">
            <div>
              <label htmlFor="name" className="font-mono text-xs text-muted">
                Name
              </label>
              <input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1.5 w-full rounded-lg bg-surface-2 border border-line px-4 py-3 text-sm text-ink outline-none focus:border-gold transition-colors"
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
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1.5 w-full rounded-lg bg-surface-2 border border-line px-4 py-3 text-sm text-ink outline-none focus:border-gold transition-colors"
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
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1.5 w-full rounded-lg bg-surface-2 border border-line px-4 py-3 text-sm text-ink outline-none focus:border-gold transition-colors resize-none"
                placeholder="Tell me about the role or project..."
              />
              {errors.message && (
                <p className="mt-1 text-xs text-amber">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gold py-3 text-sm font-medium text-[#231a06] hover:bg-gold-dim transition-colors"
            >
              Send message
            </button>

            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 text-sm text-gold font-mono"
                >
                  <CheckCircle2 size={16} /> Looks good. This form isn't
                  connected to a server yet — email me directly and I'll
                  reply from there.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
