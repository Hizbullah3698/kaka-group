"use client";

import Image from "next/image";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useParallax } from "@/hooks/useParallax";
import { SectionHeader } from "@/sections/SectionHeader";

const COMMITMENTS = [
  { value: "Round the clock", caption: ["Operational support", "seven days a week"] },
  { value: "Pre-shift checked", caption: ["Vehicle readiness", "before deployment"] },
  { value: "Same-day", caption: ["Replacement vehicle", "on qualifying breakdowns"] },
  { value: "Multi-platform", caption: ["Fleets running across", "the UAE's delivery networks"] },
  { value: "One contact", caption: ["A named fleet desk", "for every partner"] },
];

/**
 * "Statistics" — a parallax background photo behind a 5-cell grid of
 * individually bordered, translucent-ink commitment cards. Doesn't match
 * `AboutStatBlock`'s shared-seam grid (see that component's doc comment for
 * why it stayed page-specific), and this section's own heading uses a
 * non-standard clamp size, so it's set directly rather than through
 * `SectionHeader`'s default `text-h2`.
 */
export function FleetStatistics() {
  const bgRef = useParallax<HTMLDivElement>(0.05);

  return (
    <div className="relative overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 h-[118%] w-full opacity-[.16]">
        <Image src="/uploads/fleet%20operations.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "linear-gradient(180deg, rgba(11,18,32,.9), rgba(11,18,32,.96))" }}
      />
      <div className="wrap relative py-section-sm sm:py-section-md lg:py-section-lg">
        <SectionHeader
          eyebrow="Operational Commitments"
          heading="What partners can hold us to."
          headingClassName="max-w-[19ch] text-[clamp(27px,2.7vw,40px)]"
          tone="dark"
          className="mb-[62px]"
        />
        <div className="grid gap-[22px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(230px, 100%), 1fr))" }}>
          {COMMITMENTS.map((item, index) => (
            <RevealOnScroll key={item.value} delay={index * 60} className="border border-gold/[.26] bg-ink/42 p-[30px_22px] sm:p-[42px_34px]">
              <div className="mb-[18px] font-display text-[clamp(28px,2.6vw,38px)] leading-[1.1] text-cream">
                {item.value}
              </div>
              <div className="mb-[18px] h-px w-[34px] bg-gold" />
              <div className="font-mono text-[9px] uppercase leading-[2] tracking-eyebrow-tight text-cream/62">
                {item.caption[0]}
                <br />
                {item.caption[1]}
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <p className="mt-[30px] font-mono text-[9px] uppercase tracking-[.2em] text-gold/70">
          Service commitments confirmed in writing per agreement
        </p>
      </div>
    </div>
  );
}
