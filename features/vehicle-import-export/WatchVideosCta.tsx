"use client";

import { useState } from "react";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

import { VideoModal } from "./VideoModal";
import { SHOWCASE_VIDEOS } from "./videos";

/**
 * Standalone band linking to Shams Ul Haya's export-process videos — same
 * flat `bg-ink` + flex-row shape as `CareersCtaBand`. Buttons open the
 * shared `VideoModal` instead of `Button`/`Link`, since these play on-site
 * rather than navigating to the (personal, unbranded) YouTube channel.
 */
export function WatchVideosCta() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-b border-gold/30 bg-ink">
      <div className="wrap flex flex-wrap items-center justify-between gap-10 py-section-sm sm:py-section-md lg:py-section-lg">
        <RevealOnScroll>
          <h2 className="m-0 max-w-[24ch] font-display text-[clamp(25px,2.6vw,36px)] leading-[1.2] text-cream">
            Watch videos here.
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={80} className="flex flex-wrap gap-3.5">
          {SHOWCASE_VIDEOS.map((video, index) => (
            <button
              key={video.youtubeId}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="w-max rounded border border-cream/40 px-8 py-4 text-center text-body leading-none uppercase tracking-[.08em] text-cream transition duration-220 ease-kaka hover:-translate-y-0.5 hover:border-gold hover:bg-cream/10 max-sm:w-full"
            >
              {video.title}
            </button>
          ))}
        </RevealOnScroll>
      </div>

      {openIndex !== null && (
        <VideoModal
          videos={SHOWCASE_VIDEOS}
          activeIndex={openIndex}
          onSelect={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
