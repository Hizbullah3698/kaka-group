"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children?: ReactNode;
  /** "fade" = [data-reveal] (opacity + rise, the default). "line" = [data-reveal-line] (scaleX rule growth, for the gold rules next to eyebrows). */
  variant?: "fade" | "line";
  /** Stagger delay in ms. Inherently per-instance (not a fixed token) — applied as a transition-delay. */
  delay?: number;
  className?: string;
}

/**
 * Scroll-reveal primitive. Wraps children in a plain `<div>` carrying the
 * `data-reveal` / `data-reveal-line` attribute from the approved design
 * system (see globals.css) and toggles the `is-in` class via
 * IntersectionObserver, once per element.
 *
 * Renders a single `<div>` — there's no polymorphic `as` prop. Every current
 * usage wraps block-level content where a div is valid; the one case that
 * needs a different element (list items inside StickyProcessRail /
 * NumberedRow) wraps the `<li>` around this component instead of inside it,
 * which avoids fighting TypeScript over a generic element type for a need
 * that hasn't come up more than once.
 */
export function RevealOnScroll({ children, variant = "fade", delay = 0, className }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIn, setIsIn] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setIsIn(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const revealAttr = variant === "line" ? { "data-reveal-line": true } : { "data-reveal": true };
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div ref={ref} {...revealAttr} style={style} className={cn(isIn && "is-in", className)}>
      {children}
    </div>
  );
}
