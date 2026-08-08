import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";
import type { ProcessStep } from "@/types/content";

interface NumberedInfoRowsProps {
  eyebrow: string;
  heading: string;
  /** Overrides the intro heading's max-width — 17ch on Automotive's Customer Commitment, 19ch on Vehicle Import & Export's Customer Confidence. */
  headingClassName?: string;
  items: ProcessStep[];
}

/**
 * A large-serif-numeral bordered row list under a standalone intro (no lead
 * paragraph, max-width 860px), the rows themselves capped at 980px —
 * confirmed identical on Automotive Garage's "Customer Commitment" and
 * Vehicle Import & Export's "Customer Confidence": same `78px 1fr` grid
 * (`42px 1fr` below 768px, per source's `[data-numrow]` override), same
 * 32px serif numeral in `gold-dark`, same non-standard `clamp(22px,2vw,28px)`
 * heading size, same trailing border after the last row. Extracted after
 * the second page confirmed the exact match, per the project's "confirm on
 * two, then extract" rule.
 */
export function NumberedInfoRows({ eyebrow, heading, headingClassName, items }: NumberedInfoRowsProps) {
  return (
    <div>
      <div className="max-w-[860px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} headingClassName={headingClassName} />
      </div>
      <div className="mt-11 max-w-[980px]">
        {items.map((item, index) => (
          <RevealOnScroll
            key={item.number}
            delay={index * 60}
            className="grid grid-cols-[50px_1fr] items-baseline gap-4 border-t border-ink/10 py-10 sm:grid-cols-[78px_1fr] sm:gap-[30px]"
          >
            <span className="font-display text-[32px] leading-none text-gold-dark">{item.number}</span>
            <div>
              <h3 className="mb-3 font-display text-[clamp(22px,2vw,28px)] leading-[1.28] text-ink">{item.title}</h3>
              <p className="m-0 max-w-[52ch] text-body-lg font-light text-graphite">{item.description}</p>
            </div>
          </RevealOnScroll>
        ))}
        <div className="border-t border-ink/10" />
      </div>
    </div>
  );
}
