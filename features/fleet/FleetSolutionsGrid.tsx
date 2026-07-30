import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CellGrid, type CellGridItem } from "@/sections/CellGrid";
import { SectionHeader } from "@/sections/SectionHeader";

const SOLUTIONS: CellGridItem[] = [
  {
    eyebrow: "01",
    title: "Fleet Leasing",
    description: "Vehicles supplied on monthly or annual terms, registered and insured, scaled to the size of your operation.",
  },
  {
    eyebrow: "02",
    title: "Vehicle Management",
    description: "Registration, Salik, insurance renewals, fines and documentation tracked per vehicle rather than left to the rider.",
  },
  {
    eyebrow: "03",
    title: "Driver Support",
    description: "Onboarding, licensing guidance, replacement vehicles and a number to call when something goes wrong on shift.",
  },
  {
    eyebrow: "04",
    title: "Maintenance Coordination",
    description: "Servicing scheduled around your peak hours and carried out at our own automotive workshop.",
  },
  {
    eyebrow: "05",
    title: "Operational Assistance",
    description: "Day-to-day coordination between your dispatch team and our fleet desk, so downtime gets reported and resolved.",
  },
  {
    eyebrow: "06",
    title: "Fleet Expansion",
    description: "Additional units brought online as your order volume grows, planned ahead of your seasonal peaks.",
  },
];

/**
 * "Fleet Solutions" — a header row (heading beside a lead paragraph, same
 * pattern as Home's Sectors intro) over the `CellGrid` primitive. This is
 * `CellGrid`'s second confirmed usage (after Real Estate's Featured
 * Opportunities), which is what keeps it a shared primitive rather than
 * page-specific.
 */
export function FleetSolutionsGrid() {
  return (
    <div>
      <div className="mb-16 grid items-end gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
        <SectionHeader
          eyebrow="Fleet Solutions"
          heading="One operator behind every vehicle you run."
          headingClassName="max-w-[15ch]"
        />
        <RevealOnScroll delay={80}>
          <p className="max-w-[44ch] text-body-lg text-graphite">
            Platforms and businesses come to us because coordinating vehicles, riders, registration and repairs
            across several suppliers stops working at scale.
          </p>
        </RevealOnScroll>
      </div>
      <CellGrid items={SOLUTIONS} minItemWidth={290} />
    </div>
  );
}
