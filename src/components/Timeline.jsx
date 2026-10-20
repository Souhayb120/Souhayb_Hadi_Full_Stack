import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ScrollSection, SectionTitle, Stagger, Item } from "./motion";
import { experience } from "../data/content";

export default function Timeline() {
  const listRef = useRef(null);
  // the line fills as the list scrolls through the middle of the screen
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.75", "end 0.5"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <ScrollSection id="experience" className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionTitle>Experience & education</SectionTitle>
        <div ref={listRef} className="relative pl-7">
          <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute left-[5px] top-2 bottom-2 w-px origin-top bg-accent"
          />
          <Stagger as="ol" gap={0.1} className="space-y-10">
            {experience.map((item) => (
              <Item as="li" key={item.title} className="relative grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <span
                  aria-hidden="true"
                  className="absolute -left-7 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-accent bg-bg"
                />
                <p className="text-sm text-muted sm:pt-1">{item.period}</p>
                <div>
                  <h3 className="font-medium text-ink">{item.title}</h3>
                  <p className="text-[15px] text-accent">{item.org}</p>
                  {item.description && <p className="mt-2 leading-relaxed text-muted">{item.description}</p>}
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </ScrollSection>
  );
}
