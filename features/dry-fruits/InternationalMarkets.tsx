"use client";

import dynamic from "next/dynamic";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

// Lazy-loaded so the D3 projection code, the topojson conversion and the
// ~100kb world-atlas fetch never touch the initial page load — this section
// is well below the fold and the map has no role in first paint.
const TradeMap = dynamic(() => import("@/components/maps/TradeMap").then((mod) => mod.TradeMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-ink">
      <span className="font-mono text-eyebrow uppercase text-gold/50">Loading map…</span>
    </div>
  ),
});

/**
 * "International Markets" — header row (SectionHeader + intro paragraph,
 * same pattern as Property Categories'/Featured Opportunities' headers on
 * Real Estate), then the embedded trade map, then a caption. The source
 * embeds this as a same-origin `<iframe src="trade-map.html">`; here it's a
 * directly embedded, lazy-loaded client component instead (see TradeMap's
 * own doc comment for why).
 */
export function InternationalMarkets() {
  return (
    <div>
      <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
        <SectionHeader
          eyebrow="International Markets"
          heading="Dubai in the middle, by design."
          tone="dark"
          headingClassName="max-w-[16ch]"
        />
        <RevealOnScroll>
          <p className="max-w-[40ch] text-body-lg font-light text-cream/70">
            Producing regions on one side, consuming markets on the other, and a port that reaches both within days.
          </p>
        </RevealOnScroll>
      </div>
      <RevealOnScroll className="relative h-[340px] overflow-hidden border border-gold/30 bg-ink sm:h-[520px]">
        <TradeMap />
      </RevealOnScroll>
      <p className="mt-[22px] font-mono text-[9px] uppercase tracking-[.2em] text-gold/70">
        Principal sourcing origins and supply markets. Full list on request
      </p>
    </div>
  );
}
