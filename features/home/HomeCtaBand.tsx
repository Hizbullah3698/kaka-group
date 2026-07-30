"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { useParallax } from "@/hooks/useParallax";

/**
 * Home's closing CTA band: parallax background photo, bordered panel,
 * eyebrow + heading + lead, and *two* CTAs (Contact the Group / call
 * directly). The Phase 4 `CtaBand` primitive this was once compared against
 * has since been retired — Real Estate and Dry Fruits' closing sections both
 * turned out to match `ParallaxCta` instead, and neither matched CtaBand's
 * simpler one-heading/one-button shape. This one stays page-specific since
 * its parallax + two-CTA + bordered-panel treatment hasn't repeated
 * anywhere else yet.
 */
export function HomeCtaBand() {
  const bgRef = useParallax<HTMLDivElement>(0.05);

  return (
    <section className="relative overflow-hidden border-t border-gold/35 bg-ink-deep">
      <div ref={bgRef} className="absolute inset-0 h-[118%] w-full">
        <Image
          src="/uploads/dubai-real-estate-houses.jpg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[.28]"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-deep/[.86] to-ink-deep/[.94]"
      />

      <div className="wrap relative py-section-sm sm:py-section-md lg:py-section-lg">
        <div className="flex flex-wrap items-center justify-between gap-12 border border-gold/35 bg-ink-deep/35 p-8 sm:p-14">
          <div>
            <p className="mb-[22px] font-mono text-[10px] uppercase tracking-[.32em] text-gold">
              KAKA Group of Companies
            </p>
            <h2 className="m-0 max-w-[22ch] font-display text-h2 text-cream">
              Let&rsquo;s Build Long-Term Business Together
            </h2>
            <p className="mt-[26px] max-w-[50ch] text-lead text-cream/76">
              Send us the brief. You will hear back from the division that handles it, usually the same working
              day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5">
            <Button href="/contact/" tone="primary">
              Contact the Group
            </Button>
            <Button href="tel:+971544144755" tone="secondary" onDark>
              +971 54 414 4755
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
