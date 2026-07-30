import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

interface InvestRow {
  value: string;
  title: string;
  description: string;
}

const ROWS: InvestRow[] = [
  {
    value: "0%",
    title: "No personal income tax",
    description:
      "Rental income and capital gains are not taxed personally in the UAE, which changes the arithmetic on every holding.",
  },
  {
    value: "6–9%",
    title: "Typical gross rental yields",
    description:
      "Well-selected apartments in established communities have historically outperformed most global gateway cities on yield.",
  },
  {
    value: "3.9M+",
    title: "Residents and growing",
    description:
      "Population growth, new-business formation and long-term visas keep occupancy tight across the mid and prime segments.",
  },
  {
    value: "2 hrs",
    title: "To a third of the world",
    description:
      "Dubai International connects the emirate to the Gulf, South Asia, Europe and Africa, which is why tenancy demand here is international.",
  },
  {
    value: "Freehold",
    title: "Foreign ownership secured",
    description:
      "Registered freehold title in designated communities, with every transfer recorded by the Dubai Land Department.",
  },
];

/**
 * "Why Invest in Dubai" — a sticky SectionHeader beside a scrolling column of
 * five stat rows (big serif value + title + description on a hairline
 * bottom-border). Reuses SectionHeader for the sticky intro, but the row
 * shape itself doesn't match ProcessStep (StickyProcessRail/NumberedRow) —
 * those pair a step numeral with title+description; these rows pair a large
 * stat value with title+description and carry their own bottom-border
 * divider. Kept page-specific rather than extending a shared primitive for
 * one page's row shape.
 */
export function WhyInvestRail() {
  return (
    <div className="grid items-start gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))] sm:gap-14 lg:gap-[88px]">
      <div className="sm:sticky sm:top-[120px]">
        <SectionHeader
          eyebrow="Why Invest in Dubai"
          heading="A market built for owners, not spectators."
          headingClassName="max-w-[15ch]"
          description="Dubai combines a tax position most cities cannot offer with genuine tenant demand and a regulator that records every transaction. We advise on where those three things overlap."
          descriptionClassName="max-w-[44ch]"
        />
      </div>
      <div>
        {ROWS.map((row, index) => (
          <RevealOnScroll
            key={row.title}
            delay={index * 60}
            className="grid grid-cols-1 items-baseline gap-2.5 border-b border-ink/10 py-[34px] sm:grid-cols-[minmax(120px,180px)_1fr] sm:gap-8"
          >
            <span className="font-display text-[clamp(34px,3.6vw,50px)] leading-none text-ink">{row.value}</span>
            <span>
              <span className="mb-2 block text-[17px] leading-relaxed text-ink">{row.title}</span>
              <span className="block text-body font-light text-graphite">{row.description}</span>
            </span>
          </RevealOnScroll>
        ))}
        <p className="mt-[26px] font-mono text-[9px] uppercase tracking-eyebrow-tight text-gold-dark">
          Market figures indicative, confirmed with you before any commitment
        </p>
      </div>
    </div>
  );
}
