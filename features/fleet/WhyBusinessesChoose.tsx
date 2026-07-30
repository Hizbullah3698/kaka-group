"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useParallax } from "@/hooks/useParallax";
import { SectionHeader } from "@/sections/SectionHeader";
import type { ProcessStep } from "@/types/content";

const REASONS: ProcessStep[] = [
  {
    number: "01",
    title: "Reliable fleet availability",
    description: "Spare capacity held deliberately, so a breakdown means a swap rather than a gap in your roster.",
  },
  {
    number: "02",
    title: "Professional operations",
    description: "A fleet desk with named contacts, documented handovers and reporting your team can audit.",
  },
  {
    number: "03",
    title: "UAE compliance",
    description: "RTA registration, insurance and permits maintained in-house, so nothing expires quietly.",
  },
  {
    number: "04",
    title: "Experienced team",
    description: "People who have run vehicles through Dubai summers, peak Ramadan volumes and platform onboarding.",
  },
  {
    number: "05",
    title: "Scalable fleet solutions",
    description: "From a handful of units to a multi-vehicle operation, on the same terms and the same contact.",
  },
  {
    number: "06",
    title: "Long-term partnerships",
    description: "Our fleet contracts renew because availability holds up, not because switching is difficult.",
  },
];

/**
 * "Why Businesses Choose KAKA Group" — image + CTA on the left, six
 * numbered rows on the right. Reuses the `ProcessStep` data shape (same as
 * Real Estate's `BuyingJourneySteps`), but the rendering is its own: a
 * vertical list with a small numeral column, not `BuyingJourneySteps`'
 * horizontal circle-marker grid, so — same as that component's own
 * reasoning — it isn't built on a shared row primitive.
 */
export function WhyBusinessesChoose() {
  const imageRef = useParallax<HTMLDivElement>(0.05);

  return (
    <div className="grid items-start gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(330px,100%),1fr))] sm:gap-14 lg:gap-[84px]">
      <div>
        <SectionHeader
          eyebrow="Why Businesses Choose KAKA Group"
          heading="Fleet decisions made by people who answer for them."
          headingClassName="max-w-[15ch]"
        />
        <RevealOnScroll delay={100} className="relative mb-[38px] mt-[34px] h-[360px] overflow-hidden border border-gold/35">
          <div ref={imageRef} className="relative h-full w-full">
            <Image
              src="/uploads/business%20discussion.jpg"
              alt="Fleet review meeting room"
              fill
              sizes="(min-width: 1200px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        </RevealOnScroll>
        <Button href="#partner" tone="primary" showArrow>
          Talk to operations
        </Button>
      </div>
      <div>
        {REASONS.map((reason, index) => (
          <RevealOnScroll
            key={reason.number}
            delay={index * 60}
            className="grid grid-cols-[52px_1fr] items-start gap-5 border-t border-ink/10 py-[34px]"
          >
            <span className="pt-[7px] font-mono text-[10px] uppercase tracking-eyebrow-tight text-gold-dark">
              {reason.number}
            </span>
            <div>
              <h3 className="mb-[11px] font-display text-[23px] leading-[1.28] text-ink">{reason.title}</h3>
              <p className="m-0 max-w-[42ch] text-body-lg font-light text-graphite">{reason.description}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
