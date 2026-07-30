"use client";

import Image from "next/image";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useParallax } from "@/hooks/useParallax";
import { SectionHeader } from "@/sections/SectionHeader";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Buying Assistance",
    description:
      "Shortlists built against your budget, use case and exit horizon, then viewings, negotiation and offer management.",
  },
  {
    number: "02",
    title: "Selling Support",
    description:
      "Pricing from comparable transactions, photography and listing production, and qualified buyers rather than tyre-kickers.",
  },
  {
    number: "03",
    title: "Investment Consultancy",
    description:
      "Yield and appreciation modelling by community, with the service-charge and financing costs written into the numbers.",
  },
  {
    number: "04",
    title: "Off-plan Sales",
    description: "Direct developer allocations, payment-plan comparison and escrow verification before a deposit moves.",
  },
  {
    number: "05",
    title: "Portfolio Management",
    description: "Leasing, renewals, service-charge oversight and annual review across multiple units and owners.",
  },
  {
    number: "06",
    title: "Documentation & Transaction Support",
    description: "Title transfer, DLD registration, NOCs, conveyancing and power of attorney handled by our own staff.",
  },
];

/**
 * "Our Services" — intro heading beside a parallax photo, then six rows.
 * Each row pairs a small mono numeral with a title+description sub-grid laid
 * side by side (not stacked), and shifts padding-left on hover. This is
 * deliberately not built on NumberedRow: NumberedRow's numeral is a large
 * display-font glyph next to stacked title/description, with no hover
 * motion and no border dividers — a different shape, not just a restyle.
 */
export function ServiceList() {
  const imageRef = useParallax<HTMLDivElement>(0.05);

  return (
    <div>
      <div className="mb-14 grid items-start gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))] sm:gap-14 lg:gap-20">
        <SectionHeader eyebrow="Our Services" heading="Represented properly, start to finish." headingClassName="max-w-[14ch]" />
        <div className="relative min-h-[300px]">
          <RevealOnScroll className="relative h-[300px] overflow-hidden rounded-lg border border-gold/35">
            <div ref={imageRef} className="h-[116%] w-full">
              <Image
                src="/uploads/real%20estate.jpg"
                alt="Handover of keys after a completed transaction"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div>
        {SERVICES.map((service, index) => (
          <RevealOnScroll
            key={service.number}
            delay={index * 60}
            className="grid grid-cols-[42px_1fr] items-start gap-4 border-t border-ink/10 py-10 transition-[padding-left] duration-420 ease-kaka hover:pl-3.5 sm:grid-cols-[72px_1fr] sm:gap-7"
          >
            <span className="pt-2 font-mono text-[10px] uppercase tracking-eyebrow-tight text-gold-dark">
              {service.number}
            </span>
            <div className="grid items-baseline gap-9 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
              <h3 className="m-0 font-display text-[27px] leading-tight text-ink">{service.title}</h3>
              <p className="m-0 max-w-[48ch] text-body font-light text-graphite">{service.description}</p>
            </div>
          </RevealOnScroll>
        ))}
        <div className="border-t border-ink/10" />
      </div>
    </div>
  );
}
