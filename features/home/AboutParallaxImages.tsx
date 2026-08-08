"use client";

import Image from "next/image";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useParallax } from "@/hooks/useParallax";
import { blurPlaceholders } from "@/lib/blurPlaceholders";

/**
 * The two-photo overlapping composition in Home's About section, each image
 * on its own scroll-parallax factor. Unique to this one section of this one
 * page — not a candidate for a shared primitive.
 */
export function AboutParallaxImages() {
  const mainRef = useParallax<HTMLDivElement>(0.06);
  const insetRef = useParallax<HTMLDivElement>(-0.05);

  return (
    <div className="relative min-h-[560px]">
      <RevealOnScroll className="relative h-[430px] w-[82%] overflow-hidden border border-gold/40 bg-ink">
        <div ref={mainRef} className="relative h-full w-full">
          <Image
            src="/uploads/dry%20fruits.jpg"
            alt="Trading floor of dried fruit and nuts"
            placeholder="blur"
            blurDataURL={blurPlaceholders["/uploads/dry%20fruits.jpg"]}
            fill
            sizes="(min-width: 1200px) 38vw, 82vw"
            className="object-cover"
          />
        </div>
      </RevealOnScroll>

      <RevealOnScroll
        delay={160}
        className="absolute bottom-9 right-0 h-[300px] w-[52%] overflow-hidden border-8 border-cream bg-ink shadow-card-raised outline outline-1 outline-gold/40"
      >
        <div ref={insetRef} className="relative h-full w-full">
          <Image
            src="/uploads/modern-villa.jpg.jpg"
            alt="Villa exterior at golden hour"
            placeholder="blur"
            blurDataURL={blurPlaceholders["/uploads/modern-villa.jpg.jpg"]}
            fill
            sizes="(min-width: 1200px) 22vw, 42vw"
            className="object-cover"
          />
        </div>
      </RevealOnScroll>

      <span aria-hidden="true" className="absolute -left-4 -top-4 h-[88px] w-[88px] border-l border-t border-gold/50" />
    </div>
  );
}
