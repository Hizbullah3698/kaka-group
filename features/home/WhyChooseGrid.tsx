import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

const REASONS = [
  {
    number: "01",
    title: "International Business",
    description: "Trade lanes and buyers across the GCC, South Asia, East Africa and the CIS, handled in-house.",
  },
  {
    number: "02",
    title: "Trusted Partnerships",
    description: "Suppliers, shippers and landlords we have worked with for years, not for one transaction.",
  },
  {
    number: "03",
    title: "Experienced Professionals",
    description: "Brokers, traders, logisticians and technicians who have spent their careers in these markets.",
  },
  {
    number: "04",
    title: "Transparent Operations",
    description: "Costs, timelines and paperwork set out before work begins, then reported against.",
  },
  {
    number: "05",
    title: "Reliable Logistics",
    description: "Customs clearance, warehousing and freight coordinated by one team from booking to delivery.",
  },
  {
    number: "06",
    title: "Customer First",
    description: "A named point of contact for every account, reachable directly and accountable for the outcome.",
  },
];

/**
 * Home's "Why Choose KAKA" — six numbered reasons in a 2-column grid, each
 * row top-bordered with a padding-left/background hover shift.
 *
 * Kept Home-specific per explicit direction: the page inventory names a
 * similarly-titled section on Real Estate, Automotive and Import/Export, but
 * that hasn't been confirmed against their actual markup yet. Promote this
 * to sections/ only once a second page is read and turns out to match.
 */
export function WhyChooseGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-20 sm:grid-cols-2">
      {REASONS.map((reason, index) => {
        const isLastRow = index >= REASONS.length - 2;
        return (
          <RevealOnScroll
            key={reason.number}
            delay={index * 70}
            className={cn(
              "flex gap-7 border-t border-gold/25 px-2 py-[34px] transition-[padding-left,background-color] duration-200 ease-[ease] hover:bg-gold/5 hover:pl-5",
              isLastRow && "border-b"
            )}
          >
            <span className="w-11 shrink-0 font-display text-[22px] text-gold">{reason.number}</span>
            <div>
              <h3 className="mb-2.5 font-display text-[23px] text-cream">{reason.title}</h3>
              <p className="text-[16.5px] font-light leading-[1.8] text-cream/72">{reason.description}</p>
            </div>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}
