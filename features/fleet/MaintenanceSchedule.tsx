import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FlushImagePanel } from "@/sections/FlushImagePanel";

const SCHEDULE = [
  {
    title: "Scheduled servicing",
    description: "Intervals set per vehicle by mileage and hours, booked outside your peak windows.",
  },
  {
    title: "Preventive maintenance",
    description: "Brakes, tyres, fluids and chains checked before they become roadside failures.",
  },
  {
    title: "Safety inspections",
    description: "Pre-deployment and periodic checks documented against each unit.",
  },
  {
    title: "Quick repairs & replacement",
    description: "Same-day turnaround where possible, and a replacement vehicle when it is not.",
  },
];

/**
 * "Maintenance" — composes the shared `FlushImagePanel` shell (dark tone,
 * the primitive's second confirmed usage after Dry Fruits' Quality
 * Assurance) with this page's own bordered title/description row list as
 * the body content.
 */
export function MaintenanceSchedule() {
  return (
    <FlushImagePanel
      image={{ src: "/uploads/car%20maintainence.jpg", alt: "Technician working on a fleet vehicle" }}
      imageMinHeight={620}
      imageGradient="linear-gradient(90deg, rgba(11,18,32,.35) 0%, rgba(11,18,32,0) 40%, rgba(15,23,42,.9) 100%)"
      tone="dark"
      eyebrow="Maintenance & Reliability"
      heading="A vehicle off the road is an order that never left."
      lead="For a delivery business, maintenance is availability. We run servicing on a schedule set by mileage and shift hours, in our own workshop, so a repair does not become a negotiation with a third party."
      leadClassName="mb-5 max-w-[44ch]"
    >
      <div>
        {SCHEDULE.map((item, index) => (
          <RevealOnScroll key={item.title} delay={index * 50} className="border-t border-gold/[.25] py-[26px]">
            <h3 className="mb-2.5 font-display text-[21px] leading-[1.3] text-cream">{item.title}</h3>
            <p className="m-0 max-w-[40ch] text-[15.5px] font-light leading-[1.8] text-cream/68">{item.description}</p>
          </RevealOnScroll>
        ))}
      </div>
    </FlushImagePanel>
  );
}
