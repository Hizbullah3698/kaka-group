"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useParallax } from "@/hooks/useParallax";
import { noiseBackground } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import type { HeroCta } from "@/types/hero";

interface ParallaxCtaProps {
  id?: string;
  eyebrow: string;
  heading: ReactNode;
  /** Overrides the heading's max-width — confirmed to differ slightly per page (19ch on Real Estate, 20ch on Dry Fruits Trading). */
  headingClassName?: string;
  lead: string;
  /** Overrides the lead paragraph's max-width — same per-page variance as `headingClassName`. */
  leadClassName?: string;
  image: { src: string; alt: string };
  /** CSS `object-position` for the background image — defaults to centered. Automotive Garage's Garage CTA confirmed `50% 40%` in source (the handover photo needs the upper portion kept in frame), so this isn't assumed centered everywhere. */
  imagePosition?: string;
  /** [from, via, to] opacity stops for the dark gradient overlay — confirmed to differ slightly per page in the approved source (not a design token, just a per-instance tuning). */
  overlayOpacity: [number, number, number];
  /** Dry Fruits Trading's Wholesale CTA layers an extra soft-light noise texture over the image; Real Estate's Consultation CTA doesn't. */
  showNoise?: boolean;
  ctas: [HeroCta, HeroCta];
}

/**
 * The closing "parallax photo + centered eyebrow/heading/lead + two CTAs"
 * band — confirmed identical in structure on both Real Estate's Consultation
 * CTA (`#consult`) and Dry Fruits Trading's Wholesale CTA (`#quote`): same
 * parallax factor (0.05), same image height (118%), same CTA pair shape (a
 * primary linking to Contact's `#form` with an arrow, a secondary linking
 * out to WhatsApp in a new tab). Extracted here after the second page
 * confirmed the match, per the project's "confirm on two pages, then
 * extract and refactor the first" rule. The few numbers that genuinely do
 * differ per page (overlay opacity stops, heading/lead max-width, the noise
 * layer) are exposed as props rather than smoothed over.
 *
 * Distinct from CtaBand (heading + single button, no photo, split layout)
 * and HomeCtaBand (bordered split panel, not centered) — neither of those
 * match this shape either, so they stay as they are.
 */
export function ParallaxCta({
  id,
  eyebrow,
  heading,
  headingClassName,
  lead,
  leadClassName,
  image,
  imagePosition,
  overlayOpacity,
  showNoise = false,
  ctas,
}: ParallaxCtaProps) {
  const bgRef = useParallax<HTMLDivElement>(0.05);
  const [from, via, to] = overlayOpacity;

  return (
    <section id={id} className="relative overflow-hidden bg-ink-deep">
      <div ref={bgRef} className="absolute inset-0 h-[118%] w-full">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(11,18,32,${from}) 0%, rgba(11,18,32,${via}) 50%, rgba(11,18,32,${to}) 100%)`,
        }}
      />
      {showNoise && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{ backgroundImage: noiseBackground, backgroundSize: "180px 180px" }}
        />
      )}

      <div className="wrap relative flex flex-col items-center py-section-sm text-center sm:py-section-md lg:py-section-lg">
        <RevealOnScroll className="mb-[30px]">
          <span className="font-mono text-eyebrow uppercase text-gold">{eyebrow}</span>
        </RevealOnScroll>
        <RevealOnScroll delay={80}>
          <h2 className={cn("m-0 font-display text-h2 text-cream", headingClassName)}>{heading}</h2>
        </RevealOnScroll>
        <RevealOnScroll delay={140}>
          <p className={cn("mb-12 mt-7 text-lead text-cream/76", leadClassName)}>{lead}</p>
        </RevealOnScroll>
        <RevealOnScroll delay={200} className="flex flex-wrap justify-center gap-3.5">
          {ctas.map((cta) => (
            <Button
              key={cta.href + cta.label}
              href={cta.href}
              tone={cta.tone ?? "primary"}
              onDark
              showArrow={cta.tone !== "secondary"}
              external={cta.external}
            >
              {cta.label}
            </Button>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}

export type { ParallaxCtaProps };
