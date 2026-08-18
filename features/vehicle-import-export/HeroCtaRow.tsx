"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import type { HeroCta } from "@/types/hero";

import { VideoModal } from "./VideoModal";
import { SHOWCASE_VIDEOS } from "./videos";

interface HeroCtaRowProps {
  ctas: HeroCta[];
}

/**
 * Renders the hero's whole CTA row itself — the page passes `ctas={[]}` to
 * `PageHero` and this instead, via `children` — so a third, click-triggered
 * "Videos" button can sit inline with the two real link CTAs. `PageHero`'s
 * own `ctas` prop only renders `<Link>`-backed buttons, and its `children`
 * slot is depended on elsewhere (Home's division indicator bar) to render as
 * its own row *after* the CTAs rather than merged into them, so extending
 * the shared component wasn't the right call for this one page.
 */
export function HeroCtaRow({ ctas }: HeroCtaRowProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div
        className="pointer-events-auto mt-12 flex animate-hero-rise flex-wrap gap-3.5"
        style={{ animationDelay: "1200ms" }}
      >
        {ctas.map((cta) => (
          <Button
            key={cta.href + cta.label}
            href={cta.href}
            tone={cta.tone}
            onDark
            showArrow={cta.tone !== "secondary"}
            external={cta.external}
          >
            {cta.label}
          </Button>
        ))}
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="w-max rounded border border-cream/40 px-8 py-4 text-center text-body leading-none uppercase tracking-[.08em] text-cream transition duration-220 ease-kaka hover:-translate-y-0.5 hover:border-gold hover:bg-cream/10 max-sm:w-full"
        >
          Videos
        </button>
      </div>

      {openIndex !== null && (
        <VideoModal
          videos={SHOWCASE_VIDEOS}
          activeIndex={openIndex}
          onSelect={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
