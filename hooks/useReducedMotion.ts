"use client";

import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion: reduce`. The global CSS in globals.css
 * already forces every transition/animation to ~1ms regardless, so this
 * hook isn't needed for pure CSS effects — it's for JS-driven motion that
 * CSS can't reach on its own: HeroCrossfade's auto-advance timer and
 * RevealOnScroll's IntersectionObserver both skip the "wait and animate in"
 * behavior entirely when this is true, rather than relying on a CSS override
 * to hide motion that JS would otherwise still be scheduling.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
