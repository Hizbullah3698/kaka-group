"use client";

import Image from "next/image";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useParallax } from "@/hooks/useParallax";
import { blurPlaceholders } from "@/lib/blurPlaceholders";
import { SectionHeader } from "@/sections/SectionHeader";

interface ChainStep {
  number: string;
  title: string;
  description: string;
}

const STEPS: ChainStep[] = [
  {
    number: "01",
    title: "Origin",
    description: "Buying decisions made against the crop: harvest timing, calibre and moisture, agreed with the grower or processor.",
  },
  {
    number: "02",
    title: "International Procurement",
    description: "Contracts, pre-shipment samples and payment terms arranged through our trade desk.",
  },
  {
    number: "03",
    title: "Quality Inspection",
    description:
      "Grade, size, foreign-matter and moisture checks before release, with third-party inspection where a buyer requires it.",
  },
  {
    number: "04",
    title: "Container Loading",
    description: "Stuffing supervised at origin, sealed and photographed, with packing list and certificates issued the same day.",
  },
  {
    number: "05",
    title: "Sea Freight",
    description: "Booked with established lines on the routes we ship every month, insured door to port.",
  },
  {
    number: "06",
    title: "Dubai Distribution",
    description: "Cleared at Jebel Ali, stored in our warehouse and broken down for regional delivery.",
  },
  {
    number: "07",
    title: "Wholesale Customers",
    description: "Delivered to distributors, retail groups and manufacturers on a schedule agreed in advance.",
  },
];

/**
 * "Supply Chain" — left column is a SectionHeader followed by a parallax
 * photo (not sticky: source omits `data-sticky` here, unlike Trading
 * Excellence and Why KAKA on this same page, so the left column scrolls
 * normally). Right column is seven rows with a big serif numeral (matching
 * StickyProcessRail/NumberedRow's numeral treatment) paired with a
 * side-by-side title/description sub-grid (matching Real Estate's
 * ServiceList layout) — a hybrid of the two that doesn't fully match
 * either existing shape, so it stays page-specific. `data-numrow` is
 * present in source here (unlike Trading Excellence's rows), so this one
 * does get the mobile column-width override.
 */
export function SupplyChainRail() {
  const imageRef = useParallax<HTMLDivElement>(0.05);

  return (
    <div className="grid items-start gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))] sm:gap-14 lg:gap-[76px]">
      <div>
        <SectionHeader
          eyebrow="Supply Chain"
          heading="From the grower’s yard to your warehouse door."
          headingClassName="max-w-[15ch]"
          className="mb-8"
        />
        <RevealOnScroll className="relative h-[320px] overflow-hidden border border-gold/35">
          <div ref={imageRef} className="h-[118%] w-full">
            <Image
              src="/uploads/dry%20fruit%20ware%20house.jpg"
              alt="Distribution warehouse in operation"
              placeholder="blur"
              blurDataURL={blurPlaceholders["/uploads/dry%20fruit%20ware%20house.jpg"]}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </RevealOnScroll>
      </div>
      <div>
        {STEPS.map((step, index) => (
          <RevealOnScroll
            key={step.number}
            delay={index * 50}
            className="grid grid-cols-[42px_1fr] items-start gap-4 border-t border-ink/10 py-8 sm:grid-cols-[78px_1fr] sm:gap-7"
          >
            <span className="font-display text-[30px] leading-none text-gold-dark">{step.number}</span>
            <div className="grid items-baseline gap-7 [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
              <h3 className="m-0 font-display text-[24px] leading-tight text-ink">{step.title}</h3>
              <p className="m-0 max-w-[44ch] text-body font-light text-graphite">{step.description}</p>
            </div>
          </RevealOnScroll>
        ))}
        <div className="border-t border-ink/10" />
      </div>
    </div>
  );
}
