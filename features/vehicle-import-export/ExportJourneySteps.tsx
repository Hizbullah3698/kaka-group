"use client";

import Image from "next/image";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useParallax } from "@/hooks/useParallax";
import { blurPlaceholders } from "@/lib/blurPlaceholders";
import { SectionHeader } from "@/sections/SectionHeader";

const STAGES = [
  { stage: "Stage 01", location: "United States", title: "Vehicle Search", description: "We search auction and dealer inventory against your make, model, year, mileage and condition brief." },
  { stage: "Stage 02", location: "United States", title: "Purchase", description: "Bidding to an agreed ceiling, then payment, title collection and yard release handled on your behalf." },
  { stage: "Stage 03", location: "Origin yard", title: "Inspection", description: "Condition photographed and reported before loading, including anything a listing understated." },
  { stage: "Stage 04", location: "Atlantic to Gulf", title: "Shipping", description: "Container or RoRo booked with established lines, insured, with the vessel and ETA confirmed to you." },
  { stage: "Stage 05", location: "UAE", title: "Dubai Logistics", description: "Cleared and held at our Sharjah facility, consolidated where several vehicles travel onward together." },
  { stage: "Stage 06", location: "UAE", title: "Export Documentation", description: "Certificate of export, bill of lading, invoice and title prepared to the destination country's requirements." },
  { stage: "Stage 07", location: "Georgia · Iraq · region", title: "Customer Delivery", description: "Onward shipment or overland transport to the agreed port or yard, with paperwork travelling ahead of the vehicle." },
];

/**
 * "The Global Export Journey" — a full-strength (undimmed) parallax
 * background photo behind a 7-stage vertical list. Unlike Fleet's
 * `FleetProcessRail` (numeral + connecting line, no border) or
 * Automotive's `ServiceProcessSteps` (horizontal row, circle + partial
 * line), every row here gets a full border-top, including a trailing one
 * after the last stage, and the left column is a two-line stacked label
 * (stage number, then a location) rather than a numeral or circle at all.
 * A fourth genuinely different "process list" shape — built fresh again.
 */
export function ExportJourneySteps() {
  const bgRef = useParallax<HTMLDivElement>(0.05);

  return (
    <div className="relative overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 h-[118%] w-full">
        <Image
          src="/uploads/Hero%20-%20Vehicle%20loading%20at%20a%20port%20or%20premium%20export%20scene..jpg"
          alt=""
          placeholder="blur"
          blurDataURL={blurPlaceholders["/uploads/Hero%20-%20Vehicle%20loading%20at%20a%20port%20or%20premium%20export%20scene..jpg"]}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(11,18,32,.94) 0%, rgba(11,18,32,.97) 45%, rgba(11,18,32,.94) 100%)",
        }}
      />
      <div className="wrap relative py-section-sm sm:py-section-md lg:py-section-lg">
        <div className="mb-[58px] flex flex-wrap items-end justify-between gap-7">
          <SectionHeader
            eyebrow="The Global Export Journey"
            heading="Seven stages, tracked end to end."
            headingClassName="max-w-[15ch]"
            tone="dark"
          />
          <RevealOnScroll delay={80}>
            <p className="max-w-[36ch] text-body-lg font-light text-cream/68">
              You get the vehicle reference, the vessel and the paperwork at every stage, not one invoice at the
              end.
            </p>
          </RevealOnScroll>
        </div>
        <div>
          {STAGES.map((step, index) => (
            <RevealOnScroll
              key={step.stage}
              delay={index * 50}
              className="grid grid-cols-[118px_1fr] items-start gap-[34px] border-t border-gold/[.22] py-[38px]"
            >
              <div>
                <div className="mb-2.5 font-mono text-[9px] uppercase tracking-eyebrow-tight text-gold/90">
                  {step.stage}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[.2em] text-cream/45">{step.location}</div>
              </div>
              <div className="grid items-baseline gap-7 [grid-template-columns:repeat(auto-fit,minmax(min(230px,100%),1fr))]">
                <h3 className="m-0 font-display text-[25px] leading-[1.24] text-cream">{step.title}</h3>
                <p className="m-0 max-w-[44ch] text-body font-light text-cream/68">{step.description}</p>
              </div>
            </RevealOnScroll>
          ))}
          <div className="border-t border-gold/[.22]" />
        </div>
      </div>
    </div>
  );
}
