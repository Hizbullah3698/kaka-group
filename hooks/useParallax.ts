"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "./useReducedMotion";

/**
 * Scroll-position-driven parallax transform, matching the approved handoff:
 * runs only at >=760px viewport width, throttled through
 * requestAnimationFrame, disabled entirely under reduced motion. Returns a
 * ref to attach to the element that should shift — not the reveal wrapper
 * around it, since reveal and parallax both animate `transform` and need to
 * live on separate elements to avoid one overwriting the other.
 */
export function useParallax<T extends HTMLElement>(factor: number) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      if (window.innerWidth < 760) {
        node.style.transform = "";
        return;
      }
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      const offset = (rect.top + rect.height / 2 - vh / 2) * factor;
      node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion, factor]);

  return ref;
}
