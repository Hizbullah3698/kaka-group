"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const ITEMS = [
  { number: "01", label: "Real Estate", href: "#real-estate" },
  { number: "02", label: "Dry Fruits Trading", href: "#dry-fruits" },
  { number: "03", label: "Fleet Management", href: "#fleet" },
  { number: "04", label: "Automotive Garage", href: "#garage" },
  { number: "05", label: "Import & Export", href: "#import-export" },
] as const;

const INTERVAL_MS = 9000;

/**
 * Home hero's division indicator bar. Deliberately decoupled from
 * HeroCrossfade's background image index rather than sharing state with it
 * (the source ties them together via a slide-to-division map and a
 * jump-to-slide click handler). HeroCrossfade has no controlled-state API —
 * adding one would mean changing a Phase 4 shared primitive to serve a
 * behavior only this one page needs. Instead this runs its own equal-length
 * 9s-per-division timer and its links jump straight to the matching
 * DivisionRow's id on the page. Same visual rhythm and navigation function,
 * without coupling a shared component to one page's needs — see the Home
 * completion notes for the full reasoning.
 */
export function HeroDivisionBar() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => setActive((current) => (current + 1) % ITEMS.length), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    // Source pins this absolute to the hero's bottom edge on desktop, but
    // switches it to `position: relative` below 767px (confirmed in
    // KAKA Group - Home.dc.html's own mobile media query) so it flows in
    // normal document order under the CTA row instead of floating over it —
    // on a short mobile hero, absolute-at-all-breakpoints made this bar
    // overlap and obscure the "Explore Our Businesses" / "Contact Us"
    // buttons. `-mx-[22px]` cancels the hero `.wrap`'s mobile side padding
    // so the bar still reaches full-bleed edge to edge while in flow;
    // `sm:mx-0` hands that back once it returns to absolute positioning.
    <div className="pointer-events-auto relative -mx-[22px] border-t border-gold/[.26] bg-gradient-to-b from-ink-deep/0 to-ink-deep/[.68] backdrop-blur-[3px] sm:absolute sm:inset-x-0 sm:bottom-0 sm:mx-0">
      <div className="wrap grid grid-cols-2 sm:grid-cols-5">
        {ITEMS.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setActive(index)}
            className={cn(
              "relative border-t px-1.5 py-5 text-left font-mono text-[13.5px] transition-colors duration-220 ease-kaka sm:py-[21px]",
              index === active ? "border-gold text-cream" : "border-transparent text-cream/60 hover:text-cream/85"
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute -top-px left-0 h-0.5 bg-gold transition-[width] ease-linear",
                index === active ? "w-full" : "w-0"
              )}
              style={index === active && !reducedMotion ? { transitionDuration: `${INTERVAL_MS}ms` } : undefined}
            />
            <span className="mb-2.5 block text-[10px] tracking-eyebrow-tight">{item.number}</span>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
