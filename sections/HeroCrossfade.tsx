"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { HeroSlide } from "@/types/hero";

interface HeroCrossfadeProps {
  slides: HeroSlide[];
  intervalMs?: number;
}

/**
 * The multi-image opacity crossfade behind Home, Fleet Management and
 * Vehicle Import & Export's heroes. Rendered by PageHero when it receives
 * more than one image — not used directly by pages.
 *
 * Ken-burns (`kbHero`, from globals.css — deliberately left out of
 * Tailwind's `animation` theme in Phase 2 pending a confirmed duration) is
 * applied here via inline style, tied to `intervalMs`, since that duration
 * is genuinely per-instance rather than a fixed token.
 */
export function HeroCrossfade({ slides, intervalMs = 6000 }: HeroCrossfadeProps) {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || slides.length <= 1) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [reducedMotion, slides.length, intervalMs]);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          aria-hidden={index !== active}
          className="absolute inset-0 transition-opacity duration-1000 ease-kaka"
          style={{ opacity: index === active ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
            style={
              !reducedMotion && index === active
                ? { animation: `kbHero ${intervalMs}ms linear both` }
                : undefined
            }
          />
        </div>
      ))}
    </div>
  );
}
