import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { ScrollSection, SectionTitle, Reveal, Stagger, Item } from "./motion";
import { profile } from "../data/content";
import { burstFrom } from "../lib/fun";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyeggnrn";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

const fields = [
  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { id: "message", label: "Message", placeholder: "Tell me about the role or project...", multiline: true },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const submitRef = useRef(null);

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
      burstFrom(submitRef.current, 48);
      setForm(initialForm);
      setErrors({});

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch {
      setStatus("error");
    }
  };

  const update = (id, value) => {
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <ScrollSection id="contact" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionTitle>Get in touch</SectionTitle>

        <Reveal as="p" className="max-w-2xl text-lg leading-relaxed text-muted">
          Have a role, project, or idea in mind? I'd love to hear about it. Email me at{" "}
          <a href={`mailto:${profile.email}`} className="link">
            {profile.email}
          </a>
          , call {profile.phone}, or use the form below.
        </Reveal>

        <Stagger
          as="form"
          onSubmit={handleSubmit}
          noValidate
          className="mt-10 grid gap-5 rounded-2xl border border-line bg-surface/50 p-6 sm:grid-cols-2 md:p-8"
        >
          {fields.map((f) => {
            const Field = f.multiline ? "textarea" : "input";
            return (
              <Item key={f.id} className={f.multiline ? "sm:col-span-2" : ""}>
                <label htmlFor={f.id} className="mb-1.5 block text-sm text-muted">
                  {f.label}
                </label>
                <Field
                  id={f.id}
                  type={f.type}
                  rows={f.multiline ? 5 : undefined}
                  value={form[f.id]}
                  onChange={(e) => update(f.id, e.target.value)}
                  placeholder={f.placeholder}
                  aria-invalid={Boolean(errors[f.id])}
                  className={`field ${f.multiline ? "resize-none" : ""}`}
                />
                <AnimatePresence>
                  {errors[f.id] && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-1.5 text-sm text-rose"
                    >
                      {errors[f.id]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </Item>
            );
          })}

          <Item className="flex flex-wrap items-center gap-4 sm:col-span-2">
            <motion.button
              ref={submitRef}
              type="submit"
              disabled={status === "sending"}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-medium text-bg transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" && <Loader2 size={16} className="animate-spin" />}
              {status === "sending" ? "Sending..." : "Send message"}
            </motion.button>

            <AnimatePresence mode="wait">
              {status === "sent" && (
                <motion.p
                  key="sent"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-sm text-aurora"
                >
                  <CheckCircle2 size={16} />
                  Thanks! I'll get back to you soon.
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-wrap items-center gap-2 text-sm text-rose"
                >
                  <AlertCircle size={16} />
                  Something went wrong. Please email me directly at{" "}
                  <a href={`mailto:${profile.email}`} className="underline">
                    {profile.email}
                  </a>
                </motion.p>
              )}
            </AnimatePresence>
          </Item>
        </Stagger>
      </div>
    </ScrollSection>
  );
}
