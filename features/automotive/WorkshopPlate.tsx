import Image from "next/image";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

const SPECS = [
  { label: "Tooling", value: "Manufacturer-level diagnostics and coding" },
  { label: "Technicians", value: "Trained across European, Japanese and American marques" },
  { label: "Parts", value: "Genuine or OE-equivalent, invoiced by part number" },
];

/**
 * "Modern Workshop" — a full-bleed photo with a bordered "plate" panel
 * overlapping its bottom edge on a negative top margin. Unique shape on the
 * site so far (no other page overlaps a panel over an image like this) —
 * built page-specific rather than forcing it into `FlushImagePanel` (that
 * primitive's image and panel sit side by side, not stacked-with-overlap).
 */
export function WorkshopPlate() {
  return (
    <>
      <div className="relative h-[clamp(420px,58vw,640px)] overflow-hidden">
        <Image src="/uploads/Hero%20Workshop.jpg" alt="The KAKA Group workshop floor" fill sizes="100vw" className="object-cover" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(11,18,32,.3) 0%, rgba(11,18,32,.1) 40%, rgba(15,23,42,.85) 100%)",
          }}
        />
      </div>
      <div className="wrap pb-section-sm pt-0 sm:pb-section-lg">
        <RevealOnScroll
          className="relative mt-0 max-w-[860px] border border-gold/[.32] bg-ink-deep p-[40px_24px] shadow-[0_30px_70px_rgba(11,18,32,.5)] sm:mt-[clamp(-140px,-9vw,-60px)] sm:p-[64px_56px]"
        >
          <SectionHeader
            eyebrow="The Workshop"
            heading="Equipment good enough to find the actual fault."
            headingClassName="max-w-[18ch] text-[clamp(27px,2.7vw,40px)]"
            tone="dark"
          />
          <p className="mb-10 mt-6 max-w-[52ch] text-lead text-cream/74">
            A clean, organised bay is how parts stay traceable and how a technician finds a fault instead of
            guessing at it. Our workshop runs manufacturer-level diagnostic tooling, calibrated alignment equipment
            and genuine or OE-equivalent parts as standard.
          </p>
          <div className="grid gap-px border border-gold/[.22] bg-gold/[.22]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))" }}>
            {SPECS.map((spec) => (
              <div key={spec.label} className="bg-ink-deep p-[30px_22px] sm:p-[24px_22px]">
                <div className="mb-2.5 font-mono text-[9px] uppercase tracking-eyebrow-tight text-gold/80">
                  {spec.label}
                </div>
                <div className="text-[15.5px] font-light leading-[1.7] text-cream">{spec.value}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </>
  );
}
