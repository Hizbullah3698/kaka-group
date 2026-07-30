import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

const FOOTPRINT = [
  { value: "USA", label: "Primary sourcing" },
  { value: "UAE", label: "Logistics hub" },
  { value: "GE · IQ", label: "Core markets" },
];

const CAPABILITIES = [
  {
    number: "01",
    title: "Vehicle sourcing",
    description: "Access to US auction inventory and dealer stock, searched against your specification rather than whatever happens to be on a lot.",
  },
  {
    number: "02",
    title: "Global procurement",
    description: "Bidding, purchase and title collection handled on your behalf, with the landed cost calculated before we commit.",
  },
  {
    number: "03",
    title: "International automotive trading",
    description: "Single units for private buyers and repeat volume for dealers, priced the same transparent way.",
  },
  {
    number: "04",
    title: "Export coordination",
    description: "Booking, consolidation, documentation and customs treated as one process with one point of contact.",
  },
];

/**
 * "International Trading" — a sticky intro column (desktop/tablet only,
 * static on mobile, matching the same `data-sticky` pattern already used
 * fresh on Fleet's `FleetProcessRail`) beside a 4-row capability list. The
 * intro's own 3-item footprint row (USA/UAE/GE·IQ) is plain padding-right
 * spacing with no divider — a different treatment from the bordered stat
 * row in `InternationalMarketsMap`, so built separately here rather than
 * shared.
 */
export function TradingOverview() {
  return (
    <div className="grid items-start gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(330px,100%),1fr))] sm:gap-14 lg:gap-[72px]">
      <div className="static sm:sticky sm:top-[120px]">
        <SectionHeader
          eyebrow="International Vehicle Trading"
          heading="A trading desk, not a forecourt."
          headingClassName="max-w-[15ch]"
        />
        <RevealOnScroll delay={90}>
          <p className="mb-9 mt-6 max-w-[44ch] text-lead text-graphite">
            Shams Ul Haya operates from Sharjah as the KAKA Group vehicle trading arm. We buy to a buyer&rsquo;s
            brief (make, model, year, condition and budget), then handle everything between the auction floor and
            the destination port.
          </p>
        </RevealOnScroll>
        <div className="flex flex-wrap gap-y-4">
          {FOOTPRINT.map((item, index) => (
            <div key={item.value} className={index < FOOTPRINT.length - 1 ? "pr-9" : ""}>
              <div className="font-display text-[34px] leading-none text-ink">{item.value}</div>
              <div className="mt-2.5 font-mono text-[9px] uppercase tracking-eyebrow-tight text-gold-dark">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {CAPABILITIES.map((item, index) => (
          <RevealOnScroll
            key={item.number}
            delay={index * 60}
            className="grid grid-cols-[56px_1fr] items-start gap-6 border-t border-ink/10 py-8"
          >
            <span className="pt-[7px] font-mono text-[10px] uppercase tracking-eyebrow-tight text-gold-dark">
              {item.number}
            </span>
            <div>
              <h3 className="mb-[11px] font-display text-[23px] leading-[1.28] text-ink">{item.title}</h3>
              <p className="m-0 max-w-[44ch] text-body font-light text-graphite">{item.description}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
