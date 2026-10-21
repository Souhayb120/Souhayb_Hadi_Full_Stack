import { ScrollSection, SectionTitle, Reveal, Stagger, Item } from "./motion";
import { aiInterests } from "../data/content";

export default function AISection() {
  return (
    <ScrollSection id="ai" className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionTitle index={5} note="still figuring these out">What I'm learning now</SectionTitle>
        <Reveal as="p" className="max-w-2xl leading-relaxed text-muted">
          I'm extending my backend foundation into applied AI, connecting language models to the same
          REST APIs, databases and auth layers I already build rather than treating AI as a separate
          stack.
        </Reveal>
        <Stagger as="ul" className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {aiInterests.map((item) => (
            <Item as="li" key={item.name} className="border-l-2 border-aurora/60 pl-4">
              <p className="font-medium text-ink">{item.name}</p>
              <p className="text-sm text-muted">{item.note}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </ScrollSection>
  );
}
