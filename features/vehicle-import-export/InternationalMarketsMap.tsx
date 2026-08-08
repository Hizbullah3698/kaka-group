"use client";

import dynamic from "next/dynamic";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/SectionHeader";

const ExportRoutesMap = dynamic(() => import("@/components/maps/ExportRoutesMap").then((mod) => mod.ExportRoutesMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-ink-deep">
      <span className="font-mono text-eyebrow uppercase text-gold/50">Loading map…</span>
    </div>
  ),
});

const ROUTE_STATS = [
  { label: "Sourcing", value: "United States" },
  { label: "Consolidation", value: "Sharjah, UAE" },
  { label: "Delivery", value: "Georgia · Iraq · on request" },
];

/**
 * "International Markets" — header row, the lazy-loaded export-routes map,
 * then a 3-item stat row with border-right dividers between items (not the
 * padding-only spacing "International Vehicle Trading"'s stat row uses —
 * a different, bordered treatment, built separately rather than sharing).
 *
 * The header row's gap is unusual: source marks it `data-biggap` (so it
 * gets the standard 40px/56px mobile/tablet override) but its own desktop
 * value is 32px — smaller than the tablet override. Replicated as-is
 * rather than "corrected", since that's what the approved source specifies.
 */
export function InternationalMarketsMap() {
  return (
    <div>
      <div className="mb-14 flex flex-wrap items-end justify-between gap-10 sm:gap-14 lg:gap-8">
        <SectionHeader
          eyebrow="International Markets"
          heading="West to east, through one hub."
          headingClassName="max-w-[15ch]"
          tone="dark"
        />
        <RevealOnScroll delay={80}>
          <p className="max-w-[38ch] text-body-lg font-light text-cream/70">
            Georgia and Iraq are where we ship most consistently. The route and the paperwork extend to any market a
            buyer brings us.
          </p>
        </RevealOnScroll>
      </div>
      <RevealOnScroll className="relative h-[340px] overflow-hidden border border-gold/30 bg-ink-deep sm:h-[520px]">
        <ExportRoutesMap />
      </RevealOnScroll>
      <div className="mt-9 flex flex-wrap gap-x-14 gap-y-6">
        {ROUTE_STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(index < ROUTE_STATS.length - 1 && "border-r border-gold/[.22] pr-10")}
          >
            <div className="mb-2.5 font-mono text-[9px] uppercase tracking-eyebrow-tight text-gold/85">
              {stat.label}
            </div>
            <div className="text-body font-light text-cream">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
