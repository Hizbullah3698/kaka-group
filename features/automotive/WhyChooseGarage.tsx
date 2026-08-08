"use client";

import Image from "next/image";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useParallax } from "@/hooks/useParallax";
import { blurPlaceholders } from "@/lib/blurPlaceholders";
import { SectionHeader } from "@/sections/SectionHeader";

interface Reason {
  title: string;
  description: string;
}

const ROW_ONE: Reason[] = [
  {
    title: "Experienced technicians",
    description: "People who have spent years on the same systems they are diagnosing, across the marques common on Dubai roads.",
  },
  {
    title: "Modern diagnostic equipment",
    description: "Manufacturer-level scanning that reads live data and module faults rather than a generic code list.",
  },
  {
    title: "Genuine replacement parts",
    description: "Genuine or OE-equivalent only, invoiced by part number so you can verify exactly what went on the car.",
  },
];

const ROW_TWO: Reason[] = [
  {
    title: "Transparent pricing",
    description: "A written estimate before work begins, and a final invoice that matches it unless you approved a change.",
  },
  {
    title: "Fast turnaround",
    description: "Realistic completion times, quoted honestly, with a call the moment something threatens one.",
  },
  {
    title: "Reliable workmanship",
    description: "Every job checked by a second technician, because the cost of a comeback lands on us either way.",
  },
];

function ReasonGrid({ items, startDelay }: { items: Reason[]; startDelay: number }) {
  return (
    <div
      className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(270px,100%),1fr))] sm:gap-14 lg:gap-x-16 lg:gap-y-14"
    >
      {items.map((reason, index) => (
        <RevealOnScroll key={reason.title} delay={startDelay + index * 60}>
          <span aria-hidden="true" className="mb-[22px] block h-px w-7 bg-gold" />
          <h3 className="mb-3.5 font-display text-[24px] leading-[1.26] text-ink">{reason.title}</h3>
          <p className="m-0 max-w-[40ch] text-body text-graphite">{reason.description}</p>
        </RevealOnScroll>
      ))}
    </div>
  );
}

/**
 * "Why Choose KAKA Garage" — six reasons split into two 3-up rows by a
 * full-bleed parallax image band. Each card is an icon-line + heading +
 * description with no numeral, which is why it isn't built on `CellGrid`
 * (no hairline seam here, no numbered eyebrow) or on Home's `WhyChooseGrid`
 * (that one numbers its rows and separates them with a border-top instead
 * of a plain icon line).
 */
export function WhyChooseGarage() {
  const imageRef = useParallax<HTMLDivElement>(0.05);

  return (
    <>
      <div className="wrap pb-0 pt-[86px] sm:pt-section-lg">
        <SectionHeader
          eyebrow="Why Choose KAKA Garage"
          heading="The difference is in what we tell you, not what we sell you."
          headingClassName="max-w-[20ch]"
          className="mb-16"
        />
        <ReasonGrid items={ROW_ONE} startDelay={0} />
      </div>

      <div className="relative my-20 h-[clamp(280px,32vw,420px)] overflow-hidden">
        <div ref={imageRef} className="relative h-[118%] w-full">
          <Image
            src="/uploads/Vehicle%20Diagnostics%20-%20Technician%20using%20a%20diagnostic%20scanner..jpg"
            alt="Technician running a diagnostic scan"
            placeholder="blur"
            blurDataURL={blurPlaceholders["/uploads/Vehicle%20Diagnostics%20-%20Technician%20using%20a%20diagnostic%20scanner..jpg"]}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "linear-gradient(180deg, rgba(11,18,32,.32), rgba(11,18,32,.5))" }}
        />
      </div>

      <div className="wrap pb-section-sm pt-0 sm:pb-section-lg">
        <ReasonGrid items={ROW_TWO} startDelay={180} />
      </div>
    </>
  );
}
