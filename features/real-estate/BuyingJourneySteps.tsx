import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { ProcessStep } from "@/types/content";

const STEPS: ProcessStep[] = [
  { number: "01", title: "Consultation", description: "Budget, purpose, financing and timeline, all before any property is shown." },
  {
    number: "02",
    title: "Property Selection",
    description: "A shortlist with the numbers attached, not a portal dump of everything available.",
  },
  {
    number: "03",
    title: "Site Visit",
    description: "Viewings scheduled together, including the building, the community and the service charges.",
  },
  {
    number: "04",
    title: "Reservation",
    description: "Offer, Form F or booking form, and the deposit held exactly where it should be.",
  },
  {
    number: "05",
    title: "Documentation",
    description: "NOC, DLD registration and conveyancing managed by our transaction team.",
  },
  {
    number: "06",
    title: "Handover",
    description: "Keys, snagging, utilities connected, and leasing arranged if the unit is an investment.",
  },
];

/**
 * "The Buying Journey" — six steps laid out as horizontal columns (not a
 * vertical list), each marked by a small hollow circle sitting on a
 * border-top rule, with a "Step 0X" mono eyebrow above the title. Reuses the
 * `ProcessStep` type (same number/title/description shape as
 * StickyProcessRail/NumberedRow) since the data fits, but the rendering is
 * its own: a horizontal auto-fit grid with a circle marker, not a stacked
 * numeral+content row, so it isn't built on NumberedRow itself.
 */
export function BuyingJourneySteps() {
  return (
    <div className="grid gap-x-6 gap-y-12 [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
      {STEPS.map((step, index) => (
        <RevealOnScroll key={step.number} delay={index * 60} className="relative border-t border-gold/40 pt-11">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[-7px] h-[13px] w-[13px] rounded-full border border-gold bg-cream"
          />
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-eyebrow-tight text-gold-dark">
            Step {step.number}
          </span>
          <h3 className="mb-3 font-display text-[22px] leading-snug text-ink">{step.title}</h3>
          <p className="m-0 text-body font-light text-graphite">{step.description}</p>
        </RevealOnScroll>
      ))}
    </div>
  );
}
