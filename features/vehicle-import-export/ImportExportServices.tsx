"use client";

import Image from "next/image";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useParallax } from "@/hooks/useParallax";
import { SectionHeader } from "@/sections/SectionHeader";

const SERVICES = [
  { number: "01", title: "Vehicle Sourcing", description: "Searching US inventory to your written brief, with landed-cost estimates before anything is bid on." },
  { number: "02", title: "Auction Purchasing", description: "Registered auction access, bidding to your ceiling, and title and release handled at origin." },
  { number: "03", title: "Export Documentation", description: "Bills of lading, certificates of export, invoices and titles prepared for the destination authority." },
  { number: "04", title: "Customs Coordination", description: "UAE clearance inbound and outbound, with duties and charges itemised rather than blended." },
  { number: "05", title: "Shipping Logistics", description: "Container and RoRo booking with established lines, insured, consolidated where it saves you money." },
  { number: "06", title: "Dealer Supply", description: "Repeat programmes for dealers in Georgia and Iraq, buying to a standing specification." },
  { number: "07", title: "Wholesale Trading", description: "Multi-unit lots priced per vehicle, with the condition report attached to each one." },
  { number: "08", title: "International Delivery Support", description: "Onward transport arranged to the final yard, and someone reachable while the vehicle is in transit." },
];

/**
 * "Import & Export Services" — header row, an 8-item two-column list (no
 * hover interaction, unlike Automotive's `ServiceCatalogList`, which shares
 * the same general "numbered two-column list" idea but does have a
 * padding-left hover shift — different enough in source to keep separate),
 * and a trailing parallax image band flush against the bottom of the
 * section.
 */
export function ImportExportServices() {
  const bgRef = useParallax<HTMLDivElement>(0.05);

  return (
    <>
      <div className="wrap pb-0 pt-[86px] sm:pt-section-lg">
        <div className="mb-[52px] grid items-end gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))] sm:gap-14 lg:gap-16">
          <SectionHeader
            eyebrow="Import & Export Services"
            heading="Eight services, one accountable desk."
            headingClassName="max-w-[15ch]"
          />
          <RevealOnScroll delay={80}>
            <p className="max-w-[40ch] text-body-lg text-graphite">
              Take the whole chain or just the part you need. Some clients buy their own vehicles and use us only
              for logistics and documentation.
            </p>
          </RevealOnScroll>
        </div>
        <div className="grid grid-cols-1 sm:[grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))] sm:gap-x-[72px]">
          {SERVICES.map((service, index) => (
            <RevealOnScroll key={service.number} delay={index * 40} className="border-t border-ink/10 py-[30px]">
              <div className="mb-2.5 flex items-baseline gap-3.5">
                <span className="font-mono text-[9px] uppercase tracking-eyebrow-tight text-gold-dark">
                  {service.number}
                </span>
                <h3 className="m-0 font-display text-[23px] leading-[1.26] text-ink">{service.title}</h3>
              </div>
              <p className="m-0 max-w-[42ch] text-[15.5px] font-light leading-[1.85] text-graphite">
                {service.description}
              </p>
            </RevealOnScroll>
          ))}
          <div className="border-t border-ink/10" />
        </div>
      </div>

      <div className="relative mt-20 h-[clamp(280px,32vw,420px)] overflow-hidden">
        <div ref={bgRef} className="relative h-[118%] w-full">
          <Image
            src="/uploads/checking%20a%20vehicle%20before%20shipment..jpg"
            alt="Vehicle inspected on a lift before shipment"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "50% 30%" }}
          />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "linear-gradient(180deg, rgba(11,18,32,.28), rgba(11,18,32,.5))" }}
        />
      </div>
    </>
  );
}
