import Image from "next/image";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { blurPlaceholders } from "@/lib/blurPlaceholders";

const BAYS = [
  {
    image: {
      src: "/uploads/Wheel%20Alignment%20-%20Modern%20alignment%20equipment%20in%20use..jpg",
      alt: "Wheel & Alignment Bay",
    },
    title: "Wheel & Alignment Bay",
    description: "Four-wheel alignment on calibrated equipment, printed before-and-after readings.",
    height: 400,
  },
  {
    image: { src: "/uploads/Oil%20%26%20Maintenance%20-%20Clean,%20professional%20servicing..jpg", alt: "Servicing Bay" },
    title: "Servicing Bay",
    description: "Specified grades measured and logged, filters replaced as a matter of course.",
    height: 340,
  },
  {
    image: {
      src: "/uploads/Engine%20Repair%20-%20Mechanic%20working%20on%20an%20engine%20bay..jpg",
      alt: "Mechanical Bay",
    },
    title: "Mechanical Bay",
    description: "Engine and transmission work with the bay kept clean enough to spot a new leak.",
    height: 400,
  },
];

/**
 * "Workshop Excellence" — three bays at irregular heights (400/340/400px,
 * not an alternating offset), each a plain image-then-caption with no
 * border rule and no small tag line. Close in spirit to `OurFleetGrid` (an
 * image tile grid confirmed on Fleet Management) but genuinely different in
 * every measurement — no stagger, no border-top under the caption, no
 * eyebrow tag — so built fresh rather than stretching that component to
 * cover both shapes.
 */
export function WorkshopExcellenceGrid() {
  return (
    <div className="grid items-start gap-7" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))" }}>
      {BAYS.map((bay) => (
        <RevealOnScroll key={bay.title}>
          <div
            className="relative h-[280px] overflow-hidden border border-gold/[.28] bg-ink-deep sm:h-[var(--bay-h)]"
            style={{ ["--bay-h" as string]: `${bay.height}px` }}
          >
            <Image
              src={bay.image.src}
              alt={bay.image.alt}
              placeholder="blur"
              blurDataURL={blurPlaceholders[bay.image.src]}
              fill
              sizes="(min-width: 1200px) 32vw, (min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: "linear-gradient(180deg, rgba(11,18,32,0) 55%, rgba(11,18,32,.7) 100%)" }}
            />
          </div>
          <div className="pt-5">
            <div className="mb-2 font-display text-[21px] text-cream">{bay.title}</div>
            <div className="text-[14.5px] font-light leading-[1.75] text-cream/62">{bay.description}</div>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
