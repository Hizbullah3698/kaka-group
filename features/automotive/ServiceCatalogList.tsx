import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

const SERVICES = [
  { number: "01", title: "General Maintenance", note: "Scheduled servicing to manufacturer intervals" },
  { number: "02", title: "Engine Repairs", note: "Diagnosis through to overhaul" },
  { number: "03", title: "Transmission Repairs", note: "Automatic and manual, service and rebuild" },
  { number: "04", title: "Brake Systems", note: "Pads, discs, lines and ABS faults" },
  { number: "05", title: "Suspension", note: "Shocks, bushings, arms and geometry" },
  { number: "06", title: "Electrical Systems", note: "Wiring, sensors, starting and charging" },
  { number: "07", title: "Air Conditioning", note: "Regas, leak tracing and compressor work" },
  { number: "08", title: "Oil Changes", note: "Genuine grades with filter replacement" },
  { number: "09", title: "Battery Replacement", note: "Tested, fitted and registered to the vehicle" },
  { number: "10", title: "Tire Services", note: "Fitting, balancing, repair and rotation" },
  { number: "11", title: "Wheel Alignment", note: "Four-wheel alignment on modern equipment" },
  { number: "12", title: "Computer Diagnostics", note: "Manufacturer-level scanning and coding" },
];

/**
 * "Services" — header row (heading beside a lead paragraph, same pattern as
 * Fleet's Fleet Solutions intro), then a 12-item two-column list. Each row
 * is a single flex line (numeral + title on the left, a short note
 * right-aligned) rather than a stacked card — this is its own shape, not a
 * `CellGrid` variant.
 */
export function ServiceCatalogList() {
  return (
    <div>
      <div className="mb-[58px] grid items-end gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
        <SectionHeader
          eyebrow="Complete Automotive Services"
          heading="Everything a vehicle needs, under one roof."
          headingClassName="max-w-[15ch]"
        />
        <RevealOnScroll delay={80}>
          <p className="max-w-[42ch] text-body-lg text-graphite">
            Mechanical, electrical and diagnostic work carried out by our own technicians. Nothing is subcontracted
            out with a margin added on top.
          </p>
        </RevealOnScroll>
      </div>
      <div className="grid grid-cols-1 border-t border-ink/[.16] sm:[grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))] sm:gap-x-[72px]">
        {SERVICES.map((service, index) => (
          <RevealOnScroll
            key={service.number}
            delay={index * 40}
            className="flex items-baseline justify-between gap-5 border-b border-ink/10 py-[26px] transition-[padding-left] duration-[380ms] ease-kaka hover:pl-[10px]"
          >
            <span className="flex items-baseline gap-4">
              <span className="font-mono text-[9px] uppercase tracking-eyebrow-tight text-gold-dark">
                {service.number}
              </span>
              <span className="font-display text-[22px] text-ink">{service.title}</span>
            </span>
            <span className="max-w-[20ch] text-right text-[14px] font-light leading-[1.6] text-graphite">{service.note}</span>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
