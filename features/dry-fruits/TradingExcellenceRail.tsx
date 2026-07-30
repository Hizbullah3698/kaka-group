import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

interface TradeRow {
  number: string;
  title: string;
  description: string;
}

const ROWS: TradeRow[] = [
  {
    number: "01",
    title: "Import",
    description:
      "Consolidated inbound shipments cleared through Jebel Ali and Port Rashid, with documentation handled by our own trade desk.",
  },
  {
    number: "02",
    title: "Export",
    description: "Re-export of graded stock to the wider Gulf, Africa and South Asia under FOB, CFR or CIF terms.",
  },
  {
    number: "03",
    title: "Bulk Containers",
    description: "Full-container loads by grade and calibre, mixed-container programmes for buyers running several lines.",
  },
  {
    number: "04",
    title: "International Procurement",
    description: "Standing relationships with growers, hullers and processors in the producing regions we buy from.",
  },
  {
    number: "05",
    title: "Reliable Supply Chain",
    description:
      "Contracted volumes held against a delivery schedule, so your shelves and production lines do not wait on a spot market.",
  },
];

/**
 * "Trading Excellence" — sticky SectionHeader beside five numbered rows
 * (small mono numeral + stacked title/description, no heading element —
 * matches source, which uses plain spans here just as Real Estate's
 * WhyInvestRail does for its equivalent intro rail). No `data-numrow`
 * attribute on these rows in source, so no mobile column-width override
 * applies — grid stays 54px/1fr at every breakpoint.
 */
export function TradingExcellenceRail() {
  return (
    <div className="grid items-start gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(330px,100%),1fr))] sm:gap-14 lg:gap-[88px]">
      <div className="sm:sticky sm:top-[120px]">
        <SectionHeader
          eyebrow="Global Trading"
          heading="We trade tonnes, not packets."
          headingClassName="max-w-[15ch]"
          description="KAKA Group buys at origin and supplies wholesalers, distributors, retail chains and food manufacturers across the Gulf and beyond. One counterparty from purchase order to delivered container."
          descriptionClassName="max-w-[44ch]"
        />
      </div>
      <div>
        {ROWS.map((row, index) => (
          <RevealOnScroll
            key={row.number}
            delay={index * 60}
            className="grid grid-cols-[54px_1fr] items-baseline gap-[22px] border-b border-ink/10 py-7"
          >
            <span className="font-mono text-[10px] uppercase tracking-eyebrow-tight text-gold-dark">{row.number}</span>
            <span>
              <span className="mb-2.5 block font-display text-[24px] text-ink">{row.title}</span>
              <span className="block max-w-[46ch] text-body font-light text-graphite">{row.description}</span>
            </span>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
