import { ScrollSection, SectionTitle, Reveal, Stagger, Item } from "./motion";
import { languages, certifications } from "../data/content";

export default function About() {
  return (
    <ScrollSection id="about" className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionTitle>About</SectionTitle>

        <div className="space-y-5 text-lg leading-relaxed text-muted">
          <Reveal as="p">
            I build full-stack applications the way I'd want to receive them as an API consumer:{" "}
            <span className="text-ink">predictable, secure, and well-documented.</span>
          </Reveal>
          <Reveal as="p" delay={0.05}>
            On the backend that means Spring Boot services with layered architecture, JWT-based auth,
            and migrations tracked in Flyway. On the frontend, React interfaces that stay out of the
            user's way.
          </Reveal>
          <Reveal as="p" delay={0.1}>
            I'm currently extending that toolkit into applied AI: retrieval, embeddings, and agents
            that call the same REST APIs I already build.
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-10 grid gap-x-10 gap-y-3 text-[15px] sm:grid-cols-2">
          <Item as="li">
            <span className="text-muted">Languages: </span>
            {languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(", ")}
          </Item>
          {certifications.map((c) => (
            <Item as="li" key={c.name}>
              <span className="text-muted">Certificate: </span>
              {c.name}, {c.issuer} ({c.date})
            </Item>
          ))}
        </Stagger>
      </div>
    </ScrollSection>
  );
}
