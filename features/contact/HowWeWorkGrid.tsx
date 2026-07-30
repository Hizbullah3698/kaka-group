import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

const PRINCIPLES = [
  {
    number: "01",
    title: "One working day",
    description: "Enquiries are answered the same or the next working day, with a named contact on the reply.",
  },
  {
    number: "02",
    title: "Division leads, not agents",
    description: "The person who prices the work, books the workshop or signs the shipping papers is the person who writes back.",
  },
  {
    number: "03",
    title: "English, Arabic, Urdu, Hindi",
    description: "Our team handles enquiries and documentation in the languages our clients actually trade in.",
  },
  {
    number: "04",
    title: "Paperwork handled in-house",
    description: "Trade licences, customs documentation and vehicle registration are managed by our own staff, not outsourced.",
  },
];

/**
 * "How We Work With You" — a plain 4-up grid: numeral eyebrow, heading,
 * description, no border and no card. Checked against every existing
 * "numbered reasons" shape on the site before building this fresh:
 * `WhyChooseGrid` (2-col, border-top, numeral, hover shift), `WhyBusinessesChoose`
 * (vertical list, small numeral column), `WhyChooseGarage`'s `ReasonGrid`
 * (icon-line instead of a numeral). None match — this one has no border,
 * no hover interaction and no shared row primitive underneath it, so it's
 * built page-specific rather than forced onto any of them.
 */
export function HowWeWorkGrid() {
  return (
    <>
      <SectionHeader
        eyebrow="How We Work With You"
        heading="The answer comes from someone accountable for it."
        headingClassName="max-w-[20ch]"
        className="mb-[76px]"
      />
      <div
        className="grid gap-10 sm:gap-14 lg:gap-16"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))" }}
      >
        {PRINCIPLES.map((principle, index) => (
          <RevealOnScroll key={principle.number} delay={index * 60} className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[.34em] text-gold-dark">{principle.number}</span>
            <h3 className="m-0 font-display text-[23px] leading-[1.3] text-ink">{principle.title}</h3>
            <p className="m-0 text-body font-light leading-[1.85] text-graphite">{principle.description}</p>
          </RevealOnScroll>
        ))}
      </div>
    </>
  );
}
