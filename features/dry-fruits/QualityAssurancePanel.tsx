import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FlushImagePanel } from "@/sections/FlushImagePanel";

const CHECKLIST = [
  "Sourced from processors we have bought from before",
  "Graded on calibre, colour, moisture and foreign matter",
  "Food-safe packing, sealed and lot-coded per pallet",
  "Temperature and humidity managed in Dubai storage",
];

/**
 * "Quality Assurance" — composes the shared `FlushImagePanel` shell (see
 * that file for why it's shared) with this page's own hairline-grid
 * checklist as the body content.
 */
export function QualityAssurancePanel() {
  return (
    <FlushImagePanel
      image={{ src: "/uploads/premium%20almonds.jpg", alt: "Graded almonds" }}
      imageMinHeight={560}
      imageGradient="linear-gradient(90deg, rgba(11,18,32,.28), rgba(11,18,32,0) 60%)"
      eyebrow="Quality Assurance"
      heading="Rejecting a lot costs less than losing a buyer."
      lead="We buy against a written specification and check it twice, once before the container is stuffed and once when it lands. Anything off-grade is settled with the supplier, not passed down the chain."
    >
      <div className="grid gap-px border border-gold/30 bg-gold/30">
        {CHECKLIST.map((item, index) => (
          <RevealOnScroll key={item} delay={index * 50} className="bg-cream p-[24px_26px]">
            <span className="text-body font-light text-ink">{item}</span>
          </RevealOnScroll>
        ))}
      </div>
    </FlushImagePanel>
  );
}
