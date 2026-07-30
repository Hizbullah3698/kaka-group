import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FlushImagePanel } from "@/sections/FlushImagePanel";

const STANDARDS = [
  {
    title: "Preventive maintenance",
    description: "Catching wear at inspection so it never becomes a roadside failure or a larger bill.",
  },
  {
    title: "Safety inspections",
    description: "Brakes, steering, tyres and lighting checked on every visit, whether or not you asked.",
  },
  {
    title: "Precision repairs",
    description: "Torque settings, specified fluids, correct procedure: the details that decide whether a repair lasts.",
  },
  {
    title: "Performance optimisation",
    description: "Restoring the way the vehicle was engineered to drive, not chasing numbers.",
  },
  {
    title: "Long-term reliability",
    description: "Advice aimed at the next three years of ownership rather than this week's invoice.",
  },
];

/**
 * "Vehicle Care Standards" — composes the shared `FlushImagePanel` shell
 * with `imageSide="right"` (panel left, image right — the mirror of Dry
 * Fruits' and Fleet's usages, confirmed directly against this page's own
 * source rather than assumed), plus this page's own bordered
 * title/description row list as the body content. `FlushImagePanel`'s
 * third confirmed usage.
 */
export function VehicleCareStandards() {
  return (
    <FlushImagePanel
      image={{
        src: "/uploads/Premium%20Vehicle%20-%20A%20clean%20luxury%20or%20executive%20vehicle%20after%20servicing..jpg",
        alt: "Executive vehicle interior detailed after servicing",
      }}
      imageMinHeight={620}
      imageGradient="linear-gradient(270deg, rgba(11,18,32,.2) 0%, rgba(11,18,32,0) 45%, rgba(15,23,42,.85) 100%)"
      imageSide="right"
      tone="dark"
      eyebrow="Vehicle Care Standards"
      heading="Someone paid for this car. We work like we know that."
      headingClassName="max-w-[18ch]"
      lead="A vehicle is how a family gets to school and how a business makes its deliveries. That is the standard we hold ourselves to. The invoice value of the job comes second."
      leadClassName="mb-[18px] max-w-[44ch]"
    >
      <div>
        {STANDARDS.map((item, index) => (
          <RevealOnScroll key={item.title} delay={index * 50} className="border-t border-gold/[.24] py-[30px]">
            <h3 className="mb-2.5 font-display text-[23px] leading-[1.3] text-cream">{item.title}</h3>
            <p className="m-0 max-w-[40ch] text-body font-light text-cream/68">{item.description}</p>
          </RevealOnScroll>
        ))}
      </div>
    </FlushImagePanel>
  );
}
