import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

interface ServiceItem {
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  { title: "Bulk Container Supply", description: "FCL by grade and calibre, 20ft and 40ft, loaded at origin or ex our Dubai warehouse." },
  {
    title: "International Import & Export",
    description: "Inbound clearance and outbound re-export handled under one set of paperwork.",
  },
  { title: "Wholesale Distribution", description: "Regional delivery across the UAE and GCC against a standing schedule." },
  {
    title: "Global Procurement",
    description: "Sourcing to a written specification when a line sits outside our standing portfolio.",
  },
  { title: "Contract Supply", description: "Fixed volumes at agreed pricing over a season, protecting you from spot swings." },
  { title: "Custom Packaging", description: "Vacuum, carton, jute or private-label packs to your artwork and weight breaks." },
  {
    title: "Long-term Supply Agreements",
    description: "Multi-year arrangements with review points, for buyers who plan a year ahead.",
  },
];

/**
 * "Wholesale Services" — a single heading (no split intro/sticky column,
 * unlike every other numbered-row section on this page) over a two-column
 * grid of seven title+description items with no numeral at all. Every other
 * item carries a 22px left offset in source, unconditionally (not reset at
 * any breakpoint), producing a deliberate brick-like stagger even in the
 * single-column mobile layout — preserved as-is rather than "corrected",
 * since that offset isn't wrapped in any responsive override in source.
 */
export function WholesaleServicesGrid() {
  return (
    <div>
      <div className="grid gap-0 sm:grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] sm:gap-x-[76px]">
        {SERVICES.map((service, index) => (
          <RevealOnScroll
            key={service.title}
            delay={index * 50}
            className={cn("border-t border-gold/[.22] py-[34px]", index % 2 === 1 && "ml-[22px]")}
          >
            <h3 className="mb-3 font-display text-[25px] leading-[1.28] text-cream">{service.title}</h3>
            <p className="m-0 max-w-[44ch] text-body font-light text-cream/70">{service.description}</p>
          </RevealOnScroll>
        ))}
      </div>
      <div className="border-t border-gold/[.22]" />
    </div>
  );
}
