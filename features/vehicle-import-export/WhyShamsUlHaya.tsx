import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FlushImagePanel } from "@/sections/FlushImagePanel";

const REASONS = [
  {
    title: "Trusted international network",
    description: "Working relationships with US auction houses, exporters and clearing agents built over repeat shipments, not cold enquiries.",
  },
  {
    title: "Professional documentation",
    description: "Titles, bills of lading and certificates prepared correctly for the destination country the first time.",
  },
  {
    title: "Reliable shipping partners",
    description: "Established lines and forwarders on the routes we ship regularly, with real ETAs rather than optimistic ones.",
  },
  {
    title: "Quality vehicle selection",
    description: "Condition reported honestly before purchase, including the damage, because you will see it on arrival anyway.",
  },
  {
    title: "Transparent process",
    description: "Purchase price, freight, duties and our fee shown separately on every deal.",
  },
  {
    title: "Experienced team",
    description: "People who have cleared, shipped and handed over enough vehicles to keep the process uneventful.",
  },
];

/**
 * "Why Choose Shams Ul Haya" — composes the shared `FlushImagePanel` shell
 * with `imageSide="left"` (the same orientation as Dry Fruits' and Fleet's
 * usages), plus this page's own bordered title/description row list.
 * `FlushImagePanel`'s fourth confirmed usage.
 */
export function WhyShamsUlHaya() {
  return (
    <FlushImagePanel
      image={{
        src: "/uploads/Professional%20handling%20export%20paperwork..jpg",
        alt: "Export documentation prepared for signature",
      }}
      imageMinHeight={560}
      imageGradient="linear-gradient(90deg, rgba(11,18,32,.35) 0%, rgba(11,18,32,.1) 50%, rgba(15,23,42,.8) 100%)"
      tone="dark"
      eyebrow="Why Choose Shams Ul Haya"
      heading="Cross-border trade runs on paperwork and honesty."
      headingClassName="max-w-[18ch]"
      lead="A vehicle held at a port over a missing document costs more than the margin on the deal. We treat documentation as the product, not an afterthought."
      leadClassName="mb-4 max-w-[44ch]"
    >
      <div>
        {REASONS.map((item, index) => (
          <RevealOnScroll key={item.title} delay={index * 50} className="border-t border-gold/[.24] py-8">
            <h3 className="mb-2.5 font-display text-[23px] leading-[1.3] text-cream">{item.title}</h3>
            <p className="m-0 max-w-[40ch] text-body font-light text-cream/68">{item.description}</p>
          </RevealOnScroll>
        ))}
      </div>
    </FlushImagePanel>
  );
}
