import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

interface Reason {
  number: string;
  title: string;
  description: string;
}

const REASONS: Reason[] = [
  {
    number: "01",
    title: "Reliable supply chain",
    description: "Volumes contracted ahead of the season, with stock held in Dubai against your delivery schedule.",
  },
  {
    number: "02",
    title: "Global procurement network",
    description: "Direct relationships in the producing regions, so we buy without a chain of intermediaries between us.",
  },
  {
    number: "03",
    title: "Competitive wholesale pricing",
    description: "Origin buying and consolidated freight, quoted transparently by grade rather than as one blended number.",
  },
  {
    number: "04",
    title: "Consistent product quality",
    description: "The same specification shipment after shipment, which is why buyers stay with us across seasons.",
  },
  {
    number: "05",
    title: "Long-term partnerships",
    description: "Most of our volume moves under repeat agreements rather than one-off orders.",
  },
  {
    number: "06",
    title: "Experienced trading team",
    description: "People who have handled shipping documentation, claims and customs long enough to keep them uneventful.",
  },
];

/**
 * "Why KAKA Group" — sticky SectionHeader + a single CTA button on the
 * left, six numbered rows on the right (small mono numeral, title, and
 * description, stacked). Close to Real Estate's WhyKakaSplit in spirit but
 * genuinely different: this version has numerals and Real Estate's didn't.
 * No `data-numrow` attribute on these rows in source, so the grid column
 * widths (56px/1fr) don't change at any breakpoint.
 */
export function WhyKakaNumberedSplit() {
  return (
    <div className="grid items-start gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(330px,100%),1fr))] sm:gap-14 lg:gap-[88px]">
      <div className="sm:sticky sm:top-[120px]">
        <SectionHeader
          eyebrow="Why KAKA Group"
          heading="Traders first, and it shows in the paperwork."
          headingClassName="max-w-[14ch]"
          className="mb-8"
        />
        <Button href="#quote" tone="primary">
          Request a quote
        </Button>
      </div>
      <div>
        {REASONS.map((reason, index) => (
          <RevealOnScroll
            key={reason.number}
            delay={index * 50}
            className="grid grid-cols-[56px_1fr] items-start gap-[22px] border-t border-ink/10 py-9"
          >
            <span className="pt-2 font-mono text-[10px] uppercase tracking-eyebrow-tight text-gold-dark">
              {reason.number}
            </span>
            <div>
              <h3 className="mb-3 font-display text-[24px] leading-[1.28] text-ink">{reason.title}</h3>
              <p className="m-0 max-w-[44ch] text-body font-light text-graphite">{reason.description}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
